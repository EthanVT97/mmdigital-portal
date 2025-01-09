import { Button } from "@/components/ui/button";
import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useTranslation } from "react-i18next";
import { Facebook, Mail } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function SocialAuth() {
  const supabase = useSupabaseClient();
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleFacebookLogin = async () => {
    try {
      toast({
        title: "Connecting to Facebook",
        description: "You'll be redirected to Facebook to login and choose which pages to manage.",
      });

      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'facebook',
        options: {
          scopes: 'pages_manage_posts,pages_read_engagement,pages_show_list,pages_manage_metadata',
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Facebook login error:', error);
      toast({
        variant: "destructive",
        title: "Login Error",
        description: error instanceof Error ? error.message : "Failed to connect to Facebook",
      });
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Google login error:', error);
      toast({
        variant: "destructive",
        title: "Login Error",
        description: error instanceof Error ? error.message : "Failed to connect to Google",
      });
    }
  };

  return (
    <div className="grid gap-4">
      <div className="text-center">
        <h3 className="text-lg font-medium mb-1">Connect with MMDIGITAL</h3>
        <p className="text-sm text-muted-foreground">
          Manage your social media accounts in one place
        </p>
      </div>

      <Button
        type="button"
        variant="outline"
        className="w-full h-11 px-8 relative"
        onClick={handleFacebookLogin}
      >
        <div className="absolute left-4">
          <Facebook className="h-5 w-5 text-blue-600" />
        </div>
        <span className="mx-auto">{t('auth.login.facebook', 'Continue with Facebook')}</span>
      </Button>

      <Button
        type="button"
        variant="outline"
        className="w-full h-11 px-8 relative"
        onClick={handleGoogleLogin}
      >
        <div className="absolute left-4">
          <Mail className="h-5 w-5 text-red-500" />
        </div>
        <span className="mx-auto">{t('auth.login.google', 'Continue with Google')}</span>
      </Button>

      <div className="text-center text-xs text-muted-foreground mt-2">
        <p>{t('auth.login.youWillBeAsked', 'You\'ll be asked to:')}</p>
        <ul className="mt-1 space-y-1">
          <li>• {t('auth.login.loginToFacebook', 'Login to Facebook')}</li>
          <li>• {t('auth.login.grantPermission', 'Grant permission to manage your pages')}</li>
          <li>• {t('auth.login.selectPages', 'Select which pages to connect')}</li>
        </ul>
      </div>
    </div>
  );
}
