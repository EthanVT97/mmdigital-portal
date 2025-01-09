import { supabase } from '@/lib/supabase';
import { BusinessSuitePost, Post, PageInsights, PostInsights, AudienceInsights } from '@/types/facebook';

interface FacebookPage {
  id: string;
  name: string;
  access_token: string;
  category: string;
}

class FacebookService {
  private readonly baseUrl = 'https://graph.facebook.com/v18.0';
  private readonly businessUrl = 'https://business.facebook.com/latest';
  private accessToken: string | null = null;
  private businessId: string | null = null;

  async initialize() {
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.provider_token) {
      this.accessToken = session.provider_token;
    }
  }

  async getPages(): Promise<FacebookPage[]> {
    try {
      await this.initialize();
      if (!this.accessToken) throw new Error('Not authenticated');
      
      const response = await fetch(`${this.baseUrl}/me/accounts?access_token=${this.accessToken}`);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch pages');
      }
      
      const data = await response.json();
      if (!data.data) {
        throw new Error('No pages found');
      }
      
      return data.data.map((page: any) => ({
        id: page.id,
        name: page.name,
        access_token: page.access_token,
        category: page.category || 'Page',
      }));
    } catch (error) {
      console.error('Error fetching pages:', error);
      throw error;
    }
  }

  async createPost(pageId: string, post: Omit<BusinessSuitePost, 'id' | 'created_time' | 'status'>): Promise<BusinessSuitePost> {
    if (!this.accessToken) throw new Error('Not authenticated');
    
    const response = await fetch(`${this.baseUrl}/${pageId}/feed`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...post,
        access_token: this.accessToken,
      }),
    });
    
    return await response.json();
  }

  async getPosts(pageId: string): Promise<Post[]> {
    if (!this.accessToken) throw new Error('Not authenticated');
    
    const response = await fetch(
      `${this.baseUrl}/${pageId}/posts?fields=id,message,created_time,status,insights{impressions,reach,engagement}&access_token=${this.accessToken}`
    );
    const data = await response.json();
    return data.data;
  }

  async getPostInsights(pageId: string, postId: string): Promise<PostInsights> {
    if (!this.accessToken) throw new Error('Not authenticated');
    
    const response = await fetch(
      `${this.baseUrl}/${postId}/insights?metric=post_impressions,post_reactions_by_type,post_clicks&access_token=${this.accessToken}`
    );
    return await response.json();
  }

  async updatePost(pageId: string, postId: string, post: Partial<BusinessSuitePost>): Promise<BusinessSuitePost> {
    if (!this.accessToken) throw new Error('Not authenticated');
    
    const response = await fetch(`${this.baseUrl}/${postId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...post,
        access_token: this.accessToken,
      }),
    });
    
    return await response.json();
  }

  async deletePost(pageId: string, postId: string): Promise<boolean> {
    if (!this.accessToken) throw new Error('Not authenticated');
    
    const response = await fetch(`${this.baseUrl}/${postId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
      },
    });
    
    return response.ok;
  }

  async getPageInsights(pageId: string): Promise<PageInsights> {
    if (!this.accessToken) throw new Error('Not authenticated');
    
    const response = await fetch(
      `${this.baseUrl}/${pageId}/insights?metric=page_impressions,page_engaged_users,page_fans&period=day&access_token=${this.accessToken}`
    );
    const data: PostInsights = await response.json();
    
    return {
      impressions: data.data.find(d => d.name === 'page_impressions')?.values.map(v => ({ value: v.value as number, end_time: '' })) || [],
      engagement: data.data.find(d => d.name === 'page_engaged_users')?.values.map(v => ({ value: v.value as number, end_time: '' })) || [],
      fans: data.data.find(d => d.name === 'page_fans')?.values.map(v => ({ value: v.value as number, end_time: '' })) || [],
    };
  }

  async getAudienceInsights(pageId: string): Promise<AudienceInsights> {
    if (!this.accessToken) throw new Error('Not authenticated');
    
    const response = await fetch(
      `${this.baseUrl}/${pageId}/insights?metric=page_fans_gender_age,page_fans_country&access_token=${this.accessToken}`
    );
    const data: PostInsights = await response.json();
    
    return {
      demographics: {
        age_gender: (data.data.find(d => d.name === 'page_fans_gender_age')?.values[0]?.value as Record<string, number>) || {},
        countries: (data.data.find(d => d.name === 'page_fans_country')?.values[0]?.value as Record<string, number>) || {},
      },
    };
  }

  async previewPost(post: Omit<BusinessSuitePost, 'id' | 'created_time' | 'status'>): Promise<string> {
    if (!this.accessToken) throw new Error('Not authenticated');
    
    const response = await fetch(`${this.baseUrl}/preview`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`,
      },
      body: JSON.stringify(post),
    });
    
    const data = await response.json();
    return data.preview_url;
  }
}

export const facebookService = new FacebookService();
