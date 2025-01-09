import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Music, TrendingUp, Users, Video, Calendar, BarChart2, Target, HelpCircle, BookOpen } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { TiktokLoginModal } from "@/components/tiktok/TiktokLoginModal";
import { TiktokGuide } from "@/components/tiktok/TiktokGuide";
import { TiktokSetupGuide } from "@/components/tiktok/TiktokSetupGuide";
import { TiktokDashboard } from "@/components/tiktok/TiktokDashboard";

export default function TiktokMarketing() {
  const [isConnected, setIsConnected] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [showSetupGuide, setShowSetupGuide] = useState(true);
  const { toast } = useToast();

  const handleConnect = async () => {
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    setIsConnected(true);
    setShowSetupGuide(false);
    toast({
      title: "TikTok Connected",
      description: "You can now manage your TikTok content and view analytics.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">TikTok Marketing</h1>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => setShowGuide(!showGuide)}
          >
            <HelpCircle className="h-4 w-4 mr-2" />
            Help Guide
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowSetupGuide(!showSetupGuide)}
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Setup Guide
          </Button>
          <Button 
            variant={isConnected ? "secondary" : "default"}
            onClick={handleConnect}
          >
            {isConnected ? "Connected to TikTok" : "Connect TikTok Account"}
          </Button>
        </div>
      </div>

      {showSetupGuide && (
        <Card>
          <CardContent className="pt-6">
            <TiktokSetupGuide />
          </CardContent>
        </Card>
      )}

      {showGuide && (
        <div className="mb-6">
          <TiktokGuide />
        </div>
      )}

      <TiktokLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />

      {isConnected ? (
        <TiktokDashboard />
      ) : (
        <Tabs defaultValue="overview">
          <TabsContent value="overview">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Connect Account</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Step 1</div>
                  <p className="text-xs text-muted-foreground">
                    Connect your TikTok account to get started
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Upload Content</CardTitle>
                  <Video className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Step 2</div>
                  <p className="text-xs text-muted-foreground">
                    Upload and manage your TikTok content
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Schedule Posts</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Step 3</div>
                  <p className="text-xs text-muted-foreground">
                    Schedule your content for optimal reach
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Track Analytics</CardTitle>
                  <BarChart2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">Step 4</div>
                  <p className="text-xs text-muted-foreground">
                    Monitor your content performance
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}
