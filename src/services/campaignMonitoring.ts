import { supabase } from '@/lib/supabase';
import { errorHandler, CampaignError } from './errorHandling';
import { authService } from './authService';

export interface CampaignMetrics {
  impressions: number;
  clicks: number;
  conversions: number;
  spend: number;
  ctr: number;
  cpc: number;
  roas: number;
  engagementRate: number;
  bounceRate: number;
  averageSessionDuration: number;
  costPerConversion: number;
  conversionRate: number;
}

export interface CampaignAlert {
  type: 'budget' | 'performance' | 'error' | 'optimization';
  message: string;
  severity: 'info' | 'warning' | 'error';
  timestamp: Date;
  metric?: keyof CampaignMetrics;
  threshold?: number;
  currentValue?: number;
}

export interface CampaignOptimization {
  type: string;
  suggestion: string;
  impact: 'high' | 'medium' | 'low';
  metrics: Array<keyof CampaignMetrics>;
  potentialImprovement: number;
}

export interface AudienceInsights {
  demographics: {
    age: Record<string, number>;
    gender: Record<string, number>;
    location: Record<string, number>;
    interests: Record<string, number>;
  };
  behavior: {
    deviceType: Record<string, number>;
    timeOfDay: Record<string, number>;
    daysOfWeek: Record<string, number>;
  };
}

class CampaignMonitoringService {
  private readonly ALERT_THRESHOLDS = {
    budgetWarning: 0.8,
    budgetCritical: 0.95,
    ctrWarning: 0.01,
    roasWarning: 2,
    conversionRateWarning: 0.02,
    bounceRateWarning: 0.7,
    engagementRateWarning: 0.1
  };

  async getCampaignMetrics(campaignId: string): Promise<CampaignMetrics> {
    return await authService.executeWithRetry(async () => {
      try {
        const { data, error } = await supabase
          .from('campaign_metrics')
          .select('*')
          .eq('campaign_id', campaignId)
          .single();

        if (error) throw error;

        if (!data) {
          throw new CampaignError('Campaign metrics not found', campaignId, 'METRICS_NOT_FOUND');
        }

        const metrics: CampaignMetrics = {
          impressions: data.impressions,
          clicks: data.clicks,
          conversions: data.conversions,
          spend: data.spend,
          ctr: data.clicks / data.impressions,
          cpc: data.spend / data.clicks,
          roas: data.revenue / data.spend,
          engagementRate: data.engagements / data.impressions,
          bounceRate: data.bounces / data.sessions,
          averageSessionDuration: data.total_session_duration / data.sessions,
          costPerConversion: data.spend / data.conversions,
          conversionRate: data.conversions / data.clicks
        };

        this.validateMetrics(metrics, campaignId);
        return metrics;
      } catch (error) {
        errorHandler.handle(error, 'getCampaignMetrics');
        throw error;
      }
    });
  }

  private validateMetrics(metrics: CampaignMetrics, campaignId: string) {
    if (metrics.ctr > 1) {
      throw new CampaignError('Invalid CTR value', campaignId, 'INVALID_CTR');
    }
    if (metrics.conversionRate > 1) {
      throw new CampaignError('Invalid conversion rate', campaignId, 'INVALID_CONVERSION_RATE');
    }
  }

  async getAudienceInsights(campaignId: string): Promise<AudienceInsights> {
    try {
      const { data, error } = await supabase
        .from('campaign_audience_insights')
        .select('*')
        .eq('campaign_id', campaignId)
        .single();

      if (error) throw error;

      if (!data) {
        throw new CampaignError('Audience insights not found', campaignId, 'INSIGHTS_NOT_FOUND');
      }

      return {
        demographics: {
          age: data.age_distribution,
          gender: data.gender_distribution,
          location: data.location_distribution,
          interests: data.interests_distribution
        },
        behavior: {
          deviceType: data.device_distribution,
          timeOfDay: data.time_distribution,
          daysOfWeek: data.day_distribution
        }
      };
    } catch (error) {
      errorHandler.handle(error, 'getAudienceInsights');
      throw error;
    }
  }

  async monitorCampaign(campaignId: string): Promise<CampaignAlert[]> {
    const metrics = await this.getCampaignMetrics(campaignId);
    const alerts: CampaignAlert[] = [];

    // Budget monitoring
    const { data: campaign } = await supabase
      .from('campaigns')
      .select('budget, spent')
      .eq('id', campaignId)
      .single();

    const budgetRatio = campaign.spent / campaign.budget;

    if (budgetRatio >= this.ALERT_THRESHOLDS.budgetCritical) {
      alerts.push({
        type: 'budget',
        message: `Critical: Campaign has spent ${Math.round(budgetRatio * 100)}% of its budget`,
        severity: 'error',
        timestamp: new Date(),
        metric: 'spend',
        threshold: this.ALERT_THRESHOLDS.budgetCritical,
        currentValue: budgetRatio
      });
    } else if (budgetRatio >= this.ALERT_THRESHOLDS.budgetWarning) {
      alerts.push({
        type: 'budget',
        message: `Warning: Campaign has spent ${Math.round(budgetRatio * 100)}% of its budget`,
        severity: 'warning',
        timestamp: new Date(),
        metric: 'spend',
        threshold: this.ALERT_THRESHOLDS.budgetWarning,
        currentValue: budgetRatio
      });
    }

    // Performance monitoring
    this.checkMetricThreshold(metrics.ctr, this.ALERT_THRESHOLDS.ctrWarning, 'ctr', 'CTR', alerts);
    this.checkMetricThreshold(metrics.roas, this.ALERT_THRESHOLDS.roasWarning, 'roas', 'ROAS', alerts);
    this.checkMetricThreshold(metrics.conversionRate, this.ALERT_THRESHOLDS.conversionRateWarning, 'conversionRate', 'Conversion Rate', alerts);
    this.checkMetricThreshold(metrics.bounceRate, this.ALERT_THRESHOLDS.bounceRateWarning, 'bounceRate', 'Bounce Rate', alerts, true);
    this.checkMetricThreshold(metrics.engagementRate, this.ALERT_THRESHOLDS.engagementRateWarning, 'engagementRate', 'Engagement Rate', alerts);

    return alerts;
  }

  private checkMetricThreshold(
    value: number,
    threshold: number,
    metric: keyof CampaignMetrics,
    metricName: string,
    alerts: CampaignAlert[],
    isHigherWorse: boolean = false
  ) {
    const condition = isHigherWorse ? value > threshold : value < threshold;
    if (condition) {
      alerts.push({
        type: 'performance',
        message: `Low ${metricName}: ${(value * 100).toFixed(2)}%`,
        severity: 'warning',
        timestamp: new Date(),
        metric,
        threshold,
        currentValue: value
      });
    }
  }

  async generateOptimizations(campaignId: string): Promise<CampaignOptimization[]> {
    const metrics = await this.getCampaignMetrics(campaignId);
    const insights = await this.getAudienceInsights(campaignId);
    const optimizations: CampaignOptimization[] = [];

    // CTR Optimization
    if (metrics.ctr < this.ALERT_THRESHOLDS.ctrWarning) {
      optimizations.push({
        type: 'creative',
        suggestion: 'Consider refreshing ad creatives or testing new variations',
        impact: 'high',
        metrics: ['ctr', 'engagementRate'],
        potentialImprovement: 0.3
      });
    }

    // Budget Optimization
    if (metrics.cpc > metrics.costPerConversion * 0.3) {
      optimizations.push({
        type: 'budget',
        suggestion: 'Optimize bid strategy to reduce cost per click',
        impact: 'medium',
        metrics: ['cpc', 'costPerConversion'],
        potentialImprovement: 0.2
      });
    }

    // Audience Optimization
    const topPerformingAgeGroup = this.getTopPerforming(insights.demographics.age);
    optimizations.push({
      type: 'audience',
      suggestion: `Focus more budget on top performing age group: ${topPerformingAgeGroup}`,
      impact: 'high',
      metrics: ['conversionRate', 'roas'],
      potentialImprovement: 0.25
    });

    return optimizations;
  }

  private getTopPerforming(distribution: Record<string, number>): string {
    return Object.entries(distribution)
      .sort(([, a], [, b]) => b - a)[0][0];
  }

  async generatePerformanceReport(campaignId: string) {
    const metrics = await this.getCampaignMetrics(campaignId);
    const alerts = await this.monitorCampaign(campaignId);
    const optimizations = await this.generateOptimizations(campaignId);
    const insights = await this.getAudienceInsights(campaignId);

    return {
      metrics,
      alerts,
      optimizations,
      insights,
      timestamp: new Date()
    };
  }
}

export const campaignMonitoring = new CampaignMonitoringService();
