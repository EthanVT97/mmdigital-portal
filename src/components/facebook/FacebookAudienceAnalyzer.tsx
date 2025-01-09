import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Target, TrendingUp, Brain } from "lucide-react";

interface AudienceInsight {
  category: string;
  percentage: number;
  growth: number;
  recommendation: string;
}

interface ContentSuggestion {
  type: string;
  topic: string;
  bestTime: string;
  expectedEngagement: string;
}

export function FacebookAudienceAnalyzer() {
  const [insights, setInsights] = useState<AudienceInsight[]>([]);
  const [suggestions, setSuggestions] = useState<ContentSuggestion[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const analyzeAudience = async () => {
    setIsAnalyzing(true);
    try {
      // API call to get audience insights
      const response = await fetch('/api/facebook/analytics/audience');
      const data = await response.json();
      setInsights(data.insights);
      setSuggestions(data.suggestions);
    } catch (error) {
      console.error('Error analyzing audience:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">Target Audience Analyzer</CardTitle>
          <Button 
            onClick={analyzeAudience} 
            disabled={isAnalyzing}
          >
            <Brain className="mr-2 h-4 w-4" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze Audience'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="demographics">
          <TabsList>
            <TabsTrigger value="demographics">Demographics</TabsTrigger>
            <TabsTrigger value="interests">Interests</TabsTrigger>
            <TabsTrigger value="behavior">Behavior</TabsTrigger>
            <TabsTrigger value="suggestions">Content Suggestions</TabsTrigger>
          </TabsList>

          <TabsContent value="demographics" className="space-y-4">
            <div className="grid gap-4">
              {insights.filter(i => i.category === 'demographics').map((insight, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{insight.category}</span>
                    <Badge variant={insight.growth > 0 ? "default" : "destructive"}>
                      {insight.growth > 0 ? '+' : ''}{insight.growth}%
                    </Badge>
                  </div>
                  <Progress value={insight.percentage} />
                  <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="interests" className="space-y-4">
            <div className="grid gap-4">
              {insights.filter(i => i.category === 'interests').map((insight, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{insight.category}</span>
                    <Badge variant={insight.growth > 0 ? "default" : "destructive"}>
                      {insight.growth > 0 ? '+' : ''}{insight.growth}%
                    </Badge>
                  </div>
                  <Progress value={insight.percentage} />
                  <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="behavior" className="space-y-4">
            <div className="grid gap-4">
              {insights.filter(i => i.category === 'behavior').map((insight, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{insight.category}</span>
                    <Badge variant={insight.growth > 0 ? "default" : "destructive"}>
                      {insight.growth > 0 ? '+' : ''}{insight.growth}%
                    </Badge>
                  </div>
                  <Progress value={insight.percentage} />
                  <p className="text-sm text-muted-foreground">{insight.recommendation}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-4">
            <div className="grid gap-4">
              {suggestions.map((suggestion, index) => (
                <Card key={index}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-semibold">{suggestion.topic}</h4>
                        <p className="text-sm text-muted-foreground">Type: {suggestion.type}</p>
                        <p className="text-sm text-muted-foreground">Best Time: {suggestion.bestTime}</p>
                      </div>
                      <Badge>
                        {suggestion.expectedEngagement}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
