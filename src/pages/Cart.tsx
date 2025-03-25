
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ShoppingBag, Trash2, Plus, Minus, ArrowLeft, Truck, Store } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CartItem, getCart, updateQuantity, removeFromCart, calculateSubtotal } from "@/services/cartService";
import CheckoutForm from "@/components/checkout/CheckoutForm";

const Cart = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isDelivery, setIsDelivery] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  
  // Carregar carrinho do localStorage
  useEffect(() => {
    setCartItems(getCart());
  }, []);
  
  // Funções para manipular o carrinho
  const handleUpdateQuantity = (productId: string, increment: boolean) => {
    const item = cartItems.find(item => item.product.id === productId);
    if (item) {
      const newQuantity = increment 
        ? Math.min(item.quantity + 1, 10)  // Máximo 10
        : Math.max(item.quantity - 1, 1);  // Mínimo 1
      
      updateQuantity(productId, newQuantity);
      setCartItems(getCart());
    }
  };
  
  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
    setCartItems(getCart());
    
    toast({
      title: "Item removido",
      description: "O produto foi removido do seu carrinho.",
      duration: 3000,
    });
  };
  
  const handleCheckout = () => {
    setIsCheckout(true);
  };
  
  // Cálculos
  const deliveryFee = isDelivery ? 5 : 0;
  
  const formatPrice = (price: number) => {
    return price.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };
  
  const subtotal = calculateSubtotal(cartItems);
  const total = subtotal + deliveryFee;

  // Voltar do checkout para o carrinho
  const handleBackToCart = () => {
    setIsCheckout(false);
  };

  // Renderização condicional para checkout
  if (isCheckout) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
        <main className="container mx-auto px-4 py-24 min-h-[60vh]">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6 flex items-center">
              <Button 
                variant="ghost" 
                className="text-vb-black hover:text-vb-black-light p-0 mr-3"
                onClick={handleBackToCart}
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
              </Button>
              <h1 className="text-2xl md:text-3xl font-medium text-vb-black">Finalizar Pedido</h1>
            </div>
            
            <CheckoutForm 
              cartItems={cartItems} 
              isDelivery={isDelivery}
              total={total}
            />
          </div>
        </main>
        <Footer />
      </motion.div>
    );
  }

  // Renderização condicional para carrinho vazio
  if (cartItems.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header />
        <main className="container mx-auto px-4 py-24 min-h-[60vh]">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="flex flex-col items-center justify-center py-10">
              <ShoppingBag className="h-16 w-16 text-vb-beige-dark mb-4" />
              <h2 className="text-2xl font-medium text-vb-black mb-4">Seu carrinho está vazio</h2>
              <p className="text-vb-black-light mb-8">Adicione produtos ao seu carrinho para continuar comprando.</p>
              <Button 
                asChild
                className="bg-vb-black text-white hover:bg-vb-black-light"
              >
                <Link to="/produtos">
                  Ver Produtos
                </Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </motion.div>
    );
  }

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
          <div className="mb-6 flex items-center">
            <Button 
              variant="ghost" 
              className="text-vb-black hover:text-vb-black-light p-0 mr-3"
              onClick={() => navigate(-1)}
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
            </Button>
            <h1 className="text-2xl md:text-3xl font-medium text-vb-black">Seu Carrinho</h1>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Lista de Produtos */}
            <div className="w-full lg:w-8/12">
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="divide-y divide-vb-beige-dark">
                  {cartItems.map((item) => (
                    <div key={item.product.id} className="p-4 md:p-6">
                      <div className="flex flex-col sm:flex-row">
                        {/* Imagem do Produto */}
                        <div className="sm:w-24 md:w-32 flex-shrink-0 mb-4 sm:mb-0">
                          <Link to={`/produto/${item.product.id}`}>
                            <img 
                              src={item.product.image} 
                              alt={item.product.name}
                              className="w-full h-auto rounded-md object-cover"
                            />
                          </Link>
                        </div>
                        
                        {/* Detalhes do Produto */}
                        <div className="flex-grow sm:ml-6">
                          <div className="flex flex-col md:flex-row md:justify-between">
                            <div>
                              <Link to={`/produto/${item.product.id}`} className="hover:underline">
                                <h3 className="text-lg font-medium text-vb-black">{item.product.name}</h3>
                              </Link>
                              <p className="text-sm text-vb-black-light mb-2">{item.product.category}</p>
                              
                              <div className="flex items-center mt-2 md:mt-4">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-md bg-vb-beige border-vb-beige-dark"
                                  onClick={() => handleUpdateQuantity(item.product.id, false)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="mx-3 w-6 text-center">
                                  {item.quantity}
                                </span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8 rounded-md bg-vb-beige border-vb-beige-dark"
                                  onClick={() => handleUpdateQuantity(item.product.id, true)}
                                  disabled={item.quantity >= 10}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            
                            <div className="flex flex-col items-end mt-4 md:mt-0">
                              <div className="flex items-center mb-2">
                                {item.product.discountPrice ? (
                                  <>
                                    <span className="text-sm text-vb-black-light/70 line-through mr-2">
                                      {formatPrice(item.product.price)}
                                    </span>
                                    <span className="text-lg font-medium text-vb-black">
                                      {formatPrice(item.product.discountPrice)}
                                    </span>
                                  </>
                                ) : (
                                  <span className="text-lg font-medium text-vb-black">
                                    {formatPrice(item.product.price)}
                                  </span>
                                )}
                              </div>
                              
                              <div className="text-sm text-vb-black-light">
                                Subtotal: {formatPrice((item.product.discountPrice || item.product.price) * item.quantity)}
                              </div>
                              
                              <Button
                                variant="ghost"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50 mt-2 p-1"
                                onClick={() => handleRemoveItem(item.product.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="ml-1 text-xs">Remover</span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Resumo do Pedido */}
            <div className="w-full lg:w-4/12">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-medium text-vb-black mb-6">Resumo do Pedido</h2>
                
                <div className="space-y-6">
                  {/* Opções de Entrega */}
                  <div>
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
                  
                  {/* Cálculos */}
                  <div className="pt-4 border-t border-vb-beige-dark">
                    <div className="flex justify-between mb-2">
                      <span className="text-vb-black-light">Subtotal</span>
                      <span className="text-vb-black">{formatPrice(subtotal)}</span>
                    </div>
                    
                    <div className="flex justify-between mb-2">
                      <span className="text-vb-black-light">Entrega</span>
                      <span className="text-vb-black">{isDelivery ? "R$ 5,00" : "Grátis"}</span>
                    </div>
                    
                    <div className="flex justify-between pt-4 border-t border-vb-beige mt-4">
                      <span className="text-lg font-medium text-vb-black">Total</span>
                      <span className="text-lg font-medium text-vb-black">{formatPrice(total)}</span>
                    </div>
                  </div>
                  
                  {/* Botão Finalizar Compra */}
                  <Button
                    className="w-full bg-vb-black text-white hover:bg-vb-black-light py-6"
                    onClick={handleCheckout}
                  >
                    Finalizar Compra
                  </Button>
                  
                  {/* Link para continuar comprando */}
                  <div className="text-center">
                    <Link 
                      to="/produtos" 
                      className="text-vb-black hover:text-vb-black-light text-sm underline"
                    >
                      Continuar comprando
                    </Link>
                  </div>
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

export default Cart;
