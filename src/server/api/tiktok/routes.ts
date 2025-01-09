import { Router } from 'express';
import { createClient } from '@supabase/supabase-js';
import { TikTokService } from '@/services/tiktok';

const router = Router();
const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.VITE_SUPABASE_ANON_KEY!
);

// TikTok OAuth callback handler
router.get('/auth/callback', async (req, res) => {
  try {
    const { code } = req.query;
    const { user } = await supabase.auth.getUser();

    if (!code || !user) {
      throw new Error('Invalid authentication');
    }

    const tokenResponse = await TikTokService.exchangeCodeForToken(code as string);
    
    // Store tokens in Supabase
    await supabase.from('tiktok_accounts').upsert({
      user_id: user.id,
      access_token: tokenResponse.access_token,
      refresh_token: tokenResponse.refresh_token,
      username: tokenResponse.username,
    });

    res.redirect('/tiktok-marketing?success=true');
  } catch (error) {
    console.error('TikTok auth error:', error);
    res.redirect('/tiktok-marketing?error=auth_failed');
  }
});

// Get TikTok account info
router.get('/account/info', async (req, res) => {
  try {
    const { user } = await supabase.auth.getUser();
    const { data: account } = await supabase
      .from('tiktok_accounts')
      .select('*')
      .eq('user_id', user?.id)
      .single();

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    const profile = await TikTokService.getUserProfile(account.access_token);
    res.json(profile);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch account info' });
  }
});

// Upload video
router.post('/video/upload', async (req, res) => {
  try {
    const { user } = await supabase.auth.getUser();
    const { data: account } = await supabase
      .from('tiktok_accounts')
      .select('*')
      .eq('user_id', user?.id)
      .single();

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    const { title, description, videoFile, privacy } = req.body;
    const result = await TikTokService.uploadVideo({
      title,
      description,
      videoFile,
      privacy,
      accessToken: account.access_token,
    });

    // Store video info in database
    await supabase.from('tiktok_videos').insert({
      account_id: account.id,
      tiktok_video_id: result.video_id,
      title,
      description,
      privacy,
      video_url: result.video_url,
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to upload video' });
  }
});

// Get analytics
router.get('/analytics', async (req, res) => {
  try {
    const { user } = await supabase.auth.getUser();
    const { data: account } = await supabase
      .from('tiktok_accounts')
      .select('*')
      .eq('user_id', user?.id)
      .single();

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    const { days = 7 } = req.query;
    const analytics = await TikTokService.getAnalytics(account.access_token, Number(days));

    // Store analytics in database
    await supabase.from('tiktok_analytics').insert({
      account_id: account.id,
      date: new Date(),
      ...analytics,
    });

    res.json(analytics);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

// Refresh token
router.post('/token/refresh', async (req, res) => {
  try {
    const { user } = await supabase.auth.getUser();
    const { data: account } = await supabase
      .from('tiktok_accounts')
      .select('*')
      .eq('user_id', user?.id)
      .single();

    if (!account) {
      return res.status(404).json({ error: 'Account not found' });
    }

    const newToken = await TikTokService.refreshToken(account.refresh_token);
    
    // Update token in database
    await supabase.from('tiktok_accounts').update({
      access_token: newToken.access_token,
      refresh_token: newToken.refresh_token,
    }).eq('id', account.id);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: 'Failed to refresh token' });
  }
});

export default router;
