import { motion, useScroll, useTransform } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { useRef } from "react";
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  const team = [
    {
      name: t('team.ceo.name'),
      role: t('team.ceo.role'),
      image: "https://i.pravatar.cc/300?img=1",
      bio: t('team.ceo.bio')
    },
    {
      name: t('team.marketing.name'),
      role: t('team.marketing.role'),
      image: "https://i.pravatar.cc/300?img=5",
      bio: t('team.marketing.bio')
    },
    {
      name: t('team.tech.name'),
      role: t('team.tech.role'),
      image: "https://i.pravatar.cc/300?img=3",
      bio: t('team.tech.bio')
    },
    {
      name: t('team.creative.name'),
      role: t('team.creative.role'),
      image: "https://i.pravatar.cc/300?img=4",
      bio: t('team.creative.bio')
    }
  ];

  const achievements = [
    {
      number: t('achievements.projects.number'),
      label: t('achievements.projects.label')
    },
    {
      number: t('achievements.staff.number'),
      label: t('achievements.staff.label')
    },
    {
      number: t('achievements.experience.number'),
      label: t('achievements.experience.label')
    },
    {
      number: t('achievements.awards.number'),
      label: t('achievements.awards.label')
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24">
        {/* Hero Section */}
        <div className="relative h-[60vh] bg-[#1A365D] overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=2000')",
              backgroundPosition: "center",
              backgroundSize: "cover",
              y
            }}
          />
          <div className="relative container mx-auto px-4 h-full flex items-center">
            <div className="max-w-2xl">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-6xl font-bold mb-6 text-white"
              >
                {t('about.title')}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-xl text-gray-200"
              >
                {t('about.description')}
              </motion.p>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-4xl md:text-5xl font-bold text-[#1A365D] mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-gray-600">{achievement.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-20 bg-gray-50" ref={containerRef}>
          <div className="container mx-auto px-4">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-center mb-16 text-[#1A365D]"
            >
              {t('team.title')}
            </motion.h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-1 text-[#1A365D]">
                      {member.name}
                    </h3>
                    <div className="text-[#1877F2] mb-3">{member.role}</div>
                    <p className="text-gray-600">{member.bio}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
