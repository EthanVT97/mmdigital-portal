import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';

export default function AuthCallback() {
  const supabase = useSupabaseClient();
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error('Auth callback error:', error);
        navigate('/login');
        return;
      }

      if (session) {
        // Check if we were trying to access Facebook Marketing
        const params = new URLSearchParams(window.location.search);
        const returnTo = params.get('returnTo');
        
        if (returnTo?.includes('facebook-marketing')) {
          navigate('/facebook-marketing');
        } else {
          navigate('/dashboard');
        }
      } else {
        navigate('/login');
      }
    };

    handleAuthCallback();
  }, [supabase.auth, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}
