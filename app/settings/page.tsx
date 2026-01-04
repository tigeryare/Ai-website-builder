"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Settings() {
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [company, setCompany] = useState("")
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser")
    if (savedUser) {
      const user = JSON.parse(savedUser)
      setFullName(user.name)
      setEmail(user.email)
      setCompany(user.company || "")
    }
    setIsLoading(false)
  }, [])

  const handleSave = async () => {
    setIsSaving(true)
    const updatedUser = { name: fullName, email, company }
    localStorage.setItem("currentUser", JSON.stringify(updatedUser))

    const users = JSON.parse(localStorage.getItem("users") || "[]")
    const userIndex = users.findIndex((u: any) => u.email === email)
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], name: fullName, company }
      localStorage.setItem("users", JSON.stringify(users))
    }

    setTimeout(() => {
      setIsSaving(false)
      alert("Settings saved successfully!")
    }, 1000)
  }

  const handleSignOut = () => {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("builder_state")
    router.push("/")
  }

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Profile Section */}
        <div className="glass-effect p-6 mb-6">
          <h2 className="text-xl font-bold mb-6">Profile Information</h2>

          <div className="space-y-6">
            {/* Avatar */}
            <div>
              <label className="block text-sm font-medium mb-3">Profile Picture</label>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-foreground">
                  {fullName.charAt(0).toUpperCase()}
                </div>
                <Button variant="outline" className="border-border/50 bg-transparent hover:bg-muted/50">
                  Change Avatar
                </Button>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium mb-2">Full Name</label>
              <Input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="bg-input border-border/50 text-foreground placeholder:text-muted-foreground"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input border-border/50 text-foreground placeholder:text-muted-foreground"
                disabled
              />
            </div>

           
            
          </div>

          <div className="mt-6 flex gap-3">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
            <Button variant="outline" className="border-border/50 bg-transparent hover:bg-muted/50">
              Cancel
            </Button>
          </div>
        </div>

        {/* Security Section */}
        <div className="glass-effect p-6 mb-6">
          <h2 className="text-xl font-bold mb-6">Security</h2>

          <div className="space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-border/50">
              <div>
                <p className="font-medium">Password</p>
                <p className="text-sm text-muted-foreground">Last changed 2 months ago</p>
              </div>
              <Button variant="outline" className="border-border/50 bg-transparent hover:bg-muted/50">
                Change
              </Button>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-border/50">
              <div>
                <p className="font-medium">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Button variant="outline" className="border-border/50 bg-transparent hover:bg-muted/50">
                Enable
              </Button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Connected Devices</p>
                <p className="text-sm text-muted-foreground">Manage your active sessions</p>
              </div>
              <Button variant="outline" className="border-border/50 bg-transparent hover:bg-muted/50">
                Manage
              </Button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="glass-effect p-6 border-2 border-destructive/20">
          <h2 className="text-xl font-bold mb-4 text-destructive">Danger Zone</h2>
          <p className="text-muted-foreground mb-4">
            Deleting your account is permanent and cannot be undone. All your projects will be deleted.
          </p>
          <Button variant="destructive" className="w-full" onClick={handleSignOut}>
            Delete Account
          </Button>
        </div>
      </div>
    </DashboardLayout>
  )
}
