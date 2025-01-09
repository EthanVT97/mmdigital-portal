import { motion, useScroll, useTransform } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { useRef } from "react";
import { useTranslation } from 'react-i18next';
import {
  Facebook,
  MessageCircle,
  Search,
  BarChart,
  Target,
  Users,
  TrendingUp,
  Share2,
} from "lucide-react";

const Services = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const services = [
    {
      icon: <Facebook className="w-8 h-8 text-white" />,
      title: t('platforms.facebook.title'),
      description: t('platforms.facebook.description'),
      color: "#1877F2",
      features: [
        t('features.targeting'),
        t('features.automation'),
        t('features.testing'),
        t('features.roi'),
      ],
    },
    {
      icon: <MessageCircle className="w-8 h-8 text-white" />,
      title: t('platforms.telegram.title'),
      description: t('platforms.telegram.description'),
      color: "#0088cc",
      features: [
        t('features.channel'),
        t('features.posting'),
        t('features.analytics'),
        t('features.engagement'),
      ],
    },
    {
      icon: <Search className="w-8 h-8 text-white" />,
      title: t('platforms.google.title'),
      description: t('platforms.google.description'),
      color: "#EA4335",
      features: [
        t('features.keyword'),
        t('features.optimization'),
        t('features.performance'),
        t('features.roi'),
      ],
    },
    {
      icon: <BarChart className="w-8 h-8 text-white" />,
      title: t('features.analytics.title'),
      description: t('features.analytics.description'),
      color: "#34A853",
      features: [
        t('features.realtime'),
        t('features.reports'),
        t('features.insights'),
        t('features.metrics'),
      ],
    },
  ];

  const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: t('features.target.title'),
      description: t('features.target.description'),
    },
    {
      icon: <BarChart className="w-6 h-6" />,
      title: t('features.analytics.title'),
      description: t('features.analytics.description'),
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t('features.audience.title'),
      description: t('features.audience.description'),
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: t('features.roi.title'),
      description: t('features.roi.description'),
    },
    {
      icon: <Share2 className="w-6 h-6" />,
      title: t('features.cross.title'),
      description: t('features.cross.description'),
    },
  ];

  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24">
        {/* Hero Section */}
        <div className="relative h-[60vh] bg-gradient-to-br from-[#1A365D] to-[#2B6CB0] overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-10"
            style={{ backgroundImage: "url('/grid.png')", y }}
          />
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                {t('services.title', 'Our Services')}
              </h1>
              <p className="text-xl text-gray-200">
                {t('services.subtitle', 'Comprehensive digital marketing solutions to help your business grow')}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Services Section */}
        <div className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <div 
                    className="p-6"
                    style={{ backgroundColor: service.color }}
                  >
                    {service.icon}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-[#1A365D]">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li 
                          key={idx}
                          className="flex items-center text-sm text-gray-600"
                        >
                          <div 
                            className="w-2 h-2 rounded-full mr-2"
                            style={{ backgroundColor: service.color }}
                          />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-white" ref={containerRef}>
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-center mb-16 text-[#1A365D]"
            >
              {t('features.title', 'Key Features')}
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 bg-[#1A365D] rounded-lg flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-[#1A365D]">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
