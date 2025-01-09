import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays } from "date-fns";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const data = [
  { name: "Jan", views: 4000, likes: 2400, shares: 2400 },
  { name: "Feb", views: 3000, likes: 1398, shares: 2210 },
  { name: "Mar", views: 2000, likes: 9800, shares: 2290 },
  { name: "Apr", views: 2780, likes: 3908, shares: 2000 },
  { name: "May", views: 1890, likes: 4800, shares: 2181 },
  { name: "Jun", views: 2390, likes: 3800, shares: 2500 },
];

type Platform = "all" | "facebook" | "google" | "telegram" | "tiktok" | "youtube";

interface MetricsBase {
  views: number;
}

interface FacebookMetrics extends MetricsBase {
  engagement: number;
  shares: number;
  activeCampaigns: number;
  likes: number;
  comments: number;
  groupPosts: number;
  reachGrowth: number;
}

interface GoogleMetrics extends MetricsBase {
  clicks: number;
  calls: number;
  directions: number;
  websiteVisits: number;
  reviews: number;
  photos: number;
  rankingGrowth: number;
}

interface TelegramMetrics extends MetricsBase {
  forwards: number;
  replies: number;
  groupMembers: number;
  messageReach: number;
  linkClicks: number;
  engagement: number;
  growthRate: number;
}

interface TikTokMetrics extends MetricsBase {
  likes: number;
  comments: number;
  shares: number;
  followers: number;
  watchTime: string;
  engagement: number;
  trending: number;
}

interface YouTubeMetrics extends MetricsBase {
  subscribers: number;
  watchTime: string;
  comments: number;
  likes: number;
  shares: number;
  engagement: number;
  retention: number;
}

interface AggregateMetrics extends MetricsBase {
  engagement: number;
  shares: number;
  activeCampaigns: number;
}

type PlatformMetrics = {
  facebook: FacebookMetrics;
  google: GoogleMetrics;
  telegram: TelegramMetrics;
  tiktok: TikTokMetrics;
  youtube: YouTubeMetrics;
};

type DateRange = {
  from: Date;
  to: Date;
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export function CampaignAnalytics() {
  const [platform, setPlatform] = useState<Platform>("all");
  const [campaign, setCampaign] = useState<string>("all");
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(),
    to: addDays(new Date(), 7),
  });

  const platformMetrics: PlatformMetrics = {
    facebook: {
      views: 45231,
      engagement: 5.2,
      shares: 1234,
      activeCampaigns: 12,
      likes: 2400,
      comments: 890,
      groupPosts: 156,
      reachGrowth: 20.1,
    },
    google: {
      views: 32456,
      clicks: 890,
      calls: 234,
      directions: 567,
      websiteVisits: 1234,
      reviews: 45,
      photos: 89,
      rankingGrowth: 15.3,
    },
    telegram: {
      views: 23456,
      forwards: 678,
      replies: 345,
      groupMembers: 12345,
      messageReach: 34567,
      linkClicks: 890,
      engagement: 4.5,
      growthRate: 25.6,
    },
    tiktok: {
      views: 78901,
      likes: 12345,
      comments: 3456,
      shares: 2345,
      followers: 5678,
      watchTime: "45K",
      engagement: 6.7,
      trending: 3,
    },
    youtube: {
      views: 56789,
      subscribers: 2345,
      watchTime: "89K",
      comments: 1234,
      likes: 4567,
      shares: 890,
      engagement: 5.6,
      retention: 65.4,
    },
  };

  const getMetricsByPlatform = (platform: Platform): FacebookMetrics | GoogleMetrics | TelegramMetrics | TikTokMetrics | YouTubeMetrics | AggregateMetrics => {
    if (platform === "all") {
      return {
        views: Object.values(platformMetrics).reduce((sum, metrics) => sum + metrics.views, 0),
        engagement: Object.values(platformMetrics).reduce((sum, metrics) => "engagement" in metrics ? sum + metrics.engagement : sum, 0) / 5,
        shares: Object.values(platformMetrics).reduce((sum, metrics) => "shares" in metrics ? sum + metrics.shares : sum, 0),
        activeCampaigns: Object.values(platformMetrics).length,
      };
    }
    return platformMetrics[platform];
  };

  const currentMetrics = getMetricsByPlatform(platform);

  const getMetricValue = (metricName: keyof (FacebookMetrics | GoogleMetrics | TelegramMetrics | TikTokMetrics | YouTubeMetrics | AggregateMetrics)) => {
    if (metricName in currentMetrics) {
      return currentMetrics[metricName as keyof typeof currentMetrics];
    }
    return 0;
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-col md:flex-row gap-4">
          <Select value={platform} onValueChange={(value: Platform) => setPlatform(value)}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Platform" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Platforms</SelectItem>
              <SelectItem value="facebook">Facebook</SelectItem>
              <SelectItem value="google">Google</SelectItem>
              <SelectItem value="telegram">Telegram</SelectItem>
              <SelectItem value="tiktok">TikTok</SelectItem>
              <SelectItem value="youtube">YouTube</SelectItem>
            </SelectContent>
          </Select>

          <Select value={campaign} onValueChange={setCampaign}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select Campaign" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Campaigns</SelectItem>
              <SelectItem value="campaign1">Campaign 1</SelectItem>
              <SelectItem value="campaign2">Campaign 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <DatePickerWithRange
          date={dateRange}
          setDate={(date: DateRange | undefined) => {
            if (date) {
              setDateRange(date);
            }
          }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{currentMetrics.views.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +{platform === "all" ? "18.2" : getMetricValue("reachGrowth")}% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Engagement Rate</CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{getMetricValue("engagement")}%</div>
            <p className="text-xs text-muted-foreground">
              +1.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {platform === "google" ? "Website Clicks" : 
               platform === "telegram" ? "Message Forwards" :
               platform === "tiktok" ? "Video Shares" :
               platform === "youtube" ? "Video Shares" :
               "Total Shares"}
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {platform === "google" ? getMetricValue("clicks") :
               platform === "telegram" ? getMetricValue("forwards") :
               platform === "tiktok" ? getMetricValue("shares") :
               platform === "youtube" ? getMetricValue("shares") :
               getMetricValue("shares")}
            </div>
            <p className="text-xs text-muted-foreground">
              +15.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {platform === "google" ? "Business Reviews" :
               platform === "telegram" ? "Group Members" :
               platform === "tiktok" ? "Followers" :
               platform === "youtube" ? "Subscribers" :
               "Active Campaigns"}
            </CardTitle>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {platform === "google" ? getMetricValue("reviews") :
               platform === "telegram" ? getMetricValue("groupMembers") :
               platform === "tiktok" ? getMetricValue("followers") :
               platform === "youtube" ? getMetricValue("subscribers") :
               getMetricValue("activeCampaigns")}
            </div>
            <p className="text-xs text-muted-foreground">
              +{
                platform === "google" ? "8.4" :
                platform === "telegram" ? "12.7" :
                platform === "tiktok" ? "25.3" :
                platform === "youtube" ? "15.8" :
                "2"}% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>
                View your campaign performance across all platforms
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <LineChart
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="views"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  <Line type="monotone" dataKey="likes" stroke="#82ca9d" />
                  <Line type="monotone" dataKey="shares" stroke="#ffc658" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Performance</CardTitle>
              <CardDescription>
                Compare performance across different platforms
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={350}>
                <BarChart
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="views" fill="#8884d8" />
                  <Bar dataKey="likes" fill="#82ca9d" />
                  <Bar dataKey="shares" fill="#ffc658" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Engagement Distribution</CardTitle>
              <CardDescription>
                View engagement metrics across different types of interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <PieChart>
                  <Pie
                    data={[
                      { name: "Likes", value: 400 },
                      { name: "Comments", value: 300 },
                      { name: "Shares", value: 300 },
                      { name: "Saves", value: 200 },
                    ]}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {data.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="demographics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Audience Demographics</CardTitle>
              <CardDescription>
                Understand your audience better
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Age Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart
                        data={[
                          { age: "13-17", value: 400 },
                          { age: "18-24", value: 300 },
                          { age: "25-34", value: 300 },
                          { age: "35-44", value: 200 },
                          { age: "45+", value: 100 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="age" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Gender Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <PieChart>
                        <Pie
                          data={[
                            { name: "Male", value: 400 },
                            { name: "Female", value: 300 },
                            { name: "Other", value: 100 },
                          ]}
                          cx="50%"
                          cy="50%"
                          outerRadius={60}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {data.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={COLORS[index % COLORS.length]}
                            />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm font-medium">Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart
                        data={[
                          { city: "Yangon", value: 400 },
                          { city: "Mandalay", value: 300 },
                          { city: "Naypyidaw", value: 200 },
                          { city: "Other", value: 100 },
                        ]}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="city" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="value" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
