import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { authAPI } from '../api'
import { Button, Card, Input } from '../components/common'

const Settings = () => {
  const { user, updateProfile } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')
  const [profileData, setProfileData] = useState({ firstName: user?.firstName || '', lastName: user?.lastName || '', email: user?.email || '' })
  const [passwordData, setPasswordData] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [profileLoading, setProfileLoading] = useState(false)
  const [passwordLoading, setPasswordLoading] = useState(false)
  const [profileSuccess, setProfileSuccess] = useState('')
  const [passwordSuccess, setPasswordSuccess] = useState('')
  const [profileError, setProfileError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleProfileSubmit = async (e) => {
    e.preventDefault()
    setProfileLoading(true)
    setProfileError('')
    setProfileSuccess('')
    const result = await updateProfile({ firstName: profileData.firstName, lastName: profileData.lastName })
    setProfileLoading(false)
    if (result.success) setProfileSuccess('Profile updated successfully!')
    else setProfileError(result.error || 'Failed to update profile')
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) { setPasswordError('Passwords do not match'); return }
    if (passwordData.newPassword.length < 6) { setPasswordError('Password must be at least 6 characters'); return }
    setPasswordLoading(true)
    setPasswordError('')
    setPasswordSuccess('')
    try {
      await authAPI.changePassword({ currentPassword: passwordData.currentPassword, newPassword: passwordData.newPassword })
      setPasswordSuccess('Password changed successfully!')
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (err) { setPasswordError(err.response?.data?.message || 'Failed to change password') }
    finally { setPasswordLoading(false) }
  }

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'person' },
    { id: 'security', label: 'Security', icon: 'lock' },
    { id: 'preferences', label: 'Preferences', icon: 'tune' }
  ]

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111318] dark:text-white">Settings</h1>
        <p className="text-[#617089] mt-1">Manage your account settings and preferences</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 shrink-0">
          <Card padding={false}>
            <div className="flex flex-col p-2">
              {tabs.map((tab) => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${activeTab === tab.id ? 'bg-primary/10 text-primary' : 'text-[#617089] hover:bg-gray-50 dark:hover:bg-white/5'}`}>
                  <span className="material-symbols-outlined">{tab.icon}</span>
                  <span className="font-medium">{tab.label}</span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <Card title="Profile Information" subtitle="Update your personal information">
              {profileSuccess && <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">{profileSuccess}</div>}
              {profileError && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{profileError}</div>}
              <form onSubmit={handleProfileSubmit} className="flex flex-col gap-4 max-w-md">
                <div className="grid grid-cols-2 gap-4">
                  <Input label="First Name" value={profileData.firstName} onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })} required />
                  <Input label="Last Name" value={profileData.lastName} onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })} required />
                </div>
                <Input label="Email" type="email" value={profileData.email} disabled />
                <Button type="submit" loading={profileLoading} className="w-fit mt-2">Save Changes</Button>
              </form>
            </Card>
          )}

          {activeTab === 'security' && (
            <Card title="Change Password" subtitle="Update your password to keep your account secure">
              {passwordSuccess && <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">{passwordSuccess}</div>}
              {passwordError && <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">{passwordError}</div>}
              <form onSubmit={handlePasswordSubmit} className="flex flex-col gap-4 max-w-md">
                <Input label="Current Password" type="password" value={passwordData.currentPassword} onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })} required />
                <Input label="New Password" type="password" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} required />
                <Input label="Confirm New Password" type="password" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} required />
                <Button type="submit" loading={passwordLoading} className="w-fit mt-2">Change Password</Button>
              </form>
            </Card>
          )}

          {activeTab === 'preferences' && (
            <Card title="Preferences" subtitle="Customize your experience">
              <div className="flex flex-col gap-6 max-w-md">
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-lg">
                  <div>
                    <h4 className="font-medium text-[#111318] dark:text-white">Dark Mode</h4>
                    <p className="text-sm text-[#617089]">Switch between light and dark themes</p>
                  </div>
                  <button onClick={() => document.documentElement.classList.toggle('dark')} className="relative w-12 h-6 rounded-full bg-gray-200 dark:bg-primary transition-colors">
                    <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white dark:translate-x-6 transition-transform shadow"></span>
                  </button>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-lg">
                  <div>
                    <h4 className="font-medium text-[#111318] dark:text-white">Currency</h4>
                    <p className="text-sm text-[#617089]">Display currency for amounts</p>
                  </div>
                  <span className="text-[#111318] dark:text-white font-medium">₹ INR</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-lg">
                  <div>
                    <h4 className="font-medium text-[#111318] dark:text-white">Email Notifications</h4>
                    <p className="text-sm text-[#617089]">Receive weekly spending summaries</p>
                  </div>
                  <button className="relative w-12 h-6 rounded-full bg-primary transition-colors">
                    <span className="absolute left-1 top-1 w-4 h-4 rounded-full bg-white translate-x-6 transition-transform shadow"></span>
                  </button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings

