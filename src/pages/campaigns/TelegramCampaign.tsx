import { motion } from "framer-motion";
import { TelegramCampaignForm } from "@/components/campaigns/TelegramCampaignForm";
import { fadeInUp } from "@/constants/animations";

const TelegramCampaign = () => {
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
              <h1 className="text-3xl font-bold text-[#0088cc] mb-4">
                Create Telegram Campaign
              </h1>
              <p className="text-gray-600">
                Set up your Telegram messaging campaign with our easy-to-use form.
                Fill in the details below to get started.
              </p>
            </div>

            <TelegramCampaignForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TelegramCampaign;
