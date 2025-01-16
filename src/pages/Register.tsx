import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBrowserClient } from '@supabase/ssr';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Register() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const supabase = createBrowserClient(
    import.meta.env.VITE_SUPABASE_URL,
    import.meta.env.VITE_SUPABASE_ANON_KEY
  );

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });

      if (error) throw error;

      if (data?.user) {
        // Create a profile record
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              name,
              email,
            },
          ]);

        if (profileError) throw profileError;
      }

      toast({
        title: t('auth.register.success'),
        description: t('auth.register.success'),
      });
      navigate('/login');
    } catch (error: any) {
      console.error("Error registering:", error);
      toast({
        variant: "destructive",
        title: t('auth.register.error'),
        description: error.message || t('auth.register.errorMessage'),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md space-y-8 bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl text-center font-bold text-white">
            {t('auth.register.title')}
          </CardTitle>
          <CardDescription className="text-center text-gray-400">
            {t('auth.register.subtitle')}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-white">
                {t('auth.register.name')}
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-white">
                {t('auth.register.email')}
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="pl-10 bg-gray-700 border-gray-600 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">
                {t('auth.register.password')}
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="pl-10 pr-10 bg-gray-700 border-gray-600 text-white"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
              disabled={loading}
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {t('auth.register.submit')}
            </Button>
          </form>
        </CardContent>

        <CardFooter>
          <div className="w-full text-center text-sm text-gray-400">
            {t('auth.register.haveAccount')}{" "}
            <Button
              variant="link"
              className="text-cyan-500 hover:text-cyan-400"
              onClick={() => navigate('/login')}
            >
              {t('auth.register.login')}
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
