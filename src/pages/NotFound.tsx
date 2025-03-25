
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <Header />
      <motion.div 
        className="min-h-screen flex items-center justify-center py-20 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center max-w-md mx-auto">
          <div className="mb-8">
            <span className="text-8xl font-light text-vb-black">404</span>
          </div>
          <h1 className="text-3xl font-medium text-vb-black mb-4">Página não encontrada</h1>
          <p className="text-vb-black-light mb-8">
            A página que você está procurando não existe ou foi removida.
          </p>
          <Button 
            asChild
            className="bg-vb-beige text-vb-black hover:bg-vb-beige-dark"
            size="lg"
          >
            <Link to="/">
              Voltar para a Página Inicial
            </Link>
          </Button>
        </div>
      </motion.div>
      <Footer />
    </>
  );
};

export default NotFound;
