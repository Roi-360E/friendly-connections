import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  { question: "O que exatamente eu recebo ao comprar?", answer: "Você recebe acesso completo ao aplicativo EscalaxPro, onde você pode criar centenas de criativos de vídeo usando a lógica de Gancho + Corpo + CTA. Dependendo do plano, seus créditos podem ser ilimitados e o acesso vitalício." },
  { question: "Preciso saber editar vídeo?", answer: "Não! O app faz todo o trabalho pesado por você. Você só precisa selecionar seus ganchos, corpos e CTAs, e o sistema concatena tudo automaticamente gerando dezenas de variações prontas para rodar." },
  { question: "Quantos criativos consigo gerar por semana?", answer: "Com a lógica de multiplicação, você pode gerar facilmente 50, 100, 200 ou até 300 criativos por semana. Com 10 ganchos × 5 corpos × 2 CTAs você já tem 100 variações únicas em uma única leva." },
  { question: "Funciona para qualquer nicho?", answer: "Sim! A lógica de concatenação funciona para qualquer vertical: e-commerce, infoprodutos, serviços locais, apps, SaaS e mais. Se você roda tráfego, funciona pra você." },
  { question: "Funciona no Facebook e TikTok Ads?", answer: "Sim. Os criativos são exportados em formatos compatíveis com todas as plataformas: Facebook, Instagram, TikTok, YouTube e Google Ads." },
  { question: "Tem garantia?", answer: "Sim! Garantia incondicional de 7 dias. Se você não gostar ou achar que não é pra você, é só pedir o reembolso e devolvemos 100% do seu dinheiro. Sem perguntas." },
  { question: "Qual a forma de pagamento?", answer: "Aceitamos cartão de crédito (até 12x), PIX e boleto bancário. O acesso é liberado imediatamente após a confirmação do pagamento." },
];

const FAQSection = () => {
  return (
    <section id="faq" className="py-16 md:py-24 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 md:mb-12"
        >
          <span className="text-xs text-primary tracking-widest uppercase mb-3 md:mb-4 block font-bold">
            Dúvidas
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-foreground">Perguntas Frequentes</h2>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <Accordion type="single" collapsible className="space-y-2 md:space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <AccordionItem value={`item-${index}`} className="rounded-lg md:rounded-xl px-4 md:px-6 border border-border bg-background">
                  <AccordionTrigger className="text-left text-xs md:text-sm font-medium hover:text-primary transition-colors text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs md:text-sm text-muted-foreground leading-relaxed">
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
