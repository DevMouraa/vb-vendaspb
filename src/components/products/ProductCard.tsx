
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice?: number;
  image: string;
  category: string;
  isBestSeller?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const { id, name, price, discountPrice, image, category, isBestSeller } = product;
  
  const formattedPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart();
    }
  };

  return (
    <div className="group relative overflow-hidden bg-white rounded-xl shadow-sm border border-vb-beige hover-lift">
      {/* Best Seller Badge */}
      {isBestSeller && (
        <div className="absolute top-2 right-2 z-10 bg-vb-black text-white text-xs font-medium px-2 py-1 rounded-full animate-pulse-subtle">
          Mais Vendido
        </div>
      )}
      
      {/* Product Image */}
      <Link to={`/produto/${id}`} className="block overflow-hidden">
        <div className="h-56 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      </Link>
      
      {/* Product Info */}
      <div className="p-4">
        <div className="mb-4">
          <span className="text-xs text-vb-black-light/70 uppercase">{category}</span>
          <Link to={`/produto/${id}`}>
            <h3 className="font-medium text-vb-black mt-1 line-clamp-2 min-h-[48px]">
              {name}
            </h3>
          </Link>
        </div>
        
        {/* Price */}
        <div className="flex items-end justify-between">
          <div className="flex flex-col">
            {discountPrice ? (
              <>
                <span className="text-sm text-vb-black-light/70 line-through">
                  {formattedPrice(price)}
                </span>
                <span className="text-lg font-medium text-vb-black">
                  {formattedPrice(discountPrice)}
                </span>
              </>
            ) : (
              <span className="text-lg font-medium text-vb-black">
                {formattedPrice(price)}
              </span>
            )}
          </div>
          
          {/* Add to Cart Button */}
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 rounded-full bg-vb-beige border-vb-beige-dark hover:bg-vb-beige-dark hover:text-vb-black transition-all"
            aria-label="Adicionar ao carrinho"
            onClick={handleAddToCart}
          >
            <ShoppingBag className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
