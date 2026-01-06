'use client'

import React, { useEffect, useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/field'
import { Avatar } from '@/components/ui/avatar'
import { Camera, Loader2 } from 'lucide-react'
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

import { toast } from 'sonner'

export default function ProfilePage() {
  const user = useMemo(
    () => ({
      id: 'demo-user',
      name: 'Demo User',
      email: 'demo@fayrashop.com',
      phone: '+8801000000000',
      image: '',
    }),
    []
  )

  const addresses = useMemo(
    () => [
      {
        id: 'demo-address-1',
        first_name: 'Demo',
        last_name: 'Customer',
        company_name: '',
        address: '123 Demo Street',
        country: 'Bangladesh',
        state: 'Dhaka',
        city: 'Dhaka',
        zip_code: '1207',
        email: 'demo@fayrashop.com',
        phone_number: '+8801000000000',
      },
    ],
    []
  )
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isImageModalOpen, setIsImageModalOpen] = useState(false)
  const [tempFile, setTempFile] = useState<File | null>(null)
  const [tempPreviewUrl, setTempPreviewUrl] = useState<string | null>(null)

  const fileInputRef = React.useRef<HTMLInputElement>(null)

  // Account Settings State
  const [accountData, setAccountData] = useState({
    fullName: '',
    email: '',
    phone: '',
  })

  // Address one
  const [addressOne, setAddressOne] = useState({
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

  // Address two
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

  const saving = false
  const uploading = false
  const savingAddressOne = false
  const savingAddressTwo = false
  const removingAddressOne = false
  const removingAddressTwo = false

  useEffect(() => {
    if (user) {
      setAccountData({
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
      })
    }
  }, [user])

  useEffect(() => {
    if (addresses) {
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
          city: addr.city || '',
          zipCode: addr.zip_code || '',
          email: addr.email || '',
          phone: addr.phone_number || '',
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
          city: addr.city || '',
          zipCode: addr.zip_code || '',
          email: addr.email || '',
          phone: addr.phone_number || '',
        })
      }
    }
  }, [addresses])

  const handleAccountChange = (value: string, id: string) => {
    setAccountData((prev) => ({ ...prev, [id]: value }))
  }

  const handleAddressOneChange = (value: string, id: string) => {
    setAddressOne((prev) => ({ ...prev, [id]: value }))
  }

  const handleAddressTwoChange = (value: string, id: string) => {
    setAddressTwo((prev) => ({ ...prev, [id]: value }))
  }
<<<<<<< HEAD
  const handleSaveAddressOne = () => {
    const payload = {
      first_name: addressOne.firstName,
      last_name: addressOne.lastName,
      company_name: addressOne.company,
      address: addressOne.address,
      phone_number: addressOne.phone,
      type: 'billing',
      state: addressOne.region,
      city: addressOne.city,
      zip_code: addressOne.zipCode,
      country: addressOne.country,
      email: addressOne.email,
=======

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
>>>>>>> 2517b1d8aab55f474eff4e4195ee771e9277985f
    }
    void payload
    toast.success('Address saved (design-only)')
  }

<<<<<<< HEAD
  const handleSaveAddressTwo = () => {
    const payload = {
      first_name: addressTwo.firstName,
      last_name: addressTwo.lastName,
      company_name: addressTwo.company,
      address: addressTwo.address,
      phone_number: addressTwo.phone,
      type: 'shipping',
      state: addressTwo.region,
      city: addressTwo.city,
      zip_code: addressTwo.zipCode,
      country: addressTwo.country,
      email: addressTwo.email,
    }
    void payload
    toast.success('Address saved (design-only)')
  }

  const handleRemoveAddressOne = () => {
    if (!addressOne.id) return
    setAddressOne({
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
    toast.success('Address removed (design-only)')
  }

  const handleRemoveAddressTwo = () => {
    if (!addressTwo.id) return
    setAddressTwo({
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
    toast.success('Address removed (design-only)')
=======
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
>>>>>>> 2517b1d8aab55f474eff4e4195ee771e9277985f
  }

  const handleImageClick = () => fileInputRef.current?.click()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setTempFile(file)
    const url = URL.createObjectURL(file)
    setTempPreviewUrl(url)
    setIsImageModalOpen(true)
    if (e.target) e.target.value = ''
  }

  const handleConfirmUpload = () => {
    if (!tempFile) return
    setIsImageModalOpen(false)
    setTempFile(null)
    setTempPreviewUrl(null)
    toast.success('Photo updated (design-only)')
  }

  const handleSaveAccount = () => {
    toast.success('Account updated (design-only)')
  }

  return (
    <div className="space-y-8 pb-10">
      {/* Account Setting Section */}
      <Card className="overflow-hidden border shadow-sm">
        <CardHeader className="border-b px-6 py-4">
          <CardTitle className="text-sm font-bold tracking-wider uppercase">
            Account Setting
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col gap-8 lg:flex-row">
            {/* Avatar Column */}
            <div className="flex flex-col items-center gap-4">
              <div
                className="group ring-primary/10 hover:ring-primary/20 relative h-32 w-32 cursor-pointer overflow-hidden rounded-full ring-2 transition-all"
                onClick={handleImageClick}
              >
                <Avatar
                  src={(user as any)?.image || ''}
                  alt="Profile"
                  className={cn('size-full object-cover *:size-full', uploading && 'opacity-50')}
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
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </div>

            {/* Form Column */}
            <div className="flex-1 space-y-6">
              <div className="grid gap-4 md:grid-cols-2">
                <TextField
                  label="Full Name"
                  value={accountData.fullName}
                  onChange={(v) => handleAccountChange(v, 'fullName')}
                />
                <TextField label="Email" value={accountData.email} isDisabled />
                <TextField
                  label="Phone Number"
                  value={accountData.phone}
                  onChange={(v) => handleAccountChange(v, 'phone')}
                />
              </div>
              <div className="flex justify-end">
                <Button
                  onClick={handleSaveAccount}
                  disabled={saving}
                  className="bg-primary text-white"
                >
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
            <div className="ring-primary/10 relative h-64 w-64 overflow-hidden rounded-full ring-4">
              {tempPreviewUrl && (
                <img src={tempPreviewUrl} alt="Preview" className="h-full w-full object-cover" />
              )}
              {uploading && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                  <Loader2 className="h-12 w-12 animate-spin text-white" />
                </div>
              )}
            </div>
            <p className="text-muted-fg mt-4 text-center text-sm">
              Do you want to upload this photo as your profile picture?
            </p>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="outline"
              onClick={() => setIsImageModalOpen(false)}
              disabled={uploading}
            >
              Cancel
            </Button>
            <Button
              onClick={handleConfirmUpload}
              disabled={uploading}
              className="bg-primary text-white"
            >
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
            <CardTitle className="text-sm font-bold tracking-wider uppercase">
              Address one
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="First Name"
                value={addressOne.firstName}
                onChange={(v) => handleAddressOneChange(v, 'firstName')}
              />
              <TextField
                label="Last Name"
                value={addressOne.lastName}
                onChange={(v) => handleAddressOneChange(v, 'lastName')}
              />
            </div>
            <TextField
              label="Company Name (Optional)"
              value={addressOne.company}
              onChange={(v) => handleAddressOneChange(v, 'company')}
            />
            <TextField
              label="Address"
              value={addressOne.address}
              onChange={(v) => handleAddressOneChange(v, 'address')}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="Country"
                value={addressOne.country}
                onChange={(v) => handleAddressOneChange(v, 'country')}
              />
              <TextField
                label="Region/State"
                value={addressOne.region}
                onChange={(v) => handleAddressOneChange(v, 'region')}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <Label className="text-sm font-medium">City</Label>
                <TextField
                  label=""
                  placeholder="City"
                  value={addressOne.city}
                  onChange={(v) => handleAddressOneChange(v, 'city')}
                />
              </div>
              <TextField
                label="Zip Code"
                value={addressOne.zipCode}
                onChange={(v) => handleAddressOneChange(v, 'zipCode')}
              />
            </div>
            <TextField
              label="Email"
              value={addressOne.email}
              onChange={(v) => handleAddressOneChange(v, 'email')}
            />
            <TextField
              label="Phone Number"
              value={addressOne.phone}
              onChange={(v) => handleAddressOneChange(v, 'phone')}
            />
            <div className="flex justify-end gap-3">
              {addressOne.id && (
<<<<<<< HEAD
                <Button
                  variant="outline"
                  onClick={handleRemoveAddressOne}
                  disabled={removingAddressOne}
                  className="text-destructive border-destructive hover:bg-danger hover:text-white"
                >
=======
                <Button variant="outline" onClick={() => handleRemoveAddress('one')} disabled={removingAddressOne} className="text-destructive border-destructive hover:bg-danger hover:text-white">
>>>>>>> 2517b1d8aab55f474eff4e4195ee771e9277985f
                  {removingAddressOne && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Remove Address
                </Button>
              )}
<<<<<<< HEAD
              <Button
                onClick={handleSaveAddressOne}
                disabled={savingAddressOne || removingAddressOne}
                className="bg-primary text-white"
              >
=======
              <Button onClick={() => handleSaveAddress('one')} disabled={savingAddressOne || removingAddressOne} className="bg-primary text-white">
>>>>>>> 2517b1d8aab55f474eff4e4195ee771e9277985f
                {savingAddressOne && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                SAVE CHANGES
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Shipping Address */}
        <Card className="border shadow-sm">
          <CardHeader className="border-b px-6 py-4">
            <CardTitle className="text-sm font-bold tracking-wider uppercase">
              Address two
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="First Name"
                value={addressTwo.firstName}
                onChange={(v) => handleAddressTwoChange(v, 'firstName')}
              />
              <TextField
                label="Last Name"
                value={addressTwo.lastName}
                onChange={(v) => handleAddressTwoChange(v, 'lastName')}
              />
            </div>
            <TextField
              label="Company Name (Optional)"
              value={addressTwo.company}
              onChange={(v) => handleAddressTwoChange(v, 'company')}
            />
            <TextField
              label="Address"
              value={addressTwo.address}
              onChange={(v) => handleAddressTwoChange(v, 'address')}
            />
            <div className="grid gap-4 md:grid-cols-2">
              <TextField
                label="Country"
                value={addressTwo.country}
                onChange={(v) => handleAddressTwoChange(v, 'country')}
              />
              <TextField
                label="Region/State"
                value={addressTwo.region}
                onChange={(v) => handleAddressTwoChange(v, 'region')}
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-1">
                <Label className="text-sm font-medium">City</Label>
                <TextField
                  label=""
                  placeholder="City"
                  value={addressTwo.city}
                  onChange={(v) => handleAddressTwoChange(v, 'city')}
                />
              </div>
              <TextField
                label="Zip Code"
                value={addressTwo.zipCode}
                onChange={(v) => handleAddressTwoChange(v, 'zipCode')}
              />
            </div>
            <TextField
              label="Email"
              value={addressTwo.email}
              onChange={(v) => handleAddressTwoChange(v, 'email')}
            />
            <TextField
              label="Phone Number"
              value={addressTwo.phone}
              onChange={(v) => handleAddressTwoChange(v, 'phone')}
            />
            <div className="flex justify-end gap-3">
              {addressTwo.id && (
<<<<<<< HEAD
                <Button
                  variant="outline"
                  onClick={handleRemoveAddressTwo}
                  disabled={removingAddressTwo}
                  className="text-destructive border-destructive hover:bg-danger hover:text-white"
                >
=======
                <Button variant="outline" onClick={() => handleRemoveAddress('two')} disabled={removingAddressTwo} className="text-destructive border-destructive hover:bg-danger hover:text-white">
>>>>>>> 2517b1d8aab55f474eff4e4195ee771e9277985f
                  {removingAddressTwo && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Remove Address
                </Button>
              )}
<<<<<<< HEAD
              <Button
                onClick={handleSaveAddressTwo}
                disabled={savingAddressTwo || removingAddressTwo}
                className="bg-primary text-white"
              >
=======
              <Button onClick={() => handleSaveAddress('two')} disabled={savingAddressTwo || removingAddressTwo} className="bg-primary text-white">
>>>>>>> 2517b1d8aab55f474eff4e4195ee771e9277985f
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
