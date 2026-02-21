import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import escalaxLogo from "@/assets/escalaxpro-logo.png";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Como Funciona", href: "#metodo" },
    { label: "Ferramenta", href: "#ferramenta" },
    { label: "Oferta", href: "#oferta" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <img src={escalaxLogo} alt="EscalaXpro" className="w-8 h-8 rounded" />
          <span className="text-xl font-bold font-mono-title tracking-tight">ESCALAXPRO</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
              {link.label}
            </a>
          ))}
          <Button size="sm" className="neon-btn text-primary-foreground border-0 hover:scale-105 transition-transform">
            QUERO MEU ACESSO
          </Button>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-border/50 bg-background/95 backdrop-blur-xl"
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                {link.label}
              </a>
            ))}
            <Button className="neon-btn text-primary-foreground border-0 w-full">
              QUERO MEU ACESSO
            </Button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default NavBar;
