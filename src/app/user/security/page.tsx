'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/field'
import { Key, Smartphone, Loader2, AlertTriangle, Trash2 } from 'lucide-react'
import { toast } from 'sonner'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/components/ui/modal'

export default function SecurityPage() {
  const user = { id: 'demo-user' }
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const isUpdatingPassword = false
  const isDeleting = false

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setPasswordData((prev) => ({ ...prev, [id]: value }))
  }

  const updatePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    toast.success('Password updated (design-only)')
  }

  const handleDeleteAccount = () => {
    if (!user?.id) return
    setIsDeleteModalOpen(false)
    toast.success('Account deleted (design-only)')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Security</h1>
        <p className="text-muted-foreground">Manage your account security and password.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <Key className="text-primary h-5 w-5" /> Change Password
          </CardTitle>
          <CardDescription>
            Ensure your account is secure by using a strong password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="currentPassword">Current Password</Label>
            <input
              id="currentPassword"
              type="password"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="newPassword">New Password</Label>
            <input
              id="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <input
              id="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            />
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={updatePassword} disabled={isUpdatingPassword}>
              {isUpdatingPassword && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Update Password
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl font-bold">
            <Smartphone className="text-primary h-5 w-5" /> Two-Factor Authentication
          </CardTitle>
          <CardDescription>Add an extra layer of security to your account.</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="font-medium">
              Two-factor authentication is currently{' '}
              <span className="font-extrabold text-red-500">OFF</span>
            </p>
            <p className="text-muted-foreground text-sm">
              We recommend enabling 2FA for better security.
            </p>
          </div>
          <Button variant="outline">Enable 2FA</Button>
        </CardContent>
      </Card>

      <Card className="border-red-100 bg-red-50/30 dark:border-red-900/30 dark:bg-red-950/10">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-xl font-bold text-red-600 dark:text-red-400">
                <AlertTriangle className="h-5 w-5" /> Danger Zone
              </CardTitle>
              <CardDescription>Irreversible actions for your account.</CardDescription>
            </div>
            <button
              onClick={() => setIsDeleteModalOpen(true)}
              disabled={isDeleting}
              className="bg-danger hover:bg-destructive/90 inline-flex items-center gap-2 rounded-md px-4 py-2 text-xs font-bold text-white shadow-sm transition-all active:scale-95 disabled:opacity-50"
            >
              {isDeleting ? (
                <Loader2 className="h-3 w-3 animate-spin" />
              ) : (
                <Trash2 className="h-3 w-3" />
              )}
              Delete Account
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-red-600/70 dark:text-red-400/70">
            Permanently delete your account and all of your content. This action cannot be undone.
          </p>
        </CardContent>
      </Card>

      {/* Delete Account Modal */}
      <Modal isOpen={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
        <ModalContent isBlurred role="alertdialog">
          <ModalHeader className="flex flex-col items-center text-center">
            <div className="bg-destructive/10 mb-4 flex h-12 w-12 items-center justify-center rounded-full">
              <AlertTriangle className="text-destructive h-6 w-6 text-red-500" />
            </div>
            <ModalTitle className="text-xl font-bold text-red-500">Delete Account</ModalTitle>
          </ModalHeader>
          <ModalBody className="py-4 text-center">
            <p className="text-foreground text-base font-medium">
              Are you sure you want to permanently delete your account? This action cannot be
              undone.
            </p>
          </ModalBody>
          <ModalFooter className="flex-col-reverse gap-2 sm:flex-row sm:justify-center">
            <Button
              variant="outline"
              onClick={() => setIsDeleteModalOpen(false)}
              disabled={isDeleting}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="bg-destructive bg-danger w-full text-white sm:w-auto"
            >
              {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Confirm Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}
