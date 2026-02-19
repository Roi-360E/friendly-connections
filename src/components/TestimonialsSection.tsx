import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Ana Carolina",
    role: "Desenvolvedora Full-Stack",
    content: "Em 6 meses consegui minha primeira vaga como dev. A plataforma me guiou passo a passo, do zero ao emprego dos sonhos.",
    rating: 5,
  },
  {
    name: "Ricardo Mendes",
    role: "Designer UX/UI",
    content: "A qualidade dos cursos é impressionante. Cada módulo tem exercícios práticos que realmente fixam o conhecimento.",
    rating: 5,
  },
  {
    name: "Juliana Santos",
    role: "Data Scientist",
    content: "O sistema de IA que adapta o conteúdo é genial. Sinto que cada aula foi feita especialmente pra mim.",
    rating: 5,
  },
  {
    name: "Felipe Oliveira",
    role: "Product Manager",
    content: "A comunidade é o grande diferencial. Fiz networking, encontrei mentores e até um cofundador para minha startup.",
    rating: 5,
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-24 bg-muted/50" id="depoimentos">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-semibold text-sm uppercase tracking-widest">Depoimentos</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-3 mb-5">
            Quem aprende,{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">recomenda</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Histórias reais de alunos que transformaram suas carreiras com nossa plataforma.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-card border border-border relative"
            >
              <Quote className="w-10 h-10 text-primary/15 absolute top-6 right-6" />
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>
              <p className="text-foreground leading-relaxed mb-6 text-lg">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold">
                  {testimonial.name.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
