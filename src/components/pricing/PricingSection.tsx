import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

const pricingPlans = [
  {
    name: "Basic",
    price: "99",
    popular: false,
    description: "Perfect for small businesses starting with digital marketing",
    features: [
      "3 social media platforms",
      "Up to 10 campaigns/month",
      "Basic analytics dashboard",
      "Facebook & Instagram Ads",
      "Email support",
      "Community access"
    ],
    color: "from-purple-500 to-indigo-500"
  },
  {
    name: "Business",
    price: "199",
    popular: true,
    description: "Ideal for growing businesses and marketing agencies",
    features: [
      "All Basic features, plus:",
      "Unlimited social platforms",
      "Unlimited campaigns",
      "Advanced analytics & reporting",
      "TikTok & YouTube Ads",
      "Telegram Bot integration",
      "Priority email & chat support",
      "Campaign optimization tools"
    ],
    color: "from-cyan-500 to-blue-500"
  },
  {
    name: "Enterprise",
    price: "399",
    popular: false,
    description: "For large organizations needing full-scale solutions",
    features: [
      "All Business features, plus:",
      "Custom API integration",
      "White-label solutions",
      "Dedicated account manager",
      "Custom automation workflows",
      "Advanced AI targeting",
      "24/7 priority support",
      "Performance marketing suite"
    ],
    color: "from-rose-500 to-pink-500"
  }
];

export function PricingSection() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-4">
            Choose Your Plan
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Select the perfect plan for your business needs. All plans include our core features to help you grow your digital presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative overflow-hidden bg-gray-800/50 backdrop-blur border-gray-700 hover:border-gray-600 transition-all duration-300 ${
                plan.popular ? 'border-2 border-blue-500 scale-105' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-4 py-1 rounded-bl-lg text-sm font-medium">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center text-white">
                  {plan.name}
                </CardTitle>
                <div className="text-center mt-4">
                  <div className="flex items-center justify-center">
                    <span className="text-sm text-gray-400 mr-1">$</span>
                    <span className="text-5xl font-bold bg-gradient-to-r ${plan.color} bg-clip-text text-transparent">
                      {plan.price}
                    </span>
                    <span className="text-gray-400 ml-1">/mo</span>
                  </div>
                  <p className="text-sm text-gray-400 mt-2">
                    {plan.description}
                  </p>
                </div>
              </CardHeader>
              <CardContent className="mt-4">
                <ul className="space-y-4">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className={`h-5 w-5 mr-3 flex-shrink-0 bg-gradient-to-r ${plan.color} bg-clip-text text-transparent`} />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button 
                  className={`w-full bg-gradient-to-r ${plan.color} hover:opacity-90 transition-opacity`}
                >
                  Get Started
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-400 mb-4">
            All plans include: SSL security, 99.9% uptime guarantee, and basic analytics
          </p>
          <Button variant="link" className="text-cyan-400 hover:text-cyan-300">
            Compare all features →
          </Button>
        </div>
      </div>
    </section>
  );
}
