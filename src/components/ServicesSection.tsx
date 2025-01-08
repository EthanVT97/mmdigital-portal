import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";

export const ServicesSection = () => {
  const services = [
    {
      title: "Facebook Page Ads",
      features: [
        "Custom audience targeting",
        "Automated post boosting",
        "Performance analytics",
        "Budget optimization",
      ],
    },
    {
      title: "Telegram Marketing",
      features: [
        "Channel promotion",
        "Message scheduling",
        "Audience insights",
        "Engagement tracking",
      ],
    },
    {
      title: "Google Advertising",
      features: [
        "Keyword optimization",
        "Display network ads",
        "Search campaign management",
        "Conversion tracking",
      ],
    },
  ];

  return (
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Our Services
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.title} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="text-xl text-primary">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2">
                      <CheckCircle2 className="text-green-500 w-5 h-5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};