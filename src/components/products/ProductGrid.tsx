
import React from "react";
import ProductCard, { Product } from "./ProductCard";
import { useToast } from "@/hooks/use-toast";

interface ProductGridProps {
  products: Product[];
  title?: string;
}

const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    // Aqui você implementaria a lógica de adicionar ao carrinho
    // Esta é apenas uma simulação para mostrar o toast
    
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
      duration: 3000,
    });
  };

  if (!products.length) {
    return (
      <div className="py-8 text-center">
        <p className="text-vb-black-light">Nenhum produto encontrado.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {title && (
        <h2 className="text-2xl font-medium text-vb-black mb-6">{title}</h2>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={() => handleAddToCart(product)} 
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
