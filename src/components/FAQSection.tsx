import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSiteContent } from "@/hooks/useSiteContent";

const FAQSection = () => {
  const { content } = useSiteContent();
  const { faq } = content;

  return (
    <section id="faq" className="py-16 md:py-24 hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern" />
      <div className="container relative mx-auto px-4 md:px-6">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-8 md:mb-12"
          >
            <span className="text-xs text-primary tracking-widest uppercase mb-3 md:mb-4 block font-semibold">
              {faq.badge}
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-foreground">{faq.title}</h2>
          </motion.div>
  
          <div className="max-w-2xl mx-auto">
            <Accordion type="single" collapsible className="space-y-2 md:space-y-3">
              {faq.items.map((item, index) => (
                <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <AccordionItem value={`item-${index}`} className="rounded-lg md:rounded-xl px-4 md:px-6 border border-border bg-background">
                  <AccordionTrigger className="text-left text-xs md:text-sm font-medium hover:text-primary transition-colors text-foreground">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs md:text-sm text-muted-foreground leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
