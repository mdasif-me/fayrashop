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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    const userId = getUserId()
    if (!file || !userId) return

    setUploading(true)
    toast({
      title: 'Processing Image',
      description: 'Optimizing image for server...',
    })

    try {
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = async (event) => {
        const img = new Image()
        img.src = event.target?.result as string

        img.onload = async () => {
          const canvas = document.createElement('canvas')
          let width = img.width
          let height = img.height

          // Resize to 500px max (standard for avatars)
          const MAX_SIZE = 500
          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width
              width = MAX_SIZE
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height
              height = MAX_SIZE
            }
          }

          canvas.width = width
          canvas.height = height
          const ctx = canvas.getContext('2d')
          ctx?.drawImage(img, 0, 0, width, height)

          // Get compressed Base64
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8)
          // Extract just the base64 part (remove "data:image/jpeg;base64,")
          const base64String = compressedDataUrl.split(',')[1]

          try {
            // Try sending raw base64 first (many backends expect this)
            await fetchClient(`/v1/users/${userId}`, {
              method: 'PATCH',
              body: JSON.stringify({ image: base64String }),
            })

            await refreshProfile()
            toast({
              title: 'Success',
              description: 'Profile picture updated successfully.',
            })
          } catch (err: any) {
            console.error('Raw base64 upload failed, trying with prefix...', err)

            try {
              // Fallback: Try sending with the data URL prefix
              await fetchClient(`/v1/users/${userId}`, {
                method: 'PATCH',
                body: JSON.stringify({ image: compressedDataUrl }),
              })
              await refreshProfile()
              toast({
                title: 'Success',
                description: 'Profile picture updated successfully.',
              })
            } catch (fallbackErr: any) {
              toast({
                title: 'Server Error (500)',
                description: 'The server is having trouble processing this image format.',
                variant: 'destructive',
              })
            }
          } finally {
            if (fileInputRef.current) fileInputRef.current.value = ''
            setUploading(false)
          }
        }
      }

      reader.onerror = () => {
        toast({ title: 'Error', description: 'Failed to read image.', variant: 'destructive' })
        setUploading(false)
      }
    } catch (error) {
      console.error('Upload process failed:', error)
      setUploading(false)
    }
  }

  const handleSave = async () => {
    const userId = getUserId()
    if (!userId) {
      toast({ title: 'Error', description: 'User ID not found.', variant: 'destructive' })
      return
    }

    setSaving(true)
    try {
      await fetchClient(`/v1/users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify(formData),
      })

      await refreshProfile()

      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      })
    } catch (error: any) {
      console.error('Failed to update profile', error)
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
              <Avatar
                src={user?.image || ''}
                alt="Profile picture"
                size="xl"
                className={cn(
                  'h-24 w-24 transition-opacity group-hover:opacity-80',
                  uploading && 'opacity-50'
                )}
              />
              <div className="bg-primary absolute right-0 bottom-0 rounded-full p-2 text-white shadow-lg transition-transform group-hover:scale-110">
                {uploading ? (
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
                Click the image to upload a new one. PNG, JPG up to 10MB.
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
