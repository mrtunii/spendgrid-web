import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Save, UserPlus, X, Bell, Mail, Webhook, Slack } from 'lucide-react'

export function ProjectSettings() {
  const [projectName, setProjectName] = useState("My Project")
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
  const [inviteEmails, setInviteEmails] = useState("")
  const [invitedUsers, setInvitedUsers] = useState([
    { email: "user1@example.com", status: "Joined", joinedAt: "2023-06-15" },
    { email: "user2@example.com", status: "Pending", invitedAt: "2023-06-20" },
  ])
  const [notificationPreferences, setNotificationPreferences] = useState({
    email: {
      enabled: true,
      address: "user@example.com",
      frequency: "daily",
    },
    slack: {
      enabled: false,
      webhook: "",
      channel: "",
    },
    webhook: {
      enabled: false,
      url: "",
    },
  })
  const [paymentNotificationDays, setPaymentNotificationDays] = useState(10)

  const handleSaveSettings = () => {
    console.log("Saving settings:", { projectName, notificationPreferences, paymentNotificationDays })
  }

  const handleInviteUsers = () => {
    const newInvites = inviteEmails.split(',').map(email => ({
      email: email.trim(),
      status: "Pending",
      invitedAt: new Date().toISOString().split('T')[0]
    }))
    setInvitedUsers([...invitedUsers, ...newInvites])
    setInviteEmails("")
    setIsInviteModalOpen(false)
  }

  const updateNotificationPreference = (method, field, value) => {
    setNotificationPreferences(prev => ({
      ...prev,
      [method]: {
        ...prev[method],
        [field]: value
      }
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Project Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>General Settings</CardTitle>
            <CardDescription>Basic information about your project</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="project-name">Project Name</Label>
              <Input
                id="project-name"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="project-timezone">Project Timezone</Label>
              <Select defaultValue="utc">
                <SelectTrigger>
                  <SelectValue placeholder="Select project timezone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="utc">UTC</SelectItem>
                  <SelectItem value="est">Eastern Time (ET)</SelectItem>
                  <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                  <SelectItem value="cet">Central European Time (CET)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notification Preferences</CardTitle>
            <CardDescription>Manage how and when you receive notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="email" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="email">
                  <Mail className="w-4 h-4 mr-2" />
                  Email
                </TabsTrigger>
                <TabsTrigger value="slack">
                  <Slack className="w-4 h-4 mr-2" />
                  Slack
                </TabsTrigger>
                <TabsTrigger value="webhook">
                  <Webhook className="w-4 h-4 mr-2" />
                  Webhook
                </TabsTrigger>
              </TabsList>
              <TabsContent value="email" className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="email-notifications"
                    checked={notificationPreferences.email.enabled}
                    onCheckedChange={(checked) => updateNotificationPreference('email', 'enabled', checked)}
                  />
                  <Label htmlFor="email-notifications">Enable Email Notifications</Label>
                </div>
                <div>
                  <Label htmlFor="email-address">Email Address</Label>
                  <Input
                    id="email-address"
                    value={notificationPreferences.email.address}
                    onChange={(e) => updateNotificationPreference('email', 'address', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email-frequency">Notification Frequency</Label>
                  <Select
                    value={notificationPreferences.email.frequency}
                    onValueChange={(value) => updateNotificationPreference('email', 'frequency', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="realtime">Real-time</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Summary</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>
              <TabsContent value="slack" className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="slack-notifications"
                    checked={notificationPreferences.slack.enabled}
                    onCheckedChange={(checked) => updateNotificationPreference('slack', 'enabled', checked)}
                  />
                  <Label htmlFor="slack-notifications">Enable Slack Notifications</Label>
                </div>
                <div>
                  <Label htmlFor="slack-webhook">Slack Webhook URL</Label>
                  <Input
                    id="slack-webhook"
                    value={notificationPreferences.slack.webhook}
                    onChange={(e) => updateNotificationPreference('slack', 'webhook', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="slack-channel">Slack Channel</Label>
                  <Input
                    id="slack-channel"
                    value={notificationPreferences.slack.channel}
                    onChange={(e) => updateNotificationPreference('slack', 'channel', e.target.value)}
                  />
                </div>
              </TabsContent>
              <TabsContent value="webhook" className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="webhook-notifications"
                    checked={notificationPreferences.webhook.enabled}
                    onCheckedChange={(checked) => updateNotificationPreference('webhook', 'enabled', checked)}
                  />
                  <Label htmlFor="webhook-notifications">Enable Webhook Notifications</Label>
                </div>
                <div>
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input
                    id="webhook-url"
                    value={notificationPreferences.webhook.url}
                    onChange={(e) => updateNotificationPreference('webhook', 'url', e.target.value)}
                  />
                </div>
              </TabsContent>
            </Tabs>
            <div className="mt-4">
              <Label htmlFor="payment-notification-days">Send payment notifications when due date is within</Label>
              <div className="flex items-center space-x-2 mt-2">
                <Input
                  id="payment-notification-days"
                  type="number"
                  value={paymentNotificationDays}
                  onChange={(e) => setPaymentNotificationDays(parseInt(e.target.value))}
                  className="w-20"
                />
                <span>days</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Collaboration</CardTitle>
          <CardDescription>Manage team members and invitations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Invited Users</h3>
              <Dialog open={isInviteModalOpen} onOpenChange={setIsInviteModalOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <UserPlus className="mr-2 h-4 w-4" />
                    Invite Users
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Invite Users</DialogTitle>
                    <DialogDescription>
                      Enter email addresses of users you want to invite. Separate multiple emails with commas.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Textarea
                      placeholder="user@example.com, another@example.com"
                      value={inviteEmails}
                      onChange={(e) => setInviteEmails(e.target.value)}
                    />
                  </div>
                  <DialogFooter>
                    <Button onClick={handleInviteUsers}>Send Invitations</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invitedUsers.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant={user.status === "Joined" ? "success" : "warning"}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.joinedAt || user.invitedAt}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <X className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8 flex justify-end">
        <Button onClick={handleSaveSettings} size="lg">
          <Save className="mr-2 h-4 w-4" />
          Save All Settings
        </Button>
      </div>
    </div>
  )
}