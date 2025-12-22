'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/field'
import { Avatar } from '@/components/ui/avatar'
import { Camera, Loader2 } from 'lucide-react'
import { fetchClient } from '@/lib/api-config'
import { useToast } from '@/hooks/use-toast'
import { useAuth } from '@/providers/auth-provider'
import { cn } from '@/lib/utils'

export default function ProfilePage() {
  const { user, refreshProfile } = useAuth()
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  })
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const getUserId = () => user?.id || user?._id

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
      })
    }
  }, [user])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  const handleImageClick = () => {
    fileInputRef.current?.click()
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setSelectedFile(file)
    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
  }

  const handleSave = async () => {
    const userId = getUserId()
    if (!userId) {
      toast({ title: 'Error', description: 'User ID not found.', variant: 'destructive' })
      return
    }

    setSaving(true)
    try {
      let finalImageUrl = user?.image

      // 1. If there's a new file, upload it
      if (selectedFile) {
        setUploading(true)
        const uploadFormData = new FormData()
        uploadFormData.append('file', selectedFile)

        const uploadResult = await fetchClient('/v1/assets/upload', {
          method: 'POST',
          body: uploadFormData,
        })

        const assetId = uploadResult?.data?.asset?.id || uploadResult?.asset?.id
        // Using optimized_url for better performance if available
        finalImageUrl =
          uploadResult?.data?.optimized_url ||
          uploadResult?.optimized_url ||
          uploadResult?.data?.asset?.secure_url ||
          uploadResult?.asset?.secure_url

        if (assetId) {
          // 2. Associate the asset with the user
          try {
            const linkFormData = new FormData()
            linkFormData.append('entity_id', userId)

            await fetchClient(`/v1/assets/${assetId}`, {
              method: 'PUT',
              body: linkFormData,
            })
          } catch (linkError) {
            console.warn('Asset association failed', linkError)
          }
        }
        setUploading(false)
      }

      // 3. Prepare and clean the update payload
      const updateData: any = {
        name: formData.name.trim(),
        image: finalImageUrl,
      }

      // Only include phone if it's not empty and different or if needed
      // If the server is picky about phone format, we trim it
      if (formData.phone) {
        const cleanedPhone = formData.phone.trim()
        if (cleanedPhone) {
          updateData.phone = cleanedPhone
        }
      }

      // 4. Update the user profile details
      try {
        await fetchClient(`/v1/users/${userId}`, {
          method: 'PATCH',
          body: JSON.stringify(updateData),
        })
      } catch (patchError: any) {
        // If the error is specifically about the phone number, try updating without it
        if (patchError.message?.toLowerCase().includes('phone')) {
          console.warn('Phone update failed, trying without phone number...')
          const { phone, ...dataWithoutPhone } = updateData
          await fetchClient(`/v1/users/${userId}`, {
            method: 'PATCH',
            body: JSON.stringify(dataWithoutPhone),
          })
          toast({
            title: 'Partial Update',
            description: 'Profile updated, but phone number was rejected by server.',
          })
        } else {
          throw patchError
        }
      }

      await refreshProfile()
      setSelectedFile(null)
      setPreviewUrl(null)

      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      })
    } catch (error: any) {
      console.error('Failed to update profile', error)
      setUploading(false)
      toast({
        title: 'Error',
        description: error.message || 'Failed to update profile. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="text-primary h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your personal information.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your photo and personal details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="group relative cursor-pointer" onClick={handleImageClick}>
              <div className="border-background bg-muted relative h-28 w-28 overflow-hidden rounded-full border-4 shadow-sm shadow-black/10 transition-all hover:scale-[1.02]">
                <Avatar
                  src={previewUrl || user?.image || ''}
                  alt="Profile picture"
                  className={cn(
                    'size-full object-cover transition-opacity duration-300 *:size-full',
                    (uploading || saving) && 'opacity-50'
                  )}
                />
              </div>
              <div className="bg-primary ring-background absolute right-0 bottom-0 rounded-full p-2 text-white shadow-lg ring-2 transition-transform group-hover:scale-110">
                {uploading || saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Camera className="h-4 w-4" />
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>
            <div>
              <h3 className="font-medium">Profile Picture</h3>
              <p className="text-muted-foreground text-sm font-light">
                Click the image to upload a new one. PNG, JPG up to 500kb.
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="name">Full Name</Label>
              <input
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <input
                id="email"
                type="email"
                value={user?.email || ''}
                readOnly
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm opacity-60 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">Phone number</Label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button variant="outline">Cancel</Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Changes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
