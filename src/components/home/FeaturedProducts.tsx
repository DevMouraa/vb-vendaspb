
import React from "react";
import ProductGrid from "../products/ProductGrid";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { sampleProducts } from "@/data/sampleProducts";

const FeaturedProducts = () => {
  return (
    <section className="py-16 px-4 bg-vb-beige/10">
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-3 py-1 bg-vb-beige text-vb-black-light text-sm rounded-full mb-3">
            Destaque
          </span>
          <h2 className="text-3xl font-medium text-vb-black">Produtos em Destaque</h2>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <ProductGrid products={sampleProducts} />
        </motion.div>
        
        <motion.div 
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Button 
            asChild
            className="bg-vb-black text-white hover:bg-vb-black-light"
            size="lg"
          >
            <Link to="/produtos">
              Ver Todos os Produtos
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
