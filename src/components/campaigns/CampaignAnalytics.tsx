import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { 
  campaignMonitoring, 
  CampaignMetrics, 
  CampaignAlert, 
  CampaignOptimization,
  AudienceInsights 
} from '@/services/campaignMonitoring';
import { errorHandler } from '@/services/errorHandling';

interface CampaignAnalyticsProps {
  campaignId: string;
  refreshInterval?: number; // in milliseconds
}

export function CampaignAnalytics({ campaignId, refreshInterval = 300000 }: CampaignAnalyticsProps) {
  const [metrics, setMetrics] = useState<CampaignMetrics | null>(null);
  const [alerts, setAlerts] = useState<CampaignAlert[]>([]);
  const [optimizations, setOptimizations] = useState<CampaignOptimization[]>([]);
  const [insights, setInsights] = useState<AudienceInsights | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const report = await campaignMonitoring.generatePerformanceReport(campaignId);
      setMetrics(report.metrics);
      setAlerts(report.alerts);
      setOptimizations(report.optimizations);
      setInsights(report.insights);
    } catch (error) {
      errorHandler.handle(error, 'CampaignAnalytics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [campaignId, refreshInterval]);

  if (loading) {
    return <div className="flex items-center justify-center p-8">Loading analytics...</div>;
  }

  const formatMetricValue = (value: number, isPercentage: boolean = false) => {
    if (isPercentage) {
      return `${(value * 100).toFixed(2)}%`;
    }
    return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Impressions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMetricValue(metrics?.impressions ?? 0)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">CTR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMetricValue(metrics?.ctr ?? 0, true)}</div>
            <Progress value={(metrics?.ctr ?? 0) * 100} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMetricValue(metrics?.conversionRate ?? 0, true)}</div>
            <Progress value={(metrics?.conversionRate ?? 0) * 100} className="mt-2" />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">ROAS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatMetricValue(metrics?.roas ?? 0)}x</div>
          </CardContent>
        </Card>
      </div>

      {/* Cost Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cost per Click</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${formatMetricValue(metrics?.cpc ?? 0)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Cost per Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${formatMetricValue(metrics?.costPerConversion ?? 0)}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${formatMetricValue(metrics?.spend ?? 0)}</div>
          </CardContent>
        </Card>
      </div>

      {/* Audience Insights */}
      {insights && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Age Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(insights.demographics.age).map(([age, value]) => (
                  <div key={age} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{age}</span>
                      <span>{formatMetricValue(value, true)}</span>
                    </div>
                    <Progress value={value * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Time of Day Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(insights.behavior.timeOfDay)
                  .sort((a, b) => parseInt(a[0]) - parseInt(b[0]))
                  .map(([hour, value]) => (
                    <div key={hour} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{hour.padStart(2, '0')}:00</span>
                        <span>{formatMetricValue(value, true)}</span>
                      </div>
                      <Progress value={value * 100} className="h-2" />
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Device Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(insights.behavior.deviceType).map(([device, value]) => (
                  <div key={device} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{device}</span>
                      <span>{formatMetricValue(value, true)}</span>
                    </div>
                    <Progress value={value * 100} className="h-2" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Location Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {Object.entries(insights.demographics.location)
                  .sort((a, b) => b[1] - a[1])
                  .slice(0, 5)
                  .map(([location, value]) => (
                    <div key={location} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{location}</span>
                        <span>{formatMetricValue(value, true)}</span>
                      </div>
                      <Progress value={value * 100} className="h-2" />
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Alerts</h3>
          {alerts.map((alert, index) => (
            <Alert 
              key={index} 
              variant={alert.severity === 'error' ? 'destructive' : 'default'}
            >
              <AlertTitle>{alert.type.charAt(0).toUpperCase() + alert.type.slice(1)} Alert</AlertTitle>
              <AlertDescription>
                {alert.message}
                {alert.currentValue && alert.threshold && (
                  <div className="mt-2">
                    <Progress 
                      value={(alert.currentValue / alert.threshold) * 100} 
                      className="mt-2 h-2"
                    />
                  </div>
                )}
              </AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Optimization Suggestions */}
      {optimizations.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Optimization Suggestions</h3>
          {optimizations.map((optimization, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-base">
                  {optimization.type.charAt(0).toUpperCase() + optimization.type.slice(1)} Optimization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{optimization.suggestion}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className={`
                    px-2 py-1 rounded-full text-xs
                    ${optimization.impact === 'high' ? 'bg-red-100 text-red-800' :
                      optimization.impact === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'}
                  `}>
                    {optimization.impact.toUpperCase()} IMPACT
                  </span>
                  <span className="text-sm text-gray-500">
                    Potential improvement: {(optimization.potentialImprovement * 100).toFixed(0)}%
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
