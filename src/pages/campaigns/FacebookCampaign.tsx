import { motion } from "framer-motion";
import { FacebookCampaignForm } from "@/components/campaigns/FacebookCampaignForm";
import { fadeInUp } from "@/constants/animations";

const FacebookCampaign = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#1A365D] mb-4">
                Create Facebook Campaign
              </h1>
              <p className="text-gray-600">
                Set up your Facebook advertising campaign with our easy-to-use form.
                Fill in the details below to get started.
              </p>
            </div>

            <FacebookCampaignForm />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default FacebookCampaign;
