import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Navigation } from "@/components/Navigation";
import { faqs } from "@/constants/faq";
import { containerVariants, itemVariants, fadeInUp } from "@/constants/animations";
import { useTranslation } from 'react-i18next';

const FAQ = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <motion.h1
              variants={fadeInUp}
              className="text-4xl md:text-5xl font-bold text-center mb-8 text-[#1A365D]"
            >
              {t('faq.title')}
            </motion.h1>
            <motion.p
              variants={fadeInUp}
              className="text-xl text-center text-gray-600 mb-12"
            >
              {t('faq.subtitle')}
            </motion.p>

            <motion.div variants={containerVariants} className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Accordion type="single" collapsible>
                    <AccordionItem value={`item-${index}`}>
                      <AccordionTrigger className="text-lg">
                        {t(`faq.items.${index}.question`)}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600">
                        {t(`faq.items.${index}.answer`)}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
