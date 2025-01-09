import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, MessageCircle, Users, Calendar, BarChart2, Target, ThumbsUp, Share2, Bell } from "lucide-react";
import { useState } from "react";
import { FacebookAudienceAnalyzer } from "./FacebookAudienceAnalyzer";
import { FacebookNotifications } from "./FacebookNotifications";

interface AnalyticsData {
  followers: number;
  reach: number;
  engagement: number;
  shares: number;
}

export function FacebookDashboard() {
  const [selectedTab, setSelectedTab] = useState("overview");
  const [analyticsData] = useState<AnalyticsData>({
    followers: 1234,
    reach: 5678,
    engagement: 910,
    shares: 112
  });

  const fetchAnalytics = async () => {
    try {
      const response = await fetch('/api/facebook/analytics/page');
      const data = await response.json();
      // setAnalyticsData(data);
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Page Followers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.followers.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reach</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.reach.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.engagement.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Shares</CardTitle>
            <Share2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.shares.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="schedule">Schedule</TabsTrigger>
          <TabsTrigger value="messages">Messages</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="audience">Audience</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4">
              <Button className="w-full" onClick={() => document.getElementById('imageUpload')?.click()}>
                <Image className="mr-2 h-4 w-4" />
                Create Post
              </Button>
              <input
                type="file"
                id="imageUpload"
                className="hidden"
                accept="image/*,video/*"
                onChange={(e) => {
                  // Handle file upload
                }}
              />
              <Button variant="outline" className="w-full">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Post
              </Button>
              <Button variant="outline" className="w-full">
                <MessageCircle className="mr-2 h-4 w-4" />
                View Messages
              </Button>
              <Button variant="outline" className="w-full">
                <BarChart2 className="mr-2 h-4 w-4" />
                View Insights
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Page Performance</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add performance chart here */}
              <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                Performance Chart Coming Soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="posts">
          <Card>
            <CardHeader>
              <CardTitle>Posts Manager</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Add posts grid here */}
                <div className="h-[200px] flex items-center justify-center text-muted-foreground border rounded-lg">
                  Posts Grid Coming Soon
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedule">
          <Card>
            <CardHeader>
              <CardTitle>Content Calendar</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add calendar here */}
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Content Calendar Coming Soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="messages">
          <Card>
            <CardHeader>
              <CardTitle>Message Center</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add message center here */}
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Message Center Coming Soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Detailed Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add detailed analytics here */}
              <div className="h-[400px] flex items-center justify-center text-muted-foreground">
                Detailed Analytics Coming Soon
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="audience">
          <div className="grid gap-6">
            <FacebookAudienceAnalyzer />
            <FacebookNotifications />
          </div>
        </TabsContent>
      </Tabs>

      {/* Floating Notification Badge */}
      <div className="fixed bottom-4 right-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setSelectedTab('audience')}
          className="rounded-full h-12 w-12 bg-background shadow-lg hover:shadow-xl transition-shadow"
        >
          <Bell className="h-6 w-6" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center text-xs">
            3
          </span>
        </Button>
      </div>
    </div>
  );
}
