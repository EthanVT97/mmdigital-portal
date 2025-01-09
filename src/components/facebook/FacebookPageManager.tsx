import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from '@/lib/supabase';

export function FacebookPageManager() {
  const [pageId, setPageId] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleAddPage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pageId.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a Facebook page ID",
      });
      return;
    }

    setLoading(true);
    try {
      // Store the page ID in Supabase
      const { data, error } = await supabase
        .from('facebook_pages')
        .insert([
          { 
            page_id: pageId,
            user_id: (await supabase.auth.getUser()).data.user?.id,
            status: 'active'
          }
        ]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "Facebook page added successfully",
      });

      setPageId('');
    } catch (error) {
      console.error('Error adding page:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to add Facebook page",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Facebook Page Manager</CardTitle>
        <CardDescription>
          Enter your Facebook page ID to manage posts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleAddPage} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Enter Facebook Page ID"
              value={pageId}
              onChange={(e) => setPageId(e.target.value)}
              className="w-full"
            />
            <p className="text-sm text-muted-foreground">
              You can find your page ID in your Facebook page's About section
            </p>
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Adding..." : "Add Facebook Page"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
