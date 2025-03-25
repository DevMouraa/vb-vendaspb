
import React from "react";
import { useLocation, Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";

const CheckoutSuccess = () => {
  const location = useLocation();
  const { orderId, orderTotal } = location.state || {};
  
  // Se não tiver os dados necessários, redirecionar para a página inicial
  if (!orderId) {
    return <Navigate to="/" />;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <main className="container mx-auto px-4 py-24 min-h-[60vh]">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8 text-center">
            <div className="flex flex-col items-center justify-center">
              <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center bg-green-100 rounded-full mb-6">
                <CheckCircle className="h-10 w-10 md:h-12 md:w-12 text-green-600" />
              </div>
              
              <h1 className="text-2xl md:text-3xl font-medium text-vb-black mb-3">
                Pedido Realizado com Sucesso!
              </h1>
              
              <p className="text-vb-black-light mb-6">
                Obrigado por sua compra. Em breve entraremos em contato para confirmar seu pedido.
              </p>
              
              <div className="bg-vb-beige/20 rounded-lg p-4 mb-8 w-full max-w-md">
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-vb-black">Número do Pedido:</span>
                  <span className="text-vb-black">{orderId}</span>
                </div>
                
                {orderTotal && (
                  <div className="flex justify-between">
                    <span className="font-medium text-vb-black">Valor Total:</span>
                    <span className="text-vb-black">
                      {orderTotal.toLocaleString('pt-BR', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </span>
                  </div>
                )}
              </div>
              
              <p className="text-vb-black-light mb-6">
                Você pode acompanhar o status do seu pedido usando seu telefone ou CPF
                na página de consulta de pedidos.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
                <Button
                  asChild
                  className="bg-vb-black text-white hover:bg-vb-black-light flex-1"
                >
                  <Link to="/consulta-pedido">
                    Consultar Pedido
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                
                <Button
                  asChild
                  variant="outline"
                  className="border-vb-beige hover:bg-vb-beige/20 flex-1"
                >
                  <Link to="/">
                    Voltar para a Loja
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default CheckoutSuccess;
