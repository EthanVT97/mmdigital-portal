import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Facebook, MessageCircle, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Dashboard = () => {
  const { toast } = useToast();

  const { data: campaigns, isLoading } = useQuery({
    queryKey: ['campaigns'],
    queryFn: async () => {
      console.log('Fetching campaigns...');
      const { data, error } = await supabase
        .from('campaigns')
        .select(`
          *,
          campaign_metrics (
            impressions,
            clicks,
            conversions,
            spend
          )
        `);

      if (error) {
        console.error('Error fetching campaigns:', error);
        throw error;
      }

      console.log('Campaigns fetched:', data);
      return data;
    },
  });

  const handleCreateCampaign = (platform: string) => {
    toast({
      title: "Coming Soon",
      description: `${platform} campaign creation will be available soon!`,
    });
  };

  if (isLoading) {
    return <div className="container mx-auto px-4 py-8">Loading campaigns...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Ad Campaigns Dashboard</h1>
      
      <Tabs defaultValue="facebook" className="space-y-4">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="facebook">Facebook</TabsTrigger>
          <TabsTrigger value="telegram">Telegram</TabsTrigger>
          <TabsTrigger value="google">Google</TabsTrigger>
        </TabsList>

        <TabsContent value="facebook">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Facebook className="text-platform-facebook" />
                Facebook Campaigns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns?.filter(c => c.platform === 'facebook').map((campaign) => (
                  <Card key={campaign.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{campaign.name}</h3>
                          <p className="text-sm text-muted-foreground">Status: {campaign.status}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">Budget: ${campaign.budget}</p>
                          {campaign.campaign_metrics?.[0] && (
                            <p className="text-sm text-muted-foreground">
                              Clicks: {campaign.campaign_metrics[0].clicks || 0}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button 
                  onClick={() => handleCreateCampaign("Facebook")}
                  className="bg-platform-facebook hover:bg-platform-facebook/90"
                >
                  Create Facebook Campaign
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="telegram">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="text-platform-telegram" />
                Telegram Campaigns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns?.filter(c => c.platform === 'telegram').map((campaign) => (
                  <Card key={campaign.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{campaign.name}</h3>
                          <p className="text-sm text-muted-foreground">Status: {campaign.status}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">Budget: ${campaign.budget}</p>
                          {campaign.campaign_metrics?.[0] && (
                            <p className="text-sm text-muted-foreground">
                              Clicks: {campaign.campaign_metrics[0].clicks || 0}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button 
                  onClick={() => handleCreateCampaign("Telegram")}
                  className="bg-platform-telegram hover:bg-platform-telegram/90"
                >
                  Create Telegram Campaign
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="google">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="text-platform-google" />
                Google Campaigns
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {campaigns?.filter(c => c.platform === 'google').map((campaign) => (
                  <Card key={campaign.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold">{campaign.name}</h3>
                          <p className="text-sm text-muted-foreground">Status: {campaign.status}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm">Budget: ${campaign.budget}</p>
                          {campaign.campaign_metrics?.[0] && (
                            <p className="text-sm text-muted-foreground">
                              Clicks: {campaign.campaign_metrics[0].clicks || 0}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
                <Button 
                  onClick={() => handleCreateCampaign("Google")}
                  className="bg-platform-google hover:bg-platform-google/90"
                >
                  Create Google Campaign
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;