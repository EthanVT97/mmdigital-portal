import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, Shield, Palette, Globe, Mail, Phone } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Settings = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Notification Settings
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);
  
  // Privacy Settings
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [activityStatus, setActivityStatus] = useState(true);
  const [dataSharing, setDataSharing] = useState(false);
  
  // Appearance Settings
  const [darkMode, setDarkMode] = useState(true);
  const [compactView, setCompactView] = useState(false);
  
  const handleSaveSettings = () => {
    // Here you would typically save these settings to your backend
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="border-none bg-gray-800/50 backdrop-blur shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-100">Settings</CardTitle>
            <CardDescription className="text-gray-400">
              Manage your account settings and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="notifications" className="space-y-4">
              <TabsList className="bg-gray-700">
                <TabsTrigger value="notifications" className="data-[state=active]:bg-gray-600">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="privacy" className="data-[state=active]:bg-gray-600">
                  <Shield className="h-4 w-4 mr-2" />
                  Privacy
                </TabsTrigger>
                <TabsTrigger value="appearance" className="data-[state=active]:bg-gray-600">
                  <Palette className="h-4 w-4 mr-2" />
                  Appearance
                </TabsTrigger>
              </TabsList>

              <TabsContent value="notifications">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-gray-200">Email Notifications</Label>
                      <div className="text-sm text-gray-400">
                        Receive email updates about your account activity
                      </div>
                    </div>
                    <Switch
                      checked={emailNotifications}
                      onCheckedChange={setEmailNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-gray-200">Push Notifications</Label>
                      <div className="text-sm text-gray-400">
                        Get push notifications for important updates
                      </div>
                    </div>
                    <Switch
                      checked={pushNotifications}
                      onCheckedChange={setPushNotifications}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-gray-200">Marketing Emails</Label>
                      <div className="text-sm text-gray-400">
                        Receive emails about new features and promotions
                      </div>
                    </div>
                    <Switch
                      checked={marketingEmails}
                      onCheckedChange={setMarketingEmails}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="privacy">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-gray-200">Profile Visibility</Label>
                      <div className="text-sm text-gray-400">
                        Make your profile visible to other users
                      </div>
                    </div>
                    <Switch
                      checked={profileVisibility}
                      onCheckedChange={setProfileVisibility}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-gray-200">Activity Status</Label>
                      <div className="text-sm text-gray-400">
                        Show when you're active on the platform
                      </div>
                    </div>
                    <Switch
                      checked={activityStatus}
                      onCheckedChange={setActivityStatus}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-gray-200">Data Sharing</Label>
                      <div className="text-sm text-gray-400">
                        Share usage data to help improve our services
                      </div>
                    </div>
                    <Switch
                      checked={dataSharing}
                      onCheckedChange={setDataSharing}
                    />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="appearance">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-gray-200">Dark Mode</Label>
                      <div className="text-sm text-gray-400">
                        Use dark theme across the application
                      </div>
                    </div>
                    <Switch
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-gray-200">Compact View</Label>
                      <div className="text-sm text-gray-400">
                        Display more content with less spacing
                      </div>
                    </div>
                    <Switch
                      checked={compactView}
                      onCheckedChange={setCompactView}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => navigate(-1)}
              className="bg-gray-700 border-gray-600 text-gray-200 hover:bg-gray-600"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSaveSettings}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white"
            >
              Save Changes
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
