
import React from "react";
import { Truck, CreditCard, Clock, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Truck className="h-8 w-8" />,
    title: "Entrega Rápida",
    description: "Receba seus produtos em Cabedelo no mesmo dia ou retire na loja física."
  },
  {
    icon: <CreditCard className="h-8 w-8" />,
    title: "Pagamento Seguro",
    description: "Diversas formas de pagamento incluindo PIX e dinheiro na entrega."
  },
  {
    icon: <Clock className="h-8 w-8" />,
    title: "30 Anos de Tradição",
    description: "Experiência e qualidade garantida em todos os nossos produtos."
  },
  {
    icon: <ShieldCheck className="h-8 w-8" />,
    title: "Produtos Garantidos",
    description: "Todos os nossos produtos possuem garantia de qualidade assegurada."
  }
];

const FeatureHighlights = () => {
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm border border-vb-beige hover-lift"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="p-3 bg-vb-beige rounded-full mb-4 text-vb-black">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium text-vb-black mb-2">
                {feature.title}
              </h3>
              <p className="text-vb-black-light/80 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
