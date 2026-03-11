import { Zap, Shield } from "lucide-react";

const FooterSection = () => {
  return (
    <footer className="border-t border-border py-8 md:py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center gap-4 md:flex-row md:justify-between md:gap-6">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <span className="font-black uppercase text-foreground text-sm">ESCALAX<span className="text-primary">PRO</span></span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-xs md:text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-foreground transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-foreground transition-colors">Suporte</a>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>SSL Seguro • Pagamento protegido</span>
          </div>
        </div>

        <div className="text-center mt-6 md:mt-8 text-xs text-muted-foreground">
          © {new Date().getFullYear()} EscalaxPro. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
