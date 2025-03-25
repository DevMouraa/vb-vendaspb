
import React, { useState } from "react";
import { Link, useParams, useNavigate, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Minus, Plus, Store, Truck, Check } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { sampleProducts } from "@/data/sampleProducts";
import { addToCart } from "@/services/cartService";

const ProductDetail = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Encontrar o produto pelo ID
  const product = sampleProducts.find(p => p.id === productId);
  
  const [quantity, setQuantity] = useState(1);
  const [isDelivery, setIsDelivery] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  
  // Redirecionar para página 404 se o produto não existir
  if (!product) {
    return <Navigate to="/404" replace />;
  }
  
  // Atualizar quantidade
  const updateQuantity = (increment: boolean) => {
    setQuantity(prev => {
      if (increment) {
        return Math.min(prev + 1, 10); // Máximo 10
      } else {
        return Math.max(prev - 1, 1); // Mínimo 1
      }
    });
  };
  
  // Adicionar ao carrinho
  const handleAddToCart = () => {
    addToCart(product, quantity);
    
    // Animação de adicionado
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
    
    // Notificação
    toast({
      title: "Produto adicionado",
      description: `${product.name} foi adicionado ao seu carrinho.`,
      duration: 3000,
    });
  };
  
  // Formatar preço
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-6xl mx-auto">
          {/* Botão Voltar */}
          <Button 
            variant="ghost" 
            className="text-vb-black hover:text-vb-black-light p-0 mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            <span>Voltar</span>
          </Button>
          
          <div className="flex flex-col md:flex-row gap-8">
            {/* Imagem do Produto */}
            <div className="w-full md:w-1/2">
              <div className="bg-white rounded-xl shadow-sm p-4 md:p-8">
                <div className="aspect-square overflow-hidden rounded-lg">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            
            {/* Detalhes do Produto */}
            <div className="w-full md:w-1/2">
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                {/* Categoria */}
                <div className="mb-2">
                  <Link 
                    to={`/categoria/${product.category.toLowerCase().replace(/ /g, '-')}`}
                    className="text-sm text-vb-black-light hover:underline"
                  >
                    {product.category}
                  </Link>
                </div>
                
                {/* Nome do Produto */}
                <h1 className="text-2xl md:text-3xl font-medium text-vb-black mb-4">
                  {product.name}
                </h1>
                
                {/* Preço */}
                <div className="mb-6">
                  {product.discountPrice ? (
                    <div className="flex items-center">
                      <span className="text-xl md:text-2xl font-medium text-vb-black mr-3">
                        {formatPrice(product.discountPrice)}
                      </span>
                      <span className="text-sm md:text-base text-vb-black-light/70 line-through">
                        {formatPrice(product.price)}
                      </span>
                    </div>
                  ) : (
                    <div className="text-xl md:text-2xl font-medium text-vb-black">
                      {formatPrice(product.price)}
                    </div>
                  )}
                </div>
                
                {/* Descrição */}
                <div className="mb-8">
                  <p className="text-vb-black-light">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisis, 
                    sem eget interdum faucibus, eros nisi fringilla nisi, id efficitur nunc 
                    ipsum vel justo.
                  </p>
                </div>
                
                {/* Quantidade */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-vb-black mb-2">Quantidade:</h3>
                  <div className="flex items-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-md bg-vb-beige border-vb-beige-dark"
                      onClick={() => updateQuantity(false)}
                      disabled={quantity <= 1}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="mx-4 w-8 text-center text-lg">
                      {quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-md bg-vb-beige border-vb-beige-dark"
                      onClick={() => updateQuantity(true)}
                      disabled={quantity >= 10}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                
                {/* Opções de Entrega */}
                <div className="mb-8">
                  <h3 className="text-sm font-medium text-vb-black mb-3">Opções de Entrega:</h3>
                  <div className="space-y-3">
                    <div 
                      className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${!isDelivery ? 'border-vb-black bg-vb-beige/20' : 'border-vb-beige-dark'}`}
                      onClick={() => setIsDelivery(false)}
                    >
                      <Store className="h-5 w-5 text-vb-black-light mr-3" />
                      <div>
                        <div className="font-medium text-vb-black">Retirada na Loja</div>
                        <div className="text-sm text-vb-black-light">Grátis</div>
                      </div>
                    </div>
                    
                    <div 
                      className={`flex items-center p-3 border rounded-md cursor-pointer transition-colors ${isDelivery ? 'border-vb-black bg-vb-beige/20' : 'border-vb-beige-dark'}`}
                      onClick={() => setIsDelivery(true)}
                    >
                      <Truck className="h-5 w-5 text-vb-black-light mr-3" />
                      <div>
                        <div className="font-medium text-vb-black">Entrega</div>
                        <div className="text-sm text-vb-black-light">+R$ 5,00</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Botão Adicionar ao Carrinho */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    className={`flex-1 py-6 ${
                      addedToCart 
                        ? 'bg-green-600 hover:bg-green-700' 
                        : 'bg-vb-black hover:bg-vb-black-light'
                    } text-white`}
                    onClick={handleAddToCart}
                  >
                    {addedToCart ? (
                      <>
                        <Check className="mr-2 h-5 w-5" />
                        Adicionado ao Carrinho
                      </>
                    ) : (
                      'Adicionar ao Carrinho'
                    )}
                  </Button>
                  
                  <Button
                    asChild
                    variant="outline"
                    className="flex-1 py-6 border-vb-beige hover:bg-vb-beige/20"
                  >
                    <Link to="/carrinho">
                      Ver Carrinho
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default ProductDetail;
