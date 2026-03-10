import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import escalaxLogo from "@/assets/escalaxpro-logo.png";

const SIGNUP_URL = "https://deploysites.online/";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: "Funcionalidades", href: "#funcionalidades" },
    { label: "Planos", href: "#planos" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/90 backdrop-blur-md"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <img src={escalaxLogo} alt="EscalaXpro" className="w-8 h-8 rounded-lg object-cover" />
          <span className="text-xl font-black tracking-tight text-foreground">
            ESCALAX<span className="text-primary">PRO</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
              {link.label}
            </a>
          ))}
          <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
            <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-wide">
              TESTAR GRÁTIS
            </Button>
          </a>
        </div>

        <button className="md:hidden text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-t border-border bg-background"
        >
          <div className="px-6 py-4 flex flex-col gap-4">
            {links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setIsOpen(false)} className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium">
                {link.label}
              </a>
            ))}
            <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 w-full font-bold uppercase">
                TESTAR GRÁTIS
              </Button>
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default NavBar;
