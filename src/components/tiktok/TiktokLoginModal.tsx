import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ExternalLink, Info } from "lucide-react";

interface TiktokLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function TiktokLoginModal({ isOpen, onClose, onSuccess }: TiktokLoginModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // TODO: Replace with actual TikTok API integration
      await new Promise(resolve => setTimeout(resolve, 1500));
      toast({
        title: "Connected Successfully",
        description: "Your TikTok account has been connected.",
      });
      onSuccess();
      onClose();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Connection Failed",
        description: "Invalid username or password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openTikTokBusinessCenter = () => {
    window.open('https://business.tiktok.com/', '_blank');
  };

  const openTikTokHelp = () => {
    window.open('https://support.tiktok.com/en/business-and-creator', '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Connect TikTok Account</DialogTitle>
          <DialogDescription>
            Connect your TikTok Business account to manage your content
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="connect" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="connect">Connect Account</TabsTrigger>
            <TabsTrigger value="help">Need Help?</TabsTrigger>
          </TabsList>

          <TabsContent value="connect" className="space-y-4">
            <Alert>
              <Info className="h-4 w-4" />
              <AlertDescription>
                Make sure you're using a TikTok Business account. 
                <Button 
                  variant="link" 
                  className="px-1 text-blue-500"
                  onClick={openTikTokBusinessCenter}
                >
                  Convert to Business Account
                  <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </AlertDescription>
            </Alert>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">TikTok Username</Label>
                <Input
                  id="username"
                  placeholder="@yourusername"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Connecting..." : "Connect Account"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="help" className="space-y-4">
            <div className="space-y-4">
              <h3 className="font-medium">How to Connect Your Account:</h3>
              <ol className="list-decimal pl-4 space-y-2">
                <li>Make sure you have a TikTok Business account</li>
                <li>Enter your TikTok username (with @ symbol)</li>
                <li>Enter your TikTok password</li>
                <li>Click "Connect Account"</li>
                <li>Accept the permissions when prompted</li>
              </ol>

              <div className="pt-4">
                <h3 className="font-medium mb-2">Common Issues:</h3>
                <ul className="space-y-2">
                  <li>• Make sure you're using a Business account</li>
                  <li>• Check if your username is correct</li>
                  <li>• Ensure your account is verified</li>
                  <li>• Try logging out and back in to TikTok</li>
                </ul>
              </div>

              <div className="pt-4">
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={openTikTokHelp}
                >
                  Visit TikTok Help Center
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="text-xs text-center text-muted-foreground pt-4">
          By connecting, you agree to our Terms of Service and Privacy Policy
        </div>
      </DialogContent>
    </Dialog>
  );
}
