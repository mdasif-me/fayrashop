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
    fullName: '',
    email: '',
    phone: '',
  })

  // Address one (formerly Billing)
  const [addressOne, setAddressOne] = useState({
    id: '',
    firstName: '',
    lastName: '',
    company: '',
    address: '',
    country: 'Bangladesh',
    region: '', // State/Division
    city: 'Dhaka', // Region in API
    zipCode: '',
    email: '',
    phone: '',
  })

  // Address two (formerly Shipping)
  const [addressTwo, setAddressTwo] = useState({
    id: '',
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

  const [fetchingAddresses, setFetchingAddresses] = useState(false)
  const [savingAddressOne, setSavingAddressOne] = useState(false)
  const [savingAddressTwo, setSavingAddressTwo] = useState(false)
  const [removingAddressOne, setRemovingAddressOne] = useState(false)
  const [removingAddressTwo, setRemovingAddressTwo] = useState(false)

  useEffect(() => {
    if (user) {
      setAccountData(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      }))
      fetchAddresses()
    }
  }, [user])

  const fetchAddresses = async () => {
    setFetchingAddresses(true)
    try {
      const response = await fetchClient('/v1/addresses')
      const addresses = response?.data || []

      if (addresses[0]) {
        const addr = addresses[0]
        setAddressOne({
          id: addr.id,
          firstName: addr.first_name || '',
          lastName: addr.last_name || '',
          company: addr.company_name || '',
          address: addr.address || '',
          country: addr.country || 'Bangladesh',
          region: addr.state || 'Dhaka Division',
          city: addr.region || '',
          zipCode: addr.zip_code || '',
          email: addr.email || '',
          phone: addr.phone || '',
        })
      }

      if (addresses[1]) {
        const addr = addresses[1]
        setAddressTwo({
          id: addr.id,
          firstName: addr.first_name || '',
          lastName: addr.last_name || '',
          company: addr.company_name || '',
          address: addr.address || '',
          country: addr.country || 'Bangladesh',
          region: addr.state || 'Dhaka Division',
          city: addr.region || '',
          zipCode: addr.zip_code || '',
          email: addr.email || '',
          phone: addr.phone || '',
        })
      }
    } catch (error) {
      console.error('Failed to fetch addresses', error)
    } finally {
      setFetchingAddresses(false)
    }
  }

  const handleAccountChange = (value: string, id: string) => {
    setAccountData(prev => ({ ...prev, [id]: value }))
  }

  const handleAddressOneChange = (value: string, id: string) => {
    setAddressOne(prev => ({ ...prev, [id]: value }))
  }

  const handleAddressTwoChange = (value: string, id: string) => {
    setAddressTwo(prev => ({ ...prev, [id]: value }))
  }

  const handleSaveAddress = async (type: 'one' | 'two') => {
    if (!user) return
    const isOne = type === 'one'
    const setSaving = isOne ? setSavingAddressOne : setSavingAddressTwo
    const addressData = isOne ? addressOne : addressTwo

    setSaving(true)
    try {
      const payload = {
        first_name: addressData.firstName,
        last_name: addressData.lastName,
        company_name: addressData.company,
        address: addressData.address,
        phone: addressData.phone,
        region: addressData.city,
        state: addressData.region,
        zip_code: addressData.zipCode,
        country: addressData.country,
        email: addressData.email,
      }

      const method = addressData.id ? 'PATCH' : 'POST'
      const endpoint = addressData.id ? `/v1/addresses/${addressData.id}` : '/v1/addresses'

      const response = await fetchClient(endpoint, { method, body: JSON.stringify(payload) })

      if (response?.success || response?.data || response?.id) {
        toast({ title: 'Success', description: `Address ${type} updated successfully.` })
        await fetchAddresses()
      } else {
        throw new Error(response?.message || 'Failed to save address.')
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Failed to save address.', variant: 'destructive' })
    } finally {
      setSaving(false)
    }
  }

  const handleRemoveAddress = async (type: 'one' | 'two') => {
    const isOne = type === 'one'
    const addressId = isOne ? addressOne.id : addressTwo.id
    if (!addressId) return

    const setRemoving = isOne ? setRemovingAddressOne : setRemovingAddressTwo
    const setAddress = isOne ? setAddressOne : setAddressTwo

    setRemoving(true)
    try {
      const response = await fetchClient(`/v1/addresses/${addressId}`, { method: 'DELETE' })
      if (response?.success || response?.data) {
        toast({ title: 'Success', description: `Address ${type} removed successfully.` })
        setAddress({
          id: '',
          firstName: '',
          lastName: '',
          company: '',
          address: '',
          country: 'Bangladesh',
          region: '',
          city: '',
          zipCode: '',
          email: '',
          phone: '',
        })
      } else {
        throw new Error(response?.message || 'Failed to remove address.')
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Failed to remove address.', variant: 'destructive' })
    } finally {
      setRemoving(false)
    }
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
    setUploading(true)

    try {
      console.log('📸 Uploading photo...');

      // Upload the file to get photo_id
      const uploadFormData = new FormData()
      uploadFormData.append('file', tempFile)

      const uploadResult = await fetchClient('/v1/assets/upload', {
        method: 'POST',
        body: uploadFormData,
      })

      console.log('✅ Upload result:', uploadResult);

      // Extract photo_id from response
      const photoId = uploadResult?.data?.asset?.id ||
                      uploadResult?.asset?.id ||
                      uploadResult?.data?.id ||
                      uploadResult?.id

      if (!photoId) {
        throw new Error('Could not extract photo ID from upload response.')
      }

      console.log('🆔 Photo ID:', photoId);

      // Update user photo using /v1/users/photo endpoint
      const response = await fetchClient('/v1/users/photo', {
        method: 'POST',
        body: JSON.stringify({ photo_id: photoId }),
      })

      console.log('✅ Photo update response:', response);

      if (response?.success || response?.data || response?.message) {
        await refreshProfile()
        setIsImageModalOpen(false)
        setTempFile(null)
        setTempPreviewUrl(null)
        toast({
          title: 'Success',
          description: response?.message || 'Profile picture updated successfully.'
        })
      } else {
        throw new Error(response?.message || 'Failed to update profile picture.')
      }
    } catch (error: any) {
      console.error('❌ Upload error:', error)
      toast({
        title: 'Upload Failed',
        description: error.message || 'Something went wrong during upload.',
        variant: 'destructive'
      })
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

      if (response?.success || response?.data || response?.id) {
        await refreshProfile()
        toast({ title: 'Success', description: 'Account settings updated successfully.' })
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
                  className={cn("size-full *:size-full object-cover", uploading && "opacity-50")}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
                  <Camera className="h-6 w-6 text-white" />
                </div>
                {uploading && (
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
                <TextField label="Full Name" value={accountData.fullName} onChange={(v) => handleAccountChange(v, 'fullName')} />
                <TextField label="Email" value={accountData.email} isDisabled />
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
            <CardTitle className="text-sm font-bold uppercase tracking-wider">Address one</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="First Name" value={addressOne.firstName} onChange={(v) => handleAddressOneChange(v, 'firstName')} />
              <TextField label="Last Name" value={addressOne.lastName} onChange={(v) => handleAddressOneChange(v, 'lastName')} />
            </div>
            <TextField label="Company Name (Optional)" value={addressOne.company} onChange={(v) => handleAddressOneChange(v, 'company')} />
            <TextField label="Address" value={addressOne.address} onChange={(v) => handleAddressOneChange(v, 'address')} />
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="Country" value={addressOne.country} onChange={(v) => handleAddressOneChange(v, 'country')} />
              <TextField label="Region/State" value={addressOne.region} onChange={(v) => handleAddressOneChange(v, 'region')} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <Label className="text-sm font-medium">City</Label>
                <TextField label="" placeholder="City" value={addressOne.city} onChange={(v) => handleAddressOneChange(v, 'city')} />
              </div>
              <TextField label="Zip Code" value={addressOne.zipCode} onChange={(v) => handleAddressOneChange(v, 'zipCode')} />
            </div>
            <TextField label="Email" value={addressOne.email} onChange={(v) => handleAddressOneChange(v, 'email')} />
            <TextField label="Phone Number" value={addressOne.phone} onChange={(v) => handleAddressOneChange(v, 'phone')} />
            <div className="flex justify-end gap-3">
              {addressOne.id && (
                <Button variant="outline" onClick={() => handleRemoveAddress('one')} disabled={removingAddressOne} className="text-destructive border-destructive hover:bg-danger hover:text-white">
                  {removingAddressOne && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Remove Address
                </Button>
              )}
              <Button onClick={() => handleSaveAddress('one')} disabled={savingAddressOne || removingAddressOne} className="bg-primary text-white">
                {savingAddressOne && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                SAVE CHANGES
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card className="border shadow-sm">
          <CardHeader className="border-b px-6 py-4">
            <CardTitle className="text-sm font-bold uppercase tracking-wider">Address two</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="First Name" value={addressTwo.firstName} onChange={(v) => handleAddressTwoChange(v, 'firstName')} />
              <TextField label="Last Name" value={addressTwo.lastName} onChange={(v) => handleAddressTwoChange(v, 'lastName')} />
            </div>
            <TextField label="Company Name (Optional)" value={addressTwo.company} onChange={(v) => handleAddressTwoChange(v, 'company')} />
            <TextField label="Address" value={addressTwo.address} onChange={(v) => handleAddressTwoChange(v, 'address')} />
            <div className="grid gap-4 md:grid-cols-2">
              <TextField label="Country" value={addressTwo.country} onChange={(v) => handleAddressTwoChange(v, 'country')} />
              <TextField label="Region/State" value={addressTwo.region} onChange={(v) => handleAddressTwoChange(v, 'region')} />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <Label className="text-sm font-medium">City</Label>
                <TextField label="" placeholder="City" value={addressTwo.city} onChange={(v) => handleAddressTwoChange(v, 'city')} />
              </div>
              <TextField label="Zip Code" value={addressTwo.zipCode} onChange={(v) => handleAddressTwoChange(v, 'zipCode')} />
            </div>
            <TextField label="Email" value={addressTwo.email} onChange={(v) => handleAddressTwoChange(v, 'email')} />
            <TextField label="Phone Number" value={addressTwo.phone} onChange={(v) => handleAddressTwoChange(v, 'phone')} />
            <div className="flex justify-end gap-3">
              {addressTwo.id && (
                <Button variant="outline" onClick={() => handleRemoveAddress('two')} disabled={removingAddressTwo} className="text-destructive border-destructive hover:bg-danger hover:text-white">
                  {removingAddressTwo && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Remove Address
                </Button>
              )}
              <Button onClick={() => handleSaveAddress('two')} disabled={savingAddressTwo || removingAddressTwo} className="bg-primary text-white">
                {savingAddressTwo && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                SAVE CHANGES
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
