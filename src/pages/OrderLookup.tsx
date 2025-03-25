
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, ShoppingBag, CheckCircle, XCircle, Clock, Package, AlertCircle, CheckCheck } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { getOrderByIdOrContact, Order, getStatusLabel } from "@/services/cartService";

const OrderLookup = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchTerm.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Digite o número do pedido, CPF ou telefone",
        variant: "destructive",
      });
      return;
    }
    
    setIsSearching(true);
    
    // Buscar o pedido
    const foundOrder = getOrderByIdOrContact(searchTerm.trim());
    
    setTimeout(() => {
      setIsSearching(false);
      
      if (foundOrder) {
        setOrder(foundOrder);
      } else {
        toast({
          title: "Pedido não encontrado",
          description: "Verifique os dados informados e tente novamente",
          variant: "destructive",
        });
      }
    }, 500);
  };
  
  // Renderizar o status com ícone correspondente
  const renderStatusBadge = (status: Order['status']) => {
    const statusConfig = {
      awaiting_confirmation: {
        icon: <AlertCircle className="h-4 w-4 mr-1" />,
        label: getStatusLabel(status),
        color: "bg-blue-100 text-blue-800",
      },
      pending: {
        icon: <Clock className="h-4 w-4 mr-1" />,
        label: getStatusLabel(status),
        color: "bg-yellow-100 text-yellow-800",
      },
      paid: {
        icon: <CheckCircle className="h-4 w-4 mr-1" />,
        label: getStatusLabel(status),
        color: "bg-green-100 text-green-800",
      },
      paid_delivered: {
        icon: <CheckCheck className="h-4 w-4 mr-1" />,
        label: getStatusLabel(status),
        color: "bg-emerald-100 text-emerald-800",
      },
      canceled: {
        icon: <XCircle className="h-4 w-4 mr-1" />,
        label: getStatusLabel(status),
        color: "bg-red-100 text-red-800",
      },
      delivered: {
        icon: <Package className="h-4 w-4 mr-1" />,
        label: getStatusLabel(status),
        color: "bg-purple-100 text-purple-800",
      },
    };
    
    const config = statusConfig[status] || statusConfig.awaiting_confirmation;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm ${config.color}`}>
        {config.icon}
        {config.label}
      </span>
    );
  };
  
  // Formatar data
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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
      <main className="container mx-auto px-4 py-24 min-h-[60vh]">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl md:text-3xl font-medium text-vb-black mb-3">
                Consultar Pedido
              </h1>
              <p className="text-vb-black-light">
                Digite o número do pedido, CPF ou telefone para consultar o status do seu pedido
              </p>
            </div>
            
            <form onSubmit={handleSearch} className="max-w-md mx-auto mb-8">
              <div className="flex gap-2">
                <Input
                  placeholder="Número do pedido, CPF ou telefone"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  type="submit" 
                  className="bg-vb-black text-white hover:bg-vb-black-light"
                  disabled={isSearching}
                >
                  {isSearching ? "Buscando..." : <Search className="h-4 w-4" />}
                </Button>
              </div>
            </form>
            
            {/* Resultado da busca */}
            {order && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="border border-vb-beige rounded-lg overflow-hidden"
              >
                <div className="bg-vb-beige/30 p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <p className="text-sm text-vb-black-light">Pedido</p>
                    <h2 className="text-lg font-medium text-vb-black">{order.id}</h2>
                  </div>
                  
                  <div>{renderStatusBadge(order.status)}</div>
                </div>
                
                <div className="p-4 md:p-6 divide-y divide-vb-beige">
                  <div className="pb-4">
                    <h3 className="font-medium text-vb-black mb-2">Informações do Pedido</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                      <div>
                        <p className="text-vb-black-light">Data do Pedido</p>
                        <p className="text-vb-black">{formatDate(order.createdAt)}</p>
                      </div>
                      <div>
                        <p className="text-vb-black-light">Método de Entrega</p>
                        <p className="text-vb-black">{order.isDelivery ? "Entrega" : "Retirada na Loja"}</p>
                      </div>
                      <div>
                        <p className="text-vb-black-light">Cliente</p>
                        <p className="text-vb-black">{order.customer.name}</p>
                      </div>
                      <div>
                        <p className="text-vb-black-light">Telefone</p>
                        <p className="text-vb-black">{order.customer.phone}</p>
                      </div>
                      {order.customer.cpf && (
                        <div>
                          <p className="text-vb-black-light">CPF</p>
                          <p className="text-vb-black">{order.customer.cpf}</p>
                        </div>
                      )}
                      {order.isDelivery && order.customer.address && (
                        <div className="md:col-span-2">
                          <p className="text-vb-black-light">Endereço de Entrega</p>
                          <p className="text-vb-black">{order.customer.address}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="py-4">
                    <h3 className="font-medium text-vb-black mb-2">Itens do Pedido</h3>
                    <div className="space-y-3">
                      {order.items.map((item) => (
                        <div key={item.product.id} className="flex gap-3">
                          <div className="w-16 h-16 bg-vb-beige/20 rounded overflow-hidden flex-shrink-0">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-vb-black">{item.product.name}</p>
                            <p className="text-sm text-vb-black-light">
                              Quantidade: {item.quantity} x {(item.product.discountPrice || item.product.price).toLocaleString('pt-BR', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-vb-black-light">Subtotal</span>
                      <span className="text-vb-black">
                        {(order.total - (order.isDelivery ? 5 : 0)).toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </span>
                    </div>
                    
                    <div className="flex justify-between mb-2">
                      <span className="text-vb-black-light">Entrega</span>
                      <span className="text-vb-black">
                        {order.isDelivery ? "R$ 5,00" : "Grátis"}
                      </span>
                    </div>
                    
                    <div className="flex justify-between pt-2 border-t border-vb-beige mt-2">
                      <span className="font-medium text-vb-black">Total</span>
                      <span className="font-medium text-vb-black">
                        {order.total.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            
            {/* Mensagem inicial quando não há busca */}
            {!order && !isSearching && (
              <div className="text-center py-10">
                <ShoppingBag className="h-16 w-16 mx-auto text-vb-beige-dark mb-4" />
                <p className="text-vb-black-light">
                  Digite o número do pedido, CPF ou telefone para consultar o status
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default OrderLookup;
