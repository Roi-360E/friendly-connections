import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "O que é a estrutura Gancho + Corpo + CTA?",
    answer: "É a fórmula de criativos de alta conversão: o Gancho captura a atenção nos primeiros segundos, o Corpo entrega a proposta de valor, e o CTA (Call to Action) direciona a ação desejada. O Escalax automatiza a combinação desses elementos.",
  },
  {
    question: "Como funciona a geração em massa?",
    answer: "Você cadastra seus ganchos, corpos e CTAs e o Escalax gera todas as combinações possíveis automaticamente. Se você tem 10 ganchos, 5 corpos e 3 CTAs, são 150 criativos prontos em segundos.",
  },
  {
    question: "Posso usar para qualquer nicho?",
    answer: "Sim! Temos templates otimizados para e-commerce, infoprodutos, SaaS, serviços locais, aplicativos e mais. A estrutura Gancho + Corpo + CTA funciona para qualquer segmento.",
  },
  {
    question: "Funciona para Meta Ads, Google Ads e TikTok Ads?",
    answer: "Sim! Os criativos gerados podem ser usados em qualquer plataforma de anúncios. Temos formatos otimizados para cada canal.",
  },
  {
    question: "Posso cancelar a qualquer momento?",
    answer: "Claro. Sem multas, sem burocracia. Cancele direto pela plataforma e mantenha acesso até o final do período pago.",
  },
  {
    question: "Qual a garantia de satisfação?",
    answer: "Oferecemos 7 dias de garantia incondicional. Se não ficar satisfeito, devolvemos 100% do valor investido.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-24 bg-muted/50" id="faq">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">FAQ</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-5">
            Perguntas{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">frequentes</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Tire suas dúvidas sobre o Escalax.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <AccordionItem value={`item-${index}`} className="bg-card border border-border rounded-xl px-6 data-[state=open]:shadow-lg data-[state=open]:border-primary/20 transition-all">
                  <AccordionTrigger className="text-left font-semibold text-base py-5 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                    {faq.answer}
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
