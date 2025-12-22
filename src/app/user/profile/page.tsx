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

import { TextField } from '@/components/ui/text-field'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/components/ui/modal'

export default function ProfilePage() {
  const { user, refreshProfile } = useAuth()
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  // Image Modal State
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [tempFile, setTempFile] = useState<File | null>(null)
  const [tempPreviewUrl, setTempPreviewUrl] = useState<string | null>(null)

  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Account Settings State
  const [accountData, setAccountData] = useState({
    displayName: '',
    username: '',
    fullName: '',
    email: '',
    secondaryEmail: '',
    phone: '',
  })

  // Billing Address State
  const [billingData, setBillingData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    country: 'Bangladesh',
    region: '',
    city: 'Dhaka',
    zipCode: '',
    email: '',
    phone: '',
  })

  // Shipping Address State
  const [shippingData, setShippingData] = useState({
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    country: 'Bangladesh',
    region: '',
    city: 'Dhaka',
    zipCode: '',
    email: '',
    phone: '',
  })

  useEffect(() => {
    if (user) {
      setAccountData(prev => ({
        ...prev,
        displayName: user.name?.split(' ')[0] || '',
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      }))
    }
  }, [user])

  const handleAccountChange = (value: string, id: string) => {
    setAccountData(prev => ({ ...prev, [id]: value }))
  }

  const handleBillingChange = (value: string, id: string) => {
    setBillingData(prev => ({ ...prev, [id]: value }))
  }

  const handleShippingChange = (value: string, id: string) => {
    setShippingData(prev => ({ ...prev, [id]: value }))
  }

  const handleImageClick = () => fileInputRef.current?.click()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setTempFile(file)
    const url = URL.createObjectURL(file)
    setTempPreviewUrl(url)
    setIsImageModalOpen(true)

    // Reset input value to allow selecting the same file again
    if (e.target) e.target.value = ''
  }

  const handleConfirmUpload = async () => {
    if (!tempFile || !user) return
    const userId = user.id || user._id
    setUploading(true)

    try {
      const uploadFormData = new FormData()
      uploadFormData.append('file', tempFile)

      const uploadResult = await fetchClient('/v1/assets/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      const assetId = uploadResult?.data?.asset?.id || uploadResult?.asset?.id
      const finalImageUrl = uploadResult?.data?.optimized_url || uploadResult?.optimized_url ||
                          uploadResult?.data?.asset?.secure_url || uploadResult?.asset?.secure_url

      if (assetId) {
        const linkFormData = new FormData()
        linkFormData.append('entity_id', userId)
        await fetchClient(`/v1/assets/${assetId}`, { method: 'PUT', body: linkFormData })
      }

      const response = await fetchClient(`/v1/users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify({ image: finalImageUrl }),
      })

      if (response?.success || response?.data) {
        await refreshProfile()
        setIsImageModalOpen(false)
        setTempFile(null)
        setTempPreviewUrl(null)
        toast({ title: 'Success', description: 'Profile picture updated.' })
      } else {
        throw new Error(response?.message || 'Upload failed.')
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Upload failed.', variant: 'destructive' })
    } finally {
      setUploading(false)
    }
  }

  const handleSaveAccount = async () => {
    if (!user) return
    const userId = user.id || user._id
    setSaving(true)

    try {
      // Update user profile (name and phone only)
      const response = await fetchClient(`/v1/users/${userId}`, {
        method: 'PATCH',
        body: JSON.stringify({
          name: accountData.fullName,
          phone: accountData.phone,
        }),
      })

      if (response?.success || response?.data) {
        await refreshProfile()
        toast({ title: 'Success', description: response?.message || 'Account settings updated.' })
      } else {
        throw new Error(response?.message || 'Update failed.')
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Update failed.', variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  if (!user) return <div className="flex items-center justify-center p-8"><Loader2 className="text-primary h-8 w-8 animate-spin" /></div>

  return (
    <div className="space-y-8 pb-10">
      {/* Account Setting Section */}
      <Card className="overflow-hidden border shadow-sm">
        <CardHeader className="border-b px-6 py-4">
          <CardTitle className="text-sm font-bold uppercase tracking-wider">Account Setting</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Avatar Column */}
            <div className="flex flex-col items-center gap-4">
              <div
                className="group relative h-32 w-32 cursor-pointer overflow-hidden rounded-full ring-2 ring-primary/10 transition-all hover:ring-primary/20"
                onClick={handleImageClick}
              >
                <Avatar
                  src={user?.image || ''}
                  alt="Profile"
                  className={cn("size-full *:size-full object-cover", (uploading || saving) && "opacity-50")}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                {(uploading || saving) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                    <Loader2 className="h-6 w-6 animate-spin text-white" />
                  </div>
                )}
              </div>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleImageUpload} />
            </div>

            {/* Form Column */}
            <div className="flex-1 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <TextField label="Display name" value={accountData.displayName} onChange={(v) => handleAccountChange(v, 'displayName')} />
                <TextField label="Username" value={accountData.username} onChange={(v) => handleAccountChange(v, 'username')} />
                <TextField label="Full Name" value={accountData.fullName} onChange={(v) => handleAccountChange(v, 'fullName')} />
                <TextField label="Email" value={accountData.email} isDisabled />
                <TextField label="Secondary Email" value={accountData.secondaryEmail} onChange={(v) => handleAccountChange(v, 'secondaryEmail')} />
                <TextField label="Phone Number" value={accountData.phone} onChange={(v) => handleAccountChange(v, 'phone')} />
              </div>
              <div className="flex justify-end">
                <Button onClick={handleSaveAccount} disabled={saving} className="bg-primary text-white">
                  {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  SAVE CHANGES
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Image Upload Modal */}
      <Modal isOpen={isImageModalOpen} onOpenChange={setIsImageModalOpen}>
        <ModalContent isBlurred>
          <ModalHeader>
            <ModalTitle>Update Profile Photo</ModalTitle>
          </ModalHeader>
          <ModalBody className="flex flex-col items-center justify-center py-6">
            <div className="relative h-64 w-64 overflow-hidden rounded-full ring-4 ring-primary/10">
              {tempPreviewUrl && (
                <img src={tempPreviewUrl} alt="Preview" className="h-full w-full object-cover" />
              )}
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Loader2 className="h-12 w-12 animate-spin text-white" />
                </div>
              )}
            </div>
            <p className="mt-4 text-center text-sm text-muted-fg">
              Do you want to upload this photo as your profile picture?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsImageModalOpen(false)} disabled={uploading}>
              Cancel
            </Button>
            <Button onClick={handleConfirmUpload} disabled={uploading} className="bg-primary text-white">
              {uploading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Upload Photo
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Addresses Section */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Billing Address */}
        <Card className="border shadow-sm">
          <CardHeader className="border-b px-6 py-4">
            <CardTitle className="text-sm font-bold uppercase tracking-wider">Billing Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="First Name" value={billingData.firstName} onChange={(v) => handleBillingChange(v, 'firstName')} />
              <TextField label="Last Name" value={billingData.lastName} onChange={(v) => handleBillingChange(v, 'lastName')} />
            </div>
            <TextField label="Company Name (Optional)" value={billingData.company} onChange={(v) => handleBillingChange(v, 'company')} />
            <TextField label="Address" value={billingData.address} onChange={(v) => handleBillingChange(v, 'address')} />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Country</Label>
                <select
                  value={billingData.country}
                  onChange={(e) => handleBillingChange(e.target.value, 'country')}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
                >
                  <option>Bangladesh</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium">Region/State</Label>
                <select
                  value={billingData.region}
                  onChange={(e) => handleBillingChange(e.target.value, 'region')}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option>Dhaka</option>
                </select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <Label className="text-sm font-medium">City</Label>
                <select
                  value={billingData.city}
                  onChange={(e) => handleBillingChange(e.target.value, 'city')}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
                >
                  <option>Dhaka</option>
                </select>
              </div>
              <TextField label="Zip Code" value={billingData.zipCode} onChange={(v) => handleBillingChange(v, 'zipCode')} />
            </div>
            <TextField label="Email" value={billingData.email} onChange={(v) => handleBillingChange(v, 'email')} />
            <TextField label="Phone Number" value={billingData.phone} onChange={(v) => handleBillingChange(v, 'phone')} />
            <div className="flex justify-end">
              <Button className="bg-primary text-white">SAVE CHANGES</Button>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card className="border shadow-sm">
          <CardHeader className="border-b px-6 py-4">
            <CardTitle className="text-sm font-bold uppercase tracking-wider">Shipping Address</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="First Name" value={shippingData.firstName} onChange={(v) => handleShippingChange(v, 'firstName')} />
              <TextField label="Last Name" value={shippingData.lastName} onChange={(v) => handleShippingChange(v, 'lastName')} />
            </div>
            <TextField label="Company Name (Optional)" value={shippingData.company} onChange={(v) => handleShippingChange(v, 'company')} />
            <TextField label="Address" value={shippingData.address} onChange={(v) => handleShippingChange(v, 'address')} />
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <Label className="text-sm font-medium">Country</Label>
                <select
                  value={shippingData.country}
                  onChange={(e) => handleShippingChange(e.target.value, 'country')}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
                >
                  <option>Bangladesh</option>
                </select>
              </div>
              <div className="space-y-1">
                <Label className="text-sm font-medium">Region/State</Label>
                <select
                  value={shippingData.region}
                  onChange={(e) => handleShippingChange(e.target.value, 'region')}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
                >
                  <option value="">Select...</option>
                  <option>Dhaka</option>
                </select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <Label className="text-sm font-medium">City</Label>
                <select
                  value={shippingData.city}
                  onChange={(e) => handleShippingChange(e.target.value, 'city')}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus:ring-2 focus:ring-ring focus:outline-none"
                >
                  <option>Dhaka</option>
                </select>
              </div>
              <TextField label="Zip Code" value={shippingData.zipCode} onChange={(v) => handleShippingChange(v, 'zipCode')} />
            </div>
            <TextField label="Email" value={shippingData.email} onChange={(v) => handleShippingChange(v, 'email')} />
            <TextField label="Phone Number" value={shippingData.phone} onChange={(v) => handleShippingChange(v, 'phone')} />
            <div className="flex justify-end">
              <Button className="bg-primary text-white">SAVE CHANGES</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
