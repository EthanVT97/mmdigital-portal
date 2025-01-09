import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phone, Mail, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export const ContactSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-[#1A365D]">
            ဆက်သွယ်ရန်
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            သင့်လုပ်ငန်းအတွက် Digital Marketing ဆိုင်ရာ အကြံဉာဏ်များ ရယူလိုပါက ဆက်သွယ်ပါ
          </p>
        </div>

        <motion.div 
          className="grid md:grid-cols-2 gap-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.div variants={itemVariants}>
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <Phone className="w-6 h-6 text-[#1877F2]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-[#1A365D]">
                    ဖုန်းခေါ်ဆိုရန်
                  </h3>
                  <p className="text-gray-600">+95 9 123 456 789</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <Mail className="w-6 h-6 text-[#1877F2]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-[#1A365D]">
                    အီးမေးလ်ပို့ရန်
                  </h3>
                  <p className="text-gray-600">info@digitalmm.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-blue-100">
                  <MapPin className="w-6 h-6 text-[#1877F2]" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1 text-[#1A365D]">
                    လိပ်စာ
                  </h3>
                  <p className="text-gray-600">
                    အမှတ် ၁၂၃၊ ဒဂုံမြို့နယ်၊<br />
                    ရန်ကုန်မြို့။
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    အမည်
                  </label>
                  <Input placeholder="သင့်အမည်ထည့်ပါ" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    ဖုန်းနံပါတ်
                  </label>
                  <Input placeholder="သင့်ဖုန်းနံပါတ်ထည့်ပါ" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  အီးမေးလ်
                </label>
                <Input placeholder="သင့်အီးမေးလ်ထည့်ပါ" type="email" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  မက်ဆေ့ချ်
                </label>
                <textarea 
                  placeholder="သင့်မက်ဆေ့ချ်ထည့်ပါ" 
                  className="w-full min-h-[8rem] px-3 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#1A365D] focus:border-transparent"
                />
              </div>

              <Button 
                className="w-full bg-[#1A365D] hover:bg-[#2B6CB0]"
              >
                ပို့ရန်
              </Button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};
