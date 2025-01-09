import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, HelpCircle, BookOpen } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { FacebookLoginModal } from "@/components/facebook/FacebookLoginModal";
import { FacebookDashboard } from "@/components/facebook/FacebookDashboard";
import { FacebookSetupGuide } from "@/components/facebook/FacebookSetupGuide";

export default function FacebookMarketing() {
  const [isConnected, setIsConnected] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSetupGuide, setShowSetupGuide] = useState(true);
  const { toast } = useToast();

  const handleConnect = async () => {
    setShowLoginModal(true);
  };

  const handleLoginSuccess = () => {
    setIsConnected(true);
    setShowSetupGuide(false);
    toast({
      title: "Facebook Page Connected",
      description: "You can now manage your Facebook content and view analytics.",
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Facebook Marketing</h1>
        <div className="flex gap-2">
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
            {isConnected ? "Connected to Facebook" : "Connect Facebook Page"}
          </Button>
        </div>
      </div>

      {showSetupGuide && (
        <Card>
          <CardContent className="pt-6">
            <FacebookSetupGuide />
          </CardContent>
        </Card>
      )}

      <FacebookLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
      />

      {isConnected ? (
        <FacebookDashboard />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-2">
                <Users className="h-8 w-8 text-muted-foreground" />
                <h3 className="text-xl font-semibold">Step 1</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Create a Facebook Business Page
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-2">
                <HelpCircle className="h-8 w-8 text-muted-foreground" />
                <h3 className="text-xl font-semibold">Step 2</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Set up Business Manager
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-2">
                <Users className="h-8 w-8 text-muted-foreground" />
                <h3 className="text-xl font-semibold">Step 3</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Connect your Facebook Page
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center space-y-2">
                <HelpCircle className="h-8 w-8 text-muted-foreground" />
                <h3 className="text-xl font-semibold">Step 4</h3>
                <p className="text-sm text-center text-muted-foreground">
                  Start managing your content
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
