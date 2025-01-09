import { motion } from "framer-motion";
import { TikTokCampaignForm } from "@/components/campaigns/TikTokCampaignForm";
import { fadeInUp } from "@/constants/animations";

const TikTokCampaign = () => {
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
              <h1 className="text-3xl font-bold text-[#000000] mb-4">
                Create TikTok Campaign
              </h1>
              <p className="text-gray-600">
                Create viral TikTok content and reach millions of users organically.
                Fill in the details below to get started.
              </p>
            </div>

            <TikTokCampaignForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TikTokCampaign;
