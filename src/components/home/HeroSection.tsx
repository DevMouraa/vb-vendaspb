
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <div className="relative w-full h-[70vh] max-h-[600px] mt-16 overflow-hidden bg-vb-black">
      {/* Background with gradient overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-vb-black via-vb-black/80 to-transparent z-10"></div>
      </div>
      
      {/* Content */}
      <div className="container relative z-20 h-full flex flex-col justify-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-md"
        >
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          >
            Beleza e Essência em<br />
            <span className="text-vb-beige">cada detalhe</span>
          </motion.h1>
          
          <motion.p 
            className="text-white/90 mb-8 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          >
            Perfumes, joias e acessórios com 30 anos de tradição em Cabedelo-PB
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
            className="flex flex-wrap gap-4"
          >
            <Button 
              asChild
              className="bg-vb-beige text-vb-black hover:bg-vb-beige-dark hover:text-vb-black transition-colors"
              size="lg"
            >
              <Link to="/categoria/perfumes-femininos">
                Ver Produtos
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            
            <Button 
              asChild
              variant="outline" 
              className="border-white text-white hover:bg-white/10 transition-colors"
              size="lg"
            >
              <Link to="/contato">
                Fale Conosco
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HeroSection;
