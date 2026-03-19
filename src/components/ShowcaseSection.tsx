import { motion } from "framer-motion";
import TypingChat from "@/components/TypingChat";
import screenshot6 from "@/assets/app-screenshot-6.png";
import { useSiteContent } from "@/hooks/useSiteContent";

const ShowcaseSection = () => {
  const { content } = useSiteContent();
  const { showcase } = content;

  return (
    <section className="py-16 md:py-24 hero-gradient relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern" />
      <div className="container relative mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <span className="text-xs text-primary tracking-widest uppercase mb-3 md:mb-4 block font-semibold">
            {showcase.badge}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-black mb-3 md:mb-4 tracking-tight text-foreground">
            {showcase.title}{" "}
            <span className="text-primary">{showcase.titleHighlight}</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-4xl mx-auto">
          {showcase.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="rounded-xl md:rounded-2xl p-4 md:p-6 flex flex-col items-center text-center bg-background border border-border"
            >
              <div className={index === 0 ? "mb-4 md:mb-6 w-full" : "rounded-lg md:rounded-xl overflow-hidden mb-4 md:mb-6 w-full border border-border"}>
                {index === 0 ? <TypingChat /> : <img src={screenshot6} alt="Interface Showcase" className="w-full" />}
              </div>
              <span className="text-xs text-primary tracking-wider mb-2 font-semibold uppercase">{item.badge}</span>
              <h3 className="text-base md:text-lg font-bold mb-2 text-foreground">{item.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowcaseSection;
