import { motion } from "framer-motion";
import { YouTubeCampaignForm } from "@/components/campaigns/YouTubeCampaignForm";
import { fadeInUp } from "@/constants/animations";

const YouTubeCampaign = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="max-w-7xl mx-auto"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#FF0000] mb-4">
                Create YouTube Campaign
              </h1>
              <p className="text-gray-600">
                Create engaging YouTube content and grow your audience organically.
                Fill in the details below to get started.
              </p>
            </div>

            <YouTubeCampaignForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default YouTubeCampaign;
