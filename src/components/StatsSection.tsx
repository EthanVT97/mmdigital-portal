import { Card, CardContent } from "@/components/ui/card";
import { Users, TrendingUp, Target } from "lucide-react";

export const StatsSection = () => {
  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-primary">
          Why Choose Us
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="mb-4 flex justify-center">
                <Users className="w-12 h-12 text-platform-facebook" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">10M+</h3>
              <p className="text-gray-600">Users Reached</p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="mb-4 flex justify-center">
                <TrendingUp className="w-12 h-12 text-platform-telegram" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">300%</h3>
              <p className="text-gray-600">Average ROI</p>
            </CardContent>
          </Card>
          
          <Card className="text-center p-6">
            <CardContent className="pt-6">
              <div className="mb-4 flex justify-center">
                <Target className="w-12 h-12 text-platform-google" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">95%</h3>
              <p className="text-gray-600">Target Accuracy</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};