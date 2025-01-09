import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarIcon, ImageIcon, Loader2, Pencil, Trash2, BarChart2, Link2, Globe2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { supabase } from '@/lib/supabase';
import { facebookService } from '@/services/facebook';
import { Post, BusinessSuitePost, AudienceInsights } from '@/types/facebook';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface Props {
  pageId: string;
  pageName?: string;
}

export function FacebookPostManager({ pageId, pageName }: Props) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [audienceInsights, setAudienceInsights] = useState<AudienceInsights | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const defaultPostData: Omit<BusinessSuitePost, 'id' | 'created_time' | 'status'> & { scheduledFor?: Date } = {
    message: '',
    link: '',
    targeting: {
      age_min: undefined,
      age_max: undefined,
      genders: [],
      geo_locations: {
        countries: [],
        cities: [],
      },
    },
    feed_targeting: {
      fan_only: false,
      countries: [],
      education_statuses: [],
      relationship_statuses: [],
    },
    privacy: {
      value: 'EVERYONE',
    },
    scheduledFor: undefined,
  };

  const [postData, setPostData] = useState(defaultPostData);
  const [previewData, setPreviewData] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const getAnalytics = () => {
    return posts.map(post => ({
      date: format(new Date(post.created_time), 'MM/dd'),
      engagement: post.engagement?.likes || 0,
    }));
  };

  useEffect(() => {
    const loadData = async () => {
      if (pageId) {
        setLoading(true);
        try {
          await Promise.all([loadPosts(), loadAudienceInsights()]);
        } catch (error) {
          console.error('Error loading data:', error);
        } finally {
          setLoading(false);
        }
      }
    };
    
    loadData();
  }, [pageId]);

  const loadPosts = async () => {
    try {
      const fetchedPosts = await facebookService.getPosts(pageId);
      setPosts(fetchedPosts.map(post => ({
        ...post,
        scheduledFor: post.scheduled_publish_time ? new Date(post.scheduled_publish_time * 1000) : undefined
      })));
    } catch (error) {
      console.error('Error loading posts:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to load posts",
      });
    }
  };

  const loadAudienceInsights = async () => {
    try {
      const insights = await facebookService.getAudienceInsights(pageId);
      setAudienceInsights(insights);
    } catch (error) {
      console.error('Error loading audience insights:', error);
    }
  };

  const handleSavePost = async () => {
    if (!postData.message.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a message for your post",
      });
      return;
    }

    setIsLoading(true);
    try {
      const postPayload = {
        message: postData.message,
        link: postData.link,
        scheduled_publish_time: postData.scheduledFor 
          ? Math.floor(postData.scheduledFor.getTime() / 1000)
          : undefined,
        targeting: postData.targeting,
        feed_targeting: postData.feed_targeting,
        privacy: postData.privacy,
      };

      if (isEditing && selectedPost) {
        await facebookService.updatePost(pageId, selectedPost.id, postPayload);
      } else {
        await facebookService.createPost(pageId, postPayload);
      }

      await loadPosts();
      setPostData(defaultPostData);
      setIsEditing(false);
      setSelectedPost(null);
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error saving post:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to save post. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditPost = (post: Post) => {
    setSelectedPost(post);
    setPostData({
      message: post.message,
      link: post.link,
      targeting: {
        age_min: post.targeting?.age_min,
        age_max: post.targeting?.age_max,
        genders: post.targeting?.genders || [],
        geo_locations: {
          countries: post.targeting?.geo_locations?.countries || [],
          cities: post.targeting?.geo_locations?.cities || [],
        },
      },
      feed_targeting: {
        fan_only: post.feed_targeting?.fan_only,
        countries: post.feed_targeting?.countries || [],
        education_statuses: post.feed_targeting?.education_statuses || [],
        relationship_statuses: post.feed_targeting?.relationship_statuses || [],
      },
      privacy: {
        value: post.privacy?.value || 'EVERYONE',
      },
      scheduledFor: post.scheduledFor,
    });
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await facebookService.deletePost(pageId, postId);
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
      loadPosts();
    } catch (error) {
      console.error('Error deleting post:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to delete post",
      });
    }
  };

  const handlePreview = async () => {
    if (!postData.message.trim()) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a message for your post",
      });
      return;
    }

    setIsLoading(true);
    try {
      const preview = await facebookService.previewPost(pageId, {
        message: postData.message,
        link: postData.link,
        targeting: postData.targeting,
        feed_targeting: postData.feed_targeting,
      });
      setPreviewData(preview);
      setShowPreview(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to preview post",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Posts</h2>
          <p className="text-muted-foreground">
            Manage posts for {pageName || `Page ID: ${pageId}`}
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Create New Post</Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{isEditing ? 'Edit Post' : 'Create New Post'}</DialogTitle>
              <DialogDescription>
                {isEditing ? 'Edit your Facebook post' : 'Create a new post for your Facebook page'}
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="content">
              <TabsList>
                <TabsTrigger value="content">Content</TabsTrigger>
                <TabsTrigger value="targeting">Targeting</TabsTrigger>
                <TabsTrigger value="preview">Preview</TabsTrigger>
              </TabsList>

              <TabsContent value="content" className="space-y-4">
                <div className="space-y-2">
                  <Label>Content</Label>
                  <Textarea
                    placeholder="What's on your mind?"
                    value={postData.message}
                    onChange={(e) => setPostData({ ...postData, message: e.target.value })}
                    className="min-h-[100px]"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label>Link URL (Optional)</Label>
                  <Input
                    type="url"
                    placeholder="Enter link URL"
                    value={postData.link}
                    onChange={(e) => setPostData({ ...postData, link: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Privacy</Label>
                  <Select
                    value={postData.privacy.value}
                    onValueChange={(value: typeof postData.privacy.value) => 
                      setPostData({ 
                        ...postData, 
                        privacy: { ...postData.privacy, value } 
                      })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select privacy" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EVERYONE">Everyone</SelectItem>
                      <SelectItem value="ALL_FRIENDS">All Friends</SelectItem>
                      <SelectItem value="FRIENDS_OF_FRIENDS">Friends of Friends</SelectItem>
                      <SelectItem value="SELF">Only Me</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label>Schedule Post (Optional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !postData.scheduledFor && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {postData.scheduledFor ? format(postData.scheduledFor, "PPP") : "Pick a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={postData.scheduledFor}
                        onSelect={(date) => setPostData({ ...postData, scheduledFor: date || undefined })}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </TabsContent>

              <TabsContent value="targeting" className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Minimum Age</Label>
                      <Input
                        type="number"
                        min="13"
                        max="65"
                        placeholder="e.g., 18"
                        value={postData.targeting.age_min || ''}
                        onChange={(e) => setPostData({
                          ...postData,
                          targeting: {
                            ...postData.targeting,
                            age_min: e.target.value ? parseInt(e.target.value) : undefined
                          }
                        })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Maximum Age</Label>
                      <Input
                        type="number"
                        min="13"
                        max="65"
                        placeholder="e.g., 65"
                        value={postData.targeting.age_max || ''}
                        onChange={(e) => setPostData({
                          ...postData,
                          targeting: {
                            ...postData.targeting,
                            age_max: e.target.value ? parseInt(e.target.value) : undefined
                          }
                        })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Gender</Label>
                    <Select
                      value={postData.targeting.genders[0] || ''}
                      onValueChange={(value: 'male' | 'female' | '') => 
                        setPostData({
                          ...postData,
                          targeting: {
                            ...postData.targeting,
                            genders: value ? [value] : []
                          }
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">All</SelectItem>
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Countries</Label>
                    <Input
                      placeholder="Enter countries (comma-separated)"
                      value={postData.targeting.geo_locations.countries.join(', ')}
                      onChange={(e) => setPostData({
                        ...postData,
                        targeting: {
                          ...postData.targeting,
                          geo_locations: {
                            ...postData.targeting.geo_locations,
                            countries: e.target.value.split(',').map(s => s.trim()).filter(Boolean)
                          }
                        }
                      })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Fan Only</Label>
                    <Select
                      value={postData.feed_targeting.fan_only ? 'true' : 'false'}
                      onValueChange={(value) => 
                        setPostData({
                          ...postData,
                          feed_targeting: {
                            ...postData.feed_targeting,
                            fan_only: value === 'true'
                          }
                        })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select fan targeting" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="false">All Users</SelectItem>
                        <SelectItem value="true">Fans Only</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="preview" className="space-y-4">
                {showPreview ? (
                  <div className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Post Preview</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <p className="whitespace-pre-wrap">{postData.message}</p>
                          {postData.link && (
                            <a 
                              href={postData.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-500 hover:underline"
                            >
                              {postData.link}
                            </a>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                    <Button onClick={() => setShowPreview(false)} variant="outline">
                      Hide Preview
                    </Button>
                  </div>
                ) : (
                  <Button onClick={handlePreview} disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Preview...
                      </>
                    ) : (
                      'Generate Preview'
                    )}
                  </Button>
                )}
              </TabsContent>
            </Tabs>
            
            <DialogFooter>
              <Button onClick={handleSavePost} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  isEditing ? 'Update Post' : 'Create Post'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="posts">
        <TabsList>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="audience">Audience Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg">{post.message}</CardTitle>
                    <CardDescription>
                      {post.status === 'SCHEDULED' 
                        ? `Scheduled for ${format(post.scheduledFor!, "PPP")}`
                        : format(new Date(post.created_time), "PPP")}
                    </CardDescription>
                  </div>
                  <div className="flex gap-2">
                    {post.link && <Link2 className="h-5 w-5 text-muted-foreground" />}
                    <Globe2 className="h-5 w-5 text-muted-foreground" aria-label={`Privacy: ${post.privacy?.value}`} />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {post.targeting && (
                    <div className="text-sm text-muted-foreground">
                      <p>Targeting: {post.targeting.genders?.join(', ')} | Ages {post.targeting.age_min}-{post.targeting.age_max}</p>
                      <p>Locations: {post.targeting.geo_locations?.countries?.join(', ')}</p>
                    </div>
                  )}
                  {post.engagement && (
                    <div className="grid grid-cols-4 gap-4">
                      <div className="text-center">
                        <p className="text-2xl font-bold">{post.engagement.impressions}</p>
                        <p className="text-sm text-muted-foreground">Impressions</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">{post.engagement.reach}</p>
                        <p className="text-sm text-muted-foreground">Reach</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">{post.engagement.clicks}</p>
                        <p className="text-sm text-muted-foreground">Clicks</p>
                      </div>
                      <div className="text-center">
                        <p className="text-2xl font-bold">
                          {(post.engagement.likes + post.engagement.comments + post.engagement.shares) / post.engagement.impressions * 100}%
                        </p>
                        <p className="text-sm text-muted-foreground">Engagement Rate</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="flex gap-4 text-sm text-muted-foreground">
                  <span>Likes: {post.engagement?.likes || 0}</span>
                  <span>Comments: {post.engagement?.comments || 0}</span>
                  <span>Shares: {post.engagement?.shares || 0}</span>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditPost(post)}
                  >
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" size="sm">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently delete your post.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeletePost(post.id)}
                          className="bg-destructive text-destructive-foreground"
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardFooter>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Post Performance</CardTitle>
              <CardDescription>
                Engagement metrics for your posts over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={getAnalytics()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="engagement" stroke="#8884d8" name="Engagement" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience">
          <Card>
            <CardHeader>
              <CardTitle>Audience Demographics</CardTitle>
              <CardDescription>
                Understand your audience better
              </CardDescription>
            </CardHeader>
            <CardContent>
              {audienceInsights && (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Age and Gender Distribution</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium mb-2">Age Groups</h4>
                        <div className="space-y-2">
                          {Object.entries(audienceInsights.demographics.age_gender).map(([age, percentage]) => (
                            <div key={age} className="flex items-center justify-between">
                              <span className="text-sm">{age}</span>
                              <div className="w-2/3 bg-secondary rounded-full h-2">
                                <div
                                  className="bg-primary rounded-full h-2"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm">{percentage}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-2">Gender</h4>
                        <div className="space-y-2">
                          {Object.entries(audienceInsights.demographics.countries).map(([gender, percentage]) => (
                            <div key={gender} className="flex items-center justify-between">
                              <span className="text-sm capitalize">{gender}</span>
                              <div className="w-2/3 bg-secondary rounded-full h-2">
                                <div
                                  className="bg-primary rounded-full h-2"
                                  style={{ width: `${percentage}%` }}
                                />
                              </div>
                              <span className="text-sm">{percentage}%</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Top Countries</h3>
                    <div className="grid grid-cols-2 gap-4">
                      {Object.entries(audienceInsights.demographics.countries)
                        .sort(([, a], [, b]) => (b as number) - (a as number))
                        .slice(0, 10)
                        .map(([country, percentage]) => (
                          <div key={country} className="flex items-center justify-between">
                            <span className="text-sm">{country}</span>
                            <div className="w-2/3 bg-secondary rounded-full h-2">
                              <div
                                className="bg-primary rounded-full h-2"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm">{percentage}%</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
