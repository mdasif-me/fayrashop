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
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
  })
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const { toast } = useToast()

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
    if (!file || !user) return

    // Show immediate feedback
    setUploading(true)
    const toastId = toast({
      title: 'Uploading...',
      description: 'Please wait while we upload your profile picture.',
    })

    try {
      // 1. In a real scenario, we'd upload to an S3/Cloudinary endpoint
      // For now, we'll simulate the upload or use a data URL for immediate show
      // if the backend supports direct PATCH with image data or if we have an upload API.

      // Mocking a file upload to get a URL (if your backend has an upload endpoint, use it here)
      // Since I don't see a confirmed upload endpoint working, I'll update the user data
      // with a placeholder or the actual file if the backend supports it.

      // Let's assume the PATCH endpoint can handle an 'image' field update.
      // If you have a separate file upload API, call it here first.

      // Converting to base64 for demonstration if no upload API exists
      const reader = new FileReader()
      reader.onloadend = async () => {
        const base64String = reader.result as string
        try {
          await fetchClient(`/v1/users/${user.id}`, {
            method: 'PATCH',
            body: JSON.stringify({ image: base64String }),
          })
          await refreshProfile()
          toast({
            title: 'Success',
            description: 'Profile picture updated successfully.',
          })
        } catch (err: any) {
          toast({
            title: 'Upload Failed',
            description: err.message || 'Failed to update image on server.',
            variant: 'destructive',
          })
        } finally {
          setUploading(true)
        }
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Upload failed', error)
      toast({
        title: 'Error',
        description: 'Failed to upload image.',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    if (!user) return

    setSaving(true)
    try {
      await fetchClient(`/v1/users/${user.id}`, {
        method: 'PATCH',
        body: JSON.stringify(formData),
      })

      await refreshProfile()

      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      })
    } catch (error) {
      console.error('Failed to update profile', error)
      toast({
        title: 'Error',
        description: 'Failed to update profile. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  if (!user) {
    return <div>Please sign in to view your profile.</div>
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
              <div className="bg-primary hover:bg-primary/90 absolute right-0 bottom-0 rounded-full p-2 text-white shadow-lg transition-transform group-hover:scale-110">
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
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="email">Email</Label>
              <input
                id="email"
                type="email"
                value={user?.email || ''}
                readOnly
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm opacity-60 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label htmlFor="phone">Phone number</Label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
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
