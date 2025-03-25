
import React from "react";
import { Link } from "react-router-dom";
import { Heart, Rocket, Instagram, Phone } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-vb-black text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Column 1: Experience */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-vb-beige text-lg font-medium mb-4">EXPERIÊNCIA VB</h3>
            <div className="flex items-start space-x-3">
              <Heart className="text-vb-beige w-5 h-5 mt-0.5" />
              <p className="text-sm">30 anos de vendas em Cabedelo-PB</p>
            </div>
            <div className="flex items-start space-x-3">
              <Rocket className="text-vb-beige w-5 h-5 mt-0.5" />
              <p className="text-sm">Entrega na loja física ou em sua casa!</p>
            </div>
          </div>

          {/* Column 2: Links */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-vb-beige text-lg font-medium mb-4">LINKS ÚTEIS</h3>
            <a 
              href="https://wa.me/5583988095530?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20a%20política%20de%20privacidade." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm hover:text-vb-beige transition-colors"
            >
              Política de Privacidade
            </a>
            <a 
              href="https://wa.me/5583988095530?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20os%20termos%20de%20uso." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm hover:text-vb-beige transition-colors"
            >
              Termos de Uso
            </a>
            <a 
              href="https://wa.me/5583988095530?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20a%20VB%20Acessórios!" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm hover:text-vb-beige transition-colors"
            >
              Sobre a Loja
            </a>
          </div>

          {/* Column 3: Contact */}
          <div className="flex flex-col space-y-4">
            <h3 className="text-vb-beige text-lg font-medium mb-4">CONTATO</h3>
            <a 
              href="https://wa.me/5583988095530" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-3 text-sm hover:text-vb-beige transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>(83) 98809-5530</span>
            </a>
            <a 
              href="https://instagram.com/vb.eacessorios" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-3 text-sm hover:text-vb-beige transition-colors"
            >
              <Instagram className="w-5 h-5" />
              <span>@vb.eacessorios</span>
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-vb-beige/20 my-8"></div>

        {/* Copyright & Logo */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-4 md:mb-0">
            <img
              src="/lovable-uploads/6b835a67-ce01-4ccb-b115-adb9141a398b.png"
              alt="VB Essências e Acessórios"
              className="h-10 invert opacity-80"
            />
          </div>
          <p className="text-sm text-vb-beige/70">
            &copy; {currentYear} VB Essências e Acessórios. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
