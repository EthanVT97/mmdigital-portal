import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { 
  Facebook, 
  MessageCircle, 
  Search, 
  Video, 
  Youtube, 
  BarChart3, 
  Settings2, 
  PlusCircle,
  Bell,
  User,
  LogOut,
  Menu,
  Loader2,
  Globe,
  Music,
  TrendingUp,
  DollarSign,
  Users,
  Calendar as CalendarIcon,
  Activity,
  AlertCircle
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";
import useCampaignStore from "@/stores/useCampaignStore";
import useNotificationStore from "@/stores/useNotificationStore";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Campaign } from "@/stores/useCampaignStore";
import { PlatformConnections } from "@/components/social/PlatformConnections";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import { motion } from "framer-motion";
import {
  Select as SelectComponent,
  SelectContent as SelectContentComponent,
  SelectGroup,
  SelectItem as SelectItemComponent,
  SelectLabel,
  SelectTrigger as SelectTriggerComponent,
  SelectValue as SelectValueComponent,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";

interface NewCampaign {
  name: string;
  platform: Campaign['platform'];
  description: string;
  budget: string;
  start_date: string;
  end_date: string;
}

export function Dashboard() {
  const navigate = useNavigate();
  const supabaseClient = useSupabaseClient();
  const { toast } = useToast();
  const { campaigns, createCampaign, fetchCampaigns } = useCampaignStore();
  const { fetchUnreadCount, unreadCount, markAllAsRead } = useNotificationStore();
  
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [newCampaign, setNewCampaign] = useState<NewCampaign>({
    name: "",
    platform: "facebook",
    description: "",
    budget: "",
    start_date: "",
    end_date: "",
  });

  const [dateRange, setDateRange] = useState<{ from: Date | undefined; to: Date | undefined }>({
    from: undefined,
    to: undefined,
  });
  const [platformFilter, setPlatformFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchCampaigns();
    fetchUnreadCount();
  }, [fetchCampaigns, fetchUnreadCount]);

  const getUserProfile = useCallback(async () => {
    try {
      const { data: { user } } = await supabaseClient.auth.getUser();
      if (user) {
        setUserName(user.user_metadata?.full_name || user.email?.split('@')[0] || 'User');
        setUserEmail(user.email || '');
        setUserAvatar(user.user_metadata?.avatar_url || '');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }, [supabaseClient.auth]);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabaseClient.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out successfully",
        description: "You have been logged out of your account.",
      });
      
      navigate('/login');
    } catch (error) {
      console.error('Error logging out:', error);
      toast({
        variant: "destructive",
        title: "Error logging out",
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  };

  const handleCreateCampaign = async () => {
    try {
      const campaignData = {
        name: newCampaign.name,
        platform: newCampaign.platform as Campaign['platform'],
        description: newCampaign.description,
        budget: parseFloat(newCampaign.budget),
        start_date: newCampaign.start_date,
        end_date: newCampaign.end_date,
        status: 'draft' as const
      };
      
      await createCampaign(campaignData);
      
      toast({
        title: "Campaign created successfully",
        description: "Your new campaign has been created.",
      });
      
      setIsCreateDialogOpen(false);
      setNewCampaign({
        name: "",
        platform: "facebook" as Campaign['platform'],
        description: "",
        budget: "",
        start_date: "",
        end_date: "",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error creating campaign",
        description: error instanceof Error ? error.message : "An unknown error occurred",
      });
    }
  };

  const stats = [
    { 
      label: "Active Campaigns",
      value: campaigns.filter(c => c.status === 'active').length.toString(),
      icon: Activity,
      description: "Currently running campaigns",
      color: "text-green-500"
    },
    { 
      label: "Total Budget",
      value: `$${campaigns.reduce((sum, c) => sum + c.budget, 0).toFixed(2)}`,
      icon: DollarSign,
      description: "Total campaign spending",
      color: "text-blue-500"
    },
    { 
      label: "Campaign Reach",
      value: "125K+",
      icon: Users,
      description: "Total audience reached",
      color: "text-purple-500"
    },
    { 
      label: "Performance",
      value: "89%",
      icon: TrendingUp,
      description: "Average campaign performance",
      color: "text-cyan-500"
    },
  ];

  const recentActivity = [
    { type: "campaign", message: "New campaign 'Summer Sale' created", time: "2 hours ago" },
    { type: "performance", message: "Campaign 'Black Friday' reached 50k users", time: "5 hours ago" },
    { type: "alert", message: "Budget limit reached for 'Holiday Special'", time: "1 day ago" },
    { type: "update", message: "Platform API updated for better tracking", time: "2 days ago" },
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "campaign": return PlusCircle;
      case "performance": return TrendingUp;
      case "alert": return AlertCircle;
      case "update": return Settings2;
      default: return Activity;
    }
  };

  const analyticsData = [
    { date: '2024-01-01', impressions: 4000, clicks: 2400, conversions: 400 },
    { date: '2024-01-02', impressions: 3000, clicks: 1398, conversions: 210 },
    { date: '2024-01-03', impressions: 2000, clicks: 9800, conversions: 290 },
    { date: '2024-01-04', impressions: 2780, clicks: 3908, conversions: 500 },
    { date: '2024-01-05', impressions: 1890, clicks: 4800, conversions: 380 },
    { date: '2024-01-06', impressions: 2390, clicks: 3800, conversions: 420 },
    { date: '2024-01-07', impressions: 3490, clicks: 4300, conversions: 460 },
  ];

  const platformData = [
    { name: 'Facebook', value: 35 },
    { name: 'YouTube', value: 25 },
    { name: 'TikTok', value: 20 },
    { name: 'Telegram', value: 15 },
    { name: 'Google', value: 5 },
  ];

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         campaign.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPlatform = platformFilter === "all" || campaign.platform === platformFilter;
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    const matchesDateRange = !dateRange.from || !dateRange.to || 
                            (new Date(campaign.start_date) >= dateRange.from && 
                             new Date(campaign.end_date) <= dateRange.to);
    
    return matchesSearch && matchesPlatform && matchesStatus && matchesDateRange;
  });

  const platformCards = [
    {
      name: "Facebook",
      icon: Facebook,
      path: "/facebook-marketing",
      description: "Manage Facebook page marketing campaigns",
      color: "bg-blue-500",
      connected: false
    },
    {
      name: "TikTok",
      icon: Music,
      path: "/tiktok-marketing",
      description: "Manage TikTok marketing campaigns",
      color: "bg-pink-500",
      connected: false
    },
    {
      name: "Google",
      icon: Globe,
      path: "/google-marketing",
      description: "Manage Google Ads campaigns",
      color: "bg-red-500",
      connected: false
    },
    {
      name: "Telegram",
      icon: MessageCircle,
      path: "/telegram-marketing",
      description: "Manage Telegram marketing campaigns",
      color: "bg-sky-500",
      connected: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-700 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5 text-gray-300" />
            </Button>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              MMDIGITAL
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="relative"
              onClick={markAllAsRead}
            >
              <Bell className="h-5 w-5 text-gray-300" />
              {unreadCount > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                >
                  {unreadCount}
                </Badge>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-gray-500">{userEmail}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleProfile}>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-6">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Welcome back, {userName}!</h1>
            <p className="text-gray-400 mt-1">Here's what's happening with your campaigns today.</p>
          </div>
          <Button
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            New Campaign
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <Card key={index} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-gray-400">
                    {stat.label}
                  </CardTitle>
                  <Icon className={cn("h-4 w-4", stat.color)} />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Filter Section */}
        <div className="mb-8 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Search Campaigns</Label>
              <Input
                placeholder="Search by name or description..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-gray-700/50 border-gray-600"
              />
            </div>
            <div>
              <Label>Platform</Label>
              <SelectComponent value={platformFilter} onValueChange={setPlatformFilter}>
                <SelectTriggerComponent className="bg-gray-700/50 border-gray-600">
                  <SelectValueComponent placeholder="Select platform" />
                </SelectTriggerComponent>
                <SelectContentComponent>
                  <SelectItemComponent value="all">All Platforms</SelectItemComponent>
                  <SelectItemComponent value="facebook">Facebook</SelectItemComponent>
                  <SelectItemComponent value="youtube">YouTube</SelectItemComponent>
                  <SelectItemComponent value="tiktok">TikTok</SelectItemComponent>
                  <SelectItemComponent value="telegram">Telegram</SelectItemComponent>
                  <SelectItemComponent value="google">Google</SelectItemComponent>
                </SelectContentComponent>
              </SelectComponent>
            </div>
            <div>
              <Label>Status</Label>
              <SelectComponent value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTriggerComponent className="bg-gray-700/50 border-gray-600">
                  <SelectValueComponent placeholder="Select status" />
                </SelectTriggerComponent>
                <SelectContentComponent>
                  <SelectItemComponent value="all">All Status</SelectItemComponent>
                  <SelectItemComponent value="active">Active</SelectItemComponent>
                  <SelectItemComponent value="paused">Paused</SelectItemComponent>
                  <SelectItemComponent value="completed">Completed</SelectItemComponent>
                  <SelectItemComponent value="draft">Draft</SelectItemComponent>
                </SelectContentComponent>
              </SelectComponent>
            </div>
            <div>
              <Label>Date Range</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal bg-gray-700/50 border-gray-600"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date range</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    selected={{ from: dateRange.from, to: dateRange.to }}
                    onSelect={(range) => setDateRange({ from: range?.from, to: range?.to })}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="bg-gray-800/50 border-gray-700">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {platformCards.map((platform) => {
                const Icon = platform.icon;
                return (
                  <Card 
                    key={platform.name}
                    className="cursor-pointer hover:shadow-lg transition-all duration-200"
                    onClick={async () => {
                      try {
                        setIsLoading(true);
                        await navigate(platform.path);
                      } finally {
                        setIsLoading(false);
                      }
                    }}
                  >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">
                        {platform.name}
                      </CardTitle>
                      {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Icon className={`h-4 w-4 text-white ${platform.color} rounded-full p-1 box-content`} />
                      )}
                    </CardHeader>
                    <CardContent>
                      <div className="text-xs text-muted-foreground">
                        {platform.description}
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${platform.connected ? 'bg-green-500' : 'bg-gray-500'}`} />
                        <span className="text-xs text-muted-foreground">
                          {platform.connected ? 'Connected' : 'Not Connected'}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Campaign Performance */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>Campaign Performance</CardTitle>
                <CardDescription>Your campaign metrics for the last 30 days</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {campaigns.slice(0, 3).map((campaign, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-white">{campaign.name}</p>
                          <p className="text-xs text-gray-500">{campaign.platform}</p>
                        </div>
                        <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                          {campaign.status}
                        </Badge>
                      </div>
                      <Progress value={Math.random() * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates from your campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[300px] pr-4">
                  <div className="space-y-4">
                    {recentActivity.map((activity, index) => {
                      const Icon = getActivityIcon(activity.type);
                      return (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="rounded-full p-2 bg-gray-700/50">
                            <Icon className="h-4 w-4 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-white">{activity.message}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="campaigns">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredCampaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg group-hover:text-cyan-400 transition-colors">
                          {campaign.name}
                        </CardTitle>
                        <Badge variant={campaign.status === 'active' ? 'default' : 'secondary'}>
                          {campaign.status}
                        </Badge>
                      </div>
                      <CardDescription>{campaign.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Platform</span>
                          <span className="text-white">{campaign.platform}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Budget</span>
                          <span className="text-white">${campaign.budget}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Duration</span>
                          <span className="text-white">
                            {new Date(campaign.start_date).toLocaleDateString()} -{" "}
                            {new Date(campaign.end_date).toLocaleDateString()}
                          </span>
                        </div>
                        <Progress 
                          value={Math.random() * 100} 
                          className="h-1 mt-4"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid gap-6">
              {/* Performance Metrics */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle>Campaign Performance</CardTitle>
                  <CardDescription>Performance metrics over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[400px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={analyticsData}>
                        <defs>
                          <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                          </linearGradient>
                          <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey="date" 
                          stroke="#6b7280"
                          tick={{ fill: '#9ca3af' }}
                        />
                        <YAxis 
                          stroke="#6b7280"
                          tick={{ fill: '#9ca3af' }}
                        />
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: '#1f2937',
                            border: '1px solid #374151',
                            borderRadius: '0.375rem'
                          }}
                          labelStyle={{ color: '#9ca3af' }}
                        />
                        <Area
                          type="monotone"
                          dataKey="impressions"
                          stroke="#0ea5e9"
                          fillOpacity={1}
                          fill="url(#colorImpressions)"
                        />
                        <Area
                          type="monotone"
                          dataKey="clicks"
                          stroke="#22c55e"
                          fillOpacity={1}
                          fill="url(#colorClicks)"
                        />
                        <Area
                          type="monotone"
                          dataKey="conversions"
                          stroke="#8b5cf6"
                          fillOpacity={1}
                          fill="url(#colorConversions)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Platform Distribution */}
              <Card className="bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <CardTitle>Platform Distribution</CardTitle>
                  <CardDescription>Campaign distribution across platforms</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={platformData}>
                        <XAxis 
                          dataKey="name" 
                          stroke="#6b7280"
                          tick={{ fill: '#9ca3af' }}
                        />
                        <YAxis 
                          stroke="#6b7280"
                          tick={{ fill: '#9ca3af' }}
                        />
                        <Tooltip
                          contentStyle={{ 
                            backgroundColor: '#1f2937',
                            border: '1px solid #374151',
                            borderRadius: '0.375rem'
                          }}
                          labelStyle={{ color: '#9ca3af' }}
                        />
                        <Bar 
                          dataKey="value" 
                          fill="#0ea5e9"
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="bg-gray-800/50 border-gray-700">
              <CardHeader>
                <CardTitle>Activity Timeline</CardTitle>
                <CardDescription>All activities across your campaigns</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[500px] pr-4">
                  <div className="space-y-6">
                    {[...recentActivity, ...recentActivity].map((activity, index) => {
                      const Icon = getActivityIcon(activity.type);
                      return (
                        <div key={index} className="flex items-start space-x-4">
                          <div className="rounded-full p-2 bg-gray-700/50">
                            <Icon className="h-4 w-4 text-gray-400" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm text-white">{activity.message}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

export default Dashboard;