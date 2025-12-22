'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/field'
import { fetchClient } from '@/lib/api-config'
import { useToast } from '@/hooks/use-toast'
import { Loader2, Search, Trash2, Save, User as UserIcon } from 'lucide-react'

interface UserData {
  id: string
  name: string
  email: string
  role?: string
  status?: string
  phone?: string
  [key: string]: any
}

export default function UserManagementPage() {
  const [userId, setUserId] = useState('')
  const [user, setUser] = useState<UserData | null>(null)
  const [loading, setLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)
  const [formData, setFormData] = useState<Partial<UserData>>({})
  const { toast } = useToast()

  const handleFetchUser = async (idToFetch?: string) => {
    const id = idToFetch || userId
    if (!id) {
      toast({
        title: 'Error',
        description: 'Please enter a User ID',
        variant: 'destructive',
      })
      return
    }

    setLoading(true)
    try {
      const response = await fetchClient(`/v1/users/${id}`)
      const userData = response?.data || response

      if (userData) {
        setUser(userData)
        setFormData(userData)
        toast({
          title: 'Success',
          description: 'User fetched successfully',
        })
      } else {
        setUser(null)
        setFormData({})
        toast({
          title: 'Not Found',
          description: 'No user data returned for this ID',
          variant: 'destructive',
        })
      }
    } catch (error: any) {
      console.error('Failed to fetch user', error)
      toast({
        title: 'Error',
        description: error.message || 'Failed to fetch user',
        variant: 'destructive',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateUser = async () => {
    if (!user) return

    setActionLoading(true)
    try {
      const response = await fetchClient(`/v1/users/${user.id}`, {
        method: 'PATCH',
        body: JSON.stringify(formData),
      })

      const updatedData = response?.data || response
      if (updatedData) {
        setUser({ ...user, ...updatedData })
        toast({
          title: 'Success',
          description: 'User updated successfully',
        })
      }
    } catch (error: any) {
      console.error('Failed to update user', error)
      toast({
        title: 'Error',
        description: error.message || 'Failed to update user',
        variant: 'destructive',
      })
    } finally {
      setActionLoading(false)
    }
  }

  const handleDeleteUser = async (idToDelete?: string) => {
    const id = idToDelete || user?.id
    if (!id) return

    if (!confirm(`Are you sure you want to delete user ${id}?`)) return

    setActionLoading(true)
    try {
      await fetchClient(`/v1/users/${id}`, {
        method: 'DELETE',
      })

      setUser(null)
      setFormData({})
      toast({
        title: 'Success',
        description: 'User deleted successfully',
      })
    } catch (error: any) {
      console.error('Failed to delete user', error)
      toast({
        title: 'Error',
        description: error.message || 'Failed to delete user',
        variant: 'destructive',
      })
    } finally {
      setActionLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        <p className="text-muted-foreground">Fetch, update, or delete users by their ID.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Find User</CardTitle>
          <CardDescription>Enter a User ID (UUID) to manage that user.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex-1">
              <Label htmlFor="userId" className="sr-only">
                User ID
              </Label>
              <input
                id="userId"
                placeholder="e.g. 2e631edf-794d-4c6c-b423-1590268a109e"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              />
            </div>
            <Button onClick={() => handleFetchUser()} disabled={loading}>
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Search className="mr-2 h-4 w-4" />
              )}
              Fetch User
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setUserId('2e631edf-794d-4c6c-b423-1590268a109e')
                handleFetchUser('2e631edf-794d-4c6c-b423-1590268a109e')
              }}
            >
              Test Get/Delete ID
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setUserId('15b8c744-fbe1-4c46-85cb-254d7460e879')
                handleFetchUser('15b8c744-fbe1-4c46-85cb-254d7460e879')
              }}
            >
              Test Patch ID
            </Button>
          </div>
        </CardContent>
      </Card>

      {user && (
        <Card className="animate-in fade-in slide-in-from-bottom-2 duration-300">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-primary/10 rounded-full p-2">
                  <UserIcon className="text-primary h-6 w-6" />
                </div>
                <div>
                  <CardTitle>{user.name || 'User Details'}</CardTitle>
                  <CardDescription>{user.id}</CardDescription>
                </div>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => handleDeleteUser()}
                disabled={actionLoading}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete User
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="name">Name</Label>
                <input
                  id="name"
                  value={formData.name || ''}
                  onChange={handleInputChange}
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="email">Email</Label>
                <input
                  id="email"
                  type="email"
                  value={formData.email || ''}
                  onChange={handleInputChange}
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="phone">Phone</Label>
                <input
                  id="phone"
                  value={formData.phone || ''}
                  onChange={handleInputChange}
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <Label htmlFor="role">Role</Label>
                <input
                  id="role"
                  value={formData.role || ''}
                  onChange={handleInputChange}
                  className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setUser(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdateUser} disabled={actionLoading}>
                {actionLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Updates
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
