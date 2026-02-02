import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { authAPI } from "../api";
import { Button, Card, Input } from "../components/common";
import { User, Shield, Sliders } from "lucide-react";

const Settings = () => {
  const { user, updateProfile } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [profileLoading, setProfileLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [profileSuccess, setProfileSuccess] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [profileError, setProfileError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileError("");
    setProfileSuccess("");
    const result = await updateProfile({
      firstName: profileData.firstName,
      lastName: profileData.lastName,
    });
    setProfileLoading(false);
    if (result.success) setProfileSuccess("Profile updated successfully!");
    else setProfileError(result.error || "Failed to update profile");
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    if (passwordData.newPassword.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    setPasswordLoading(true);
    setPasswordError("");
    setPasswordSuccess("");
    try {
      await authAPI.changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      setPasswordSuccess("Password changed successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setPasswordError(
        err.response?.data?.message || "Failed to change password",
      );
    } finally {
      setPasswordLoading(false);
    }
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Sliders },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-6 border-b border-secondary/5 dark:border-white/5 pb-8">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <span className="h-[1px] w-8 bg-primary"></span>
            <span className="font-mono text-[10px] text-primary uppercase tracking-widest">
              Executive Configuration
            </span>
          </div>
          <h1 className="text-4xl font-bold text-secondary dark:text-background-light uppercase tracking-tight">
            Settings
          </h1>
          <p className="font-serif italic text-secondary/60 dark:text-background-light/60 mt-2">
            Tailor your financial environment.
          </p>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 shrink-0">
          <Card
            padding={false}
            variant="outline"
            className="bg-transparent border-none"
          >
            <div className="flex flex-col gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-none text-left transition-all relative ${activeTab === tab.id ? "text-primary bg-primary/5" : "text-secondary/60 dark:text-background-light/60 hover:text-secondary dark:hover:text-background-light hover:bg-secondary/5"}`}
                >
                  {activeTab === tab.id && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-4 bg-primary" />
                  )}
                  <tab.icon size={20} strokeWidth={1.5} />
                  <span className="font-mono text-[10px] uppercase tracking-widest">
                    {tab.label}
                  </span>
                </button>
              ))}
            </div>
          </Card>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <Card
              title="Profile Information"
              subtitle="Update your personal information"
            >
              {profileSuccess && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                  {profileSuccess}
                </div>
              )}
              {profileError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {profileError}
                </div>
              )}
              <form
                onSubmit={handleProfileSubmit}
                className="flex flex-col gap-4 max-w-md"
              >
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    value={profileData.firstName}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        firstName: e.target.value,
                      })
                    }
                    required
                  />
                  <Input
                    label="Last Name"
                    value={profileData.lastName}
                    onChange={(e) =>
                      setProfileData({
                        ...profileData,
                        lastName: e.target.value,
                      })
                    }
                    required
                  />
                </div>
                <Input
                  label="Email"
                  type="email"
                  value={profileData.email}
                  disabled
                />
                <Button
                  type="submit"
                  loading={profileLoading}
                  className="w-fit mt-2"
                >
                  Save Changes
                </Button>
              </form>
            </Card>
          )}

          {activeTab === "security" && (
            <Card
              title="Change Password"
              subtitle="Update your password to keep your account secure"
            >
              {passwordSuccess && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm">
                  {passwordSuccess}
                </div>
              )}
              {passwordError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {passwordError}
                </div>
              )}
              <form
                onSubmit={handlePasswordSubmit}
                className="flex flex-col gap-4 max-w-md"
              >
                <Input
                  label="Current Password"
                  type="password"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      currentPassword: e.target.value,
                    })
                  }
                  required
                />
                <Input
                  label="New Password"
                  type="password"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      newPassword: e.target.value,
                    })
                  }
                  required
                />
                <Input
                  label="Confirm New Password"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                />
                <Button
                  type="submit"
                  loading={passwordLoading}
                  className="w-fit mt-2"
                >
                  Change Password
                </Button>
              </form>
            </Card>
          )}

          {activeTab === "preferences" && (
            <Card
              title="Experience Control"
              subtitle="Personalize your interaction layer"
            >
              <div className="flex flex-col gap-8 max-w-md">
                <div className="flex items-center justify-between p-6 border border-secondary/5 dark:border-white/5 bg-background-alt/30 dark:bg-white/5 rounded-none">
                  <div>
                    <h4 className="font-serif italic text-lg text-secondary dark:text-background-light">
                      Visual Tone
                    </h4>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-secondary/40 dark:text-background-light/40 mt-1">
                      Toggle dark interface mode
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      document.documentElement.classList.toggle("dark")
                    }
                    className="relative w-10 h-5 rounded-none bg-secondary/10 dark:bg-primary transition-colors"
                  >
                    <span className="absolute left-1 top-1 w-3 h-3 rounded-none bg-white dark:translate-x-5 transition-transform"></span>
                  </button>
                </div>
                <div className="flex items-center justify-between p-6 border border-secondary/5 dark:border-white/5 bg-background-alt/30 dark:bg-white/5 rounded-none">
                  <div>
                    <h4 className="font-serif italic text-lg text-secondary dark:text-background-light">
                      Base Currency
                    </h4>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-secondary/40 dark:text-background-light/40 mt-1">
                      Primary transactional unit
                    </p>
                  </div>
                  <span className="font-mono text-xs text-secondary dark:text-background-light bg-secondary/10 dark:bg-white/10 px-2 py-1">
                    INR / ₹
                  </span>
                </div>
                <div className="flex items-center justify-between p-6 border border-secondary/5 dark:border-white/5 bg-background-alt/30 dark:bg-white/5 rounded-none">
                  <div>
                    <h4 className="font-serif italic text-lg text-secondary dark:text-background-light">
                      Broadcasts
                    </h4>
                    <p className="text-[10px] font-mono uppercase tracking-wider text-secondary/40 dark:text-background-light/40 mt-1">
                      Institutional intelligence alerts
                    </p>
                  </div>
                  <button className="relative w-10 h-5 rounded-none bg-primary transition-colors">
                    <span className="absolute left-1 top-1 w-3 h-3 rounded-none bg-white translate-x-5 transition-transform"></span>
                  </button>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
