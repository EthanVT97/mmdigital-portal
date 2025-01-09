import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import useSocialPlatformStore from '@/stores/useSocialPlatformStore';
import { socialAuthService } from '@/services/socialAuth';
import { supabase } from "@/lib/supabase";
import { Provider } from "@supabase/supabase-js";
import { Facebook, Mail, MessageCircle, Video } from 'lucide-react';

export function PlatformConnections() {
  const { toast } = useToast();
  const { platforms, loading, error, connectPlatform, disconnectPlatform } = useSocialPlatformStore();
  const [telegramDialogOpen, setTelegramDialogOpen] = useState(false);
  const [botToken, setBotToken] = useState('');

  const handleConnect = async (platformId: string) => {
    try {
      await connectPlatform(platformId);
      toast({
        title: 'Platform Connected',
        description: 'Successfully connected to ' + platformId,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Connection Failed',
        description: error instanceof Error ? error.message : 'Failed to connect platform',
      });
    }
  };

  const handleDisconnect = async (platformId: string) => {
    try {
      await disconnectPlatform(platformId);
      toast({
        title: 'Platform Disconnected',
        description: 'Successfully disconnected from ' + platformId,
      });
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Disconnection Failed',
        description: error instanceof Error ? error.message : 'Failed to disconnect platform',
      });
    }
  };

  const handleTelegramConnect = async () => {
    try {
      const response = await socialAuthService.connectTelegram(botToken);
      if (response.success) {
        toast({
          title: 'Telegram Connected',
          description: 'Successfully connected Telegram bot',
        });
        setTelegramDialogOpen(false);
        setBotToken('');
      } else {
        throw new Error(response.error);
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Connection Failed',
        description: error instanceof Error ? error.message : 'Failed to connect Telegram bot',
      });
    }
  };

  const handleSocialLogin = async (provider: Provider) => {
    try {
      // Show a loading toast
      toast({
        title: "Connecting...",
        description: `Initiating ${provider} login`,
      });

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        throw error;
      }

      // If no error and no data, it means the redirect is happening
      if (!data.url) {
        toast({
          title: "Redirecting...",
          description: "Please wait while we redirect you to the provider.",
        });
      }

    } catch (error) {
      console.error('Error:', error);
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: error instanceof Error 
          ? error.message 
          : "Provider not enabled. Please try again later.",
      });
    }
  };

  // For development testing, only show enabled providers
  const enabledProviders = ['google', 'email'];

  const platformConfig = [
    {
      id: 'facebook',
      name: 'Facebook',
      icon: <Facebook className="h-6 w-6" />,
      description: 'Manage Facebook Page ads and posts',
      disabled: !enabledProviders.includes('facebook')
    },
    {
      id: 'google',
      name: 'Google',
      icon: <Mail className="h-6 w-6" />,
      description: 'Manage YouTube ads and Google Ads campaigns',
      disabled: !enabledProviders.includes('google')
    },
    {
      id: 'tiktok',
      name: 'TikTok',
      icon: <Video className="h-6 w-6" />,
      description: 'Create and manage TikTok ad campaigns',
      disabled: true
    },
    {
      id: 'telegram',
      name: 'Telegram',
      icon: <MessageCircle className="h-6 w-6" />,
      description: 'Schedule messages and manage Telegram bot',
      disabled: false
    }
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      {platformConfig.map((platform) => {
        const isConnected = platforms.some(p => p.id === platform.id);
        
        return (
          <Card key={platform.id} className="bg-gray-800 border-gray-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {platform.icon}
                  <CardTitle className="text-gray-100">{platform.name}</CardTitle>
                </div>
                <Badge variant={isConnected ? 'secondary' : 'outline'}>
                  {isConnected ? 'Connected' : 'Not Connected'}
                </Badge>
              </div>
              <CardDescription className="text-gray-400">
                {platform.description}
              </CardDescription>
            </CardHeader>
            <CardFooter>
              {platform.id === 'telegram' ? (
                <Button
                  variant={isConnected ? 'destructive' : 'default'}
                  onClick={() => isConnected ? handleDisconnect(platform.id) : setTelegramDialogOpen(true)}
                  disabled={loading || platform.disabled}
                >
                  {isConnected ? 'Disconnect' : 'Connect Bot'}
                </Button>
              ) : (
                <Button
                  variant={isConnected ? 'destructive' : 'default'}
                  onClick={() => isConnected ? handleDisconnect(platform.id) : handleConnect(platform.id)}
                  disabled={loading || platform.disabled}
                >
                  {isConnected ? 'Disconnect' : 'Connect'}
                </Button>
              )}
              {platform.disabled && (
                <Button
                  variant="outline"
                  onClick={() => handleSocialLogin(platform.id as Provider)}
                >
                  <platform.icon className="mr-2 h-4 w-4" />
                  Continue with {platform.name}
                </Button>
              )}
            </CardFooter>
          </Card>
        );
      })}

      <Dialog open={telegramDialogOpen} onOpenChange={setTelegramDialogOpen}>
        <DialogContent className="bg-gray-800 text-gray-100">
          <DialogHeader>
            <DialogTitle>Connect Telegram Bot</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="botToken">Bot Token</Label>
              <Input
                id="botToken"
                value={botToken}
                onChange={(e) => setBotToken(e.target.value)}
                placeholder="Enter your Telegram bot token"
                className="bg-gray-700 border-gray-600"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTelegramDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleTelegramConnect} disabled={!botToken || loading}>
              Connect
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
