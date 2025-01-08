import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Facebook, MessageCircle, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();

  const handleCreateCampaign = (platform: string) => {
    toast({
      title: "Coming Soon",
      description: `${platform} campaign creation will be available soon!`,
    });
  };

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
              <Button 
                onClick={() => handleCreateCampaign("Facebook")}
                className="bg-platform-facebook hover:bg-platform-facebook/90"
              >
                Create Facebook Campaign
              </Button>
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
              <Button 
                onClick={() => handleCreateCampaign("Telegram")}
                className="bg-platform-telegram hover:bg-platform-telegram/90"
              >
                Create Telegram Campaign
              </Button>
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
              <Button 
                onClick={() => handleCreateCampaign("Google")}
                className="bg-platform-google hover:bg-platform-google/90"
              >
                Create Google Campaign
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;