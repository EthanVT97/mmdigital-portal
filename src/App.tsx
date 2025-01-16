import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserClient } from '@supabase/ssr';
import { createContext, useContext } from 'react';
import { Session } from '@supabase/supabase-js';
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "@/components/layout";
import { lazy, Suspense } from 'react';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import i18n from './i18n';
import emailjs from '@emailjs/browser';
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

// Lazy load pages
const Dashboard = lazy(() => import('@/pages/Dashboard'));
const Profile = lazy(() => import('@/pages/Profile'));
const Settings = lazy(() => import('@/pages/Settings'));
const Analytics = lazy(() => import('@/pages/Analytics'));
const FacebookMarketing = lazy(() => import('./pages/FacebookMarketing'));
const TiktokMarketing = lazy(() => import('./pages/TiktokMarketing'));
const GoogleMarketing = lazy(() => import('./pages/GoogleMarketing'));
const TelegramMarketing = lazy(() => import('./pages/TelegramMarketing'));
const Index = lazy(() => import('@/pages/Index'));
const About = lazy(() => import('@/pages/About'));
const Services = lazy(() => import('@/pages/Services'));
const FAQ = lazy(() => import('@/pages/FAQ'));
const Login = lazy(() => import('@/pages/Login'));
const Register = lazy(() => import('@/pages/Register'));
const FacebookCampaign = lazy(() => import('@/pages/campaigns/FacebookCampaign'));
const TelegramCampaign = lazy(() => import('@/pages/campaigns/TelegramCampaign'));
const GoogleCampaign = lazy(() => import('@/pages/campaigns/GoogleCampaign'));
const TikTokCampaign = lazy(() => import('@/pages/campaigns/TikTokCampaign'));
const YouTubeCampaign = lazy(() => import('@/pages/campaigns/YouTubeCampaign'));
const AuthCallback = lazy(() => import('@/pages/auth/AuthCallback'));
const Footer = lazy(() => import('@/components/Footer'));
const ProtectedRoute = lazy(() => import('@/components/ProtectedRoute'));

const queryClient = new QueryClient();

const supabase = createBrowserClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY);

export const SessionContext = createContext<{
  session: Session | null;
  loading: boolean;
}>({
  session: null,
  loading: true,
});

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error('useSession must be used within a SessionProvider');
  }
  return context;
};

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <SessionContext.Provider value={{ session, loading }}>
      <I18nextProvider i18n={i18n}>
        <ThemeProvider defaultTheme="light">
          <QueryClientProvider client={queryClient}>
            <TooltipProvider>
              <Router>
                <Routes>
                  {/* Public Routes */}
                  <Route path="/" element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Index />
                    </Suspense>
                  } />
                  <Route path="/about" element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <About />
                    </Suspense>
                  } />
                  <Route path="/services" element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Services />
                    </Suspense>
                  } />
                  <Route path="/faq" element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <FAQ />
                    </Suspense>
                  } />
                  <Route path="/login" element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Login />
                    </Suspense>
                  } />
                  <Route path="/register" element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <Register />
                    </Suspense>
                  } />
                  <Route path="/auth/callback" element={
                    <Suspense fallback={<LoadingSpinner />}>
                      <AuthCallback />
                    </Suspense>
                  } />

                  {/* Protected Routes */}
                  <Route element={<ProtectedRoute><Layout><Outlet /></Layout></ProtectedRoute>}>
                    <Route path="/dashboard" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Dashboard />
                      </Suspense>
                    } />
                    <Route path="/profile" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Profile />
                      </Suspense>
                    } />
                    <Route path="/facebook-marketing" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <FacebookMarketing />
                      </Suspense>
                    } />
                    <Route path="/tiktok-marketing" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <TiktokMarketing />
                      </Suspense>
                    } />
                    <Route path="/google-marketing" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <GoogleMarketing />
                      </Suspense>
                    } />
                    <Route path="/telegram-marketing" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <TelegramMarketing />
                      </Suspense>
                    } />
                    <Route path="/settings" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Settings />
                      </Suspense>
                    } />
                    <Route path="/analytics" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <Analytics />
                      </Suspense>
                    } />
                    <Route path="/facebook-campaign" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <FacebookCampaign />
                      </Suspense>
                    } />
                    <Route path="/telegram-campaign" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <TelegramCampaign />
                      </Suspense>
                    } />
                    <Route path="/google-campaign" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <GoogleCampaign />
                      </Suspense>
                    } />
                    <Route path="/tiktok-campaign" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <TikTokCampaign />
                      </Suspense>
                    } />
                    <Route path="/youtube-campaign" element={
                      <Suspense fallback={<LoadingSpinner />}>
                        <YouTubeCampaign />
                      </Suspense>
                    } />
                  </Route>

                  {/* Catch all */}
                  <Route path="*" element={<Navigate to="/" />} />
                </Routes>
                <Suspense fallback={<LoadingSpinner />}>
                  <Footer />
                </Suspense>
                <Sonner />
                <Toaster />
              </Router>
            </TooltipProvider>
          </QueryClientProvider>
        </ThemeProvider>
      </I18nextProvider>
    </SessionContext.Provider>
  );
}

export default App;