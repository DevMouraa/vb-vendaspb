
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Users, Package, ShoppingBag, CreditCard, 
  LogOut, Home, Settings, ChevronDown, Menu, X, 
  CheckCircle, XCircle, Clock, Truck, Search,
  AlertCircle, CheckCheck
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Order, getOrders, updateOrderStatus, saveOrders, getStatusLabel } from "@/services/cartService";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Carregar pedidos ao montar o componente
  useEffect(() => {
    const loadedOrders = getOrders();
    setOrders(loadedOrders);
    setFilteredOrders(loadedOrders);
  }, []);
  
  // Filtrar pedidos quando o termo de busca mudar
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredOrders(orders);
      return;
    }
    
    const lowerSearchTerm = searchTerm.toLowerCase();
    const filtered = orders.filter(order => 
      order.id.toLowerCase().includes(lowerSearchTerm) ||
      order.customer.name.toLowerCase().includes(lowerSearchTerm) ||
      order.customer.phone.includes(searchTerm) ||
      (order.customer.cpf && order.customer.cpf.includes(searchTerm))
    );
    
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);
  
  // Função para logout
  const handleLogout = () => {
    // Aqui limparíamos o estado de autenticação
    toast({
      title: "Logout realizado",
      description: "Você saiu do painel administrativo.",
    });
    navigate("/admin/login");
  };
  
  // Toggle do menu mobile
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  // Função para atualizar status do pedido
  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    const success = updateOrderStatus(orderId, status);
    
    if (success) {
      // Atualizar estado local
      const updatedOrders = getOrders();
      setOrders(updatedOrders);
      setFilteredOrders(
        searchTerm ? 
          updatedOrders.filter(order => 
            order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.phone.includes(searchTerm) ||
            (order.customer.cpf && order.customer.cpf.includes(searchTerm))
          ) : 
          updatedOrders
      );
      
      // Mostrar mensagem de sucesso
      toast({
        title: "Status atualizado",
        description: `O pedido ${orderId} foi atualizado para "${getStatusLabel(status)}"`,
      });
    } else {
      toast({
        title: "Erro",
        description: "Não foi possível atualizar o status do pedido",
        variant: "destructive",
      });
    }
  };
  
  // Função para limpar todos os pedidos
  const handleClearAllOrders = () => {
    if (window.confirm("Tem certeza que deseja limpar todos os pedidos? Esta ação não pode ser desfeita.")) {
      saveOrders([]);
      setOrders([]);
      setFilteredOrders([]);
      
      toast({
        title: "Pedidos limpos",
        description: "Todos os pedidos foram removidos do sistema",
      });
    }
  };
  
  // Renderizar o ícone do status
  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'awaiting_confirmation': return <AlertCircle className="h-4 w-4 text-blue-500" />;
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'paid': return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'paid_delivered': return <CheckCheck className="h-4 w-4 text-emerald-500" />;
      case 'canceled': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'delivered': return <Truck className="h-4 w-4 text-purple-500" />;
      default: return null;
    }
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
    <div className="min-h-screen bg-vb-beige/10 flex flex-col md:flex-row">
      {/* Sidebar - Mobile Toggle */}
      <div className="md:hidden bg-white border-b border-vb-beige p-4 flex justify-between items-center">
        <img
          src="/lovable-uploads/6b835a67-ce01-4ccb-b115-adb9141a398b.png"
          alt="VB Essências e Acessórios"
          className="h-10"
        />
        <Button 
          variant="ghost" 
          className="text-vb-black"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? <X /> : <Menu />}
        </Button>
      </div>
      
      {/* Sidebar - Desktop & Mobile (conditional) */}
      <aside 
        className={`bg-white fixed inset-0 z-40 md:relative md:translate-x-0 transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } w-64 md:w-64 md:min-h-screen flex flex-col border-r border-vb-beige`}
      >
        <div className="p-6 border-b border-vb-beige flex flex-col items-center">
          <img
            src="/lovable-uploads/6b835a67-ce01-4ccb-b115-adb9141a398b.png"
            alt="VB Essências e Acessórios"
            className="h-12 mb-2"
          />
          <h2 className="text-lg font-medium text-vb-black">
            Painel Administrativo
          </h2>
        </div>
        
        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <button
                className={`w-full flex items-center p-3 rounded-md transition-colors ${
                  activeTab === 'dashboard' 
                    ? 'bg-vb-beige text-vb-black' 
                    : 'text-vb-black-light hover:bg-vb-beige/50'
                }`}
                onClick={() => setActiveTab('dashboard')}
              >
                <Home className="h-5 w-5 mr-3" />
                <span>Dashboard</span>
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center p-3 rounded-md transition-colors ${
                  activeTab === 'products' 
                    ? 'bg-vb-beige text-vb-black' 
                    : 'text-vb-black-light hover:bg-vb-beige/50'
                }`}
                onClick={() => setActiveTab('products')}
              >
                <Package className="h-5 w-5 mr-3" />
                <span>Produtos</span>
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center p-3 rounded-md transition-colors ${
                  activeTab === 'orders' 
                    ? 'bg-vb-beige text-vb-black' 
                    : 'text-vb-black-light hover:bg-vb-beige/50'
                }`}
                onClick={() => setActiveTab('orders')}
              >
                <ShoppingBag className="h-5 w-5 mr-3" />
                <span>Pedidos</span>
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center p-3 rounded-md transition-colors ${
                  activeTab === 'customers' 
                    ? 'bg-vb-beige text-vb-black' 
                    : 'text-vb-black-light hover:bg-vb-beige/50'
                }`}
                onClick={() => setActiveTab('customers')}
              >
                <Users className="h-5 w-5 mr-3" />
                <span>Clientes</span>
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center p-3 rounded-md transition-colors ${
                  activeTab === 'transactions' 
                    ? 'bg-vb-beige text-vb-black' 
                    : 'text-vb-black-light hover:bg-vb-beige/50'
                }`}
                onClick={() => setActiveTab('transactions')}
              >
                <CreditCard className="h-5 w-5 mr-3" />
                <span>Pagamentos</span>
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center p-3 rounded-md transition-colors ${
                  activeTab === 'settings' 
                    ? 'bg-vb-beige text-vb-black' 
                    : 'text-vb-black-light hover:bg-vb-beige/50'
                }`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="h-5 w-5 mr-3" />
                <span>Configurações</span>
              </button>
            </li>
          </ul>
        </nav>
        
        <div className="p-4 border-t border-vb-beige">
          <Button
            className="w-full bg-white text-vb-black hover:bg-vb-beige flex items-center justify-center"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            <span>Sair</span>
          </Button>
        </div>
      </aside>
      
      {/* Mobile overlay when sidebar is open */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-30"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Top Bar */}
          <header className="bg-white rounded-xl shadow-sm p-4 mb-6 flex justify-between items-center">
            <h1 className="text-xl font-medium text-vb-black">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'products' && 'Gerenciar Produtos'}
              {activeTab === 'orders' && 'Gerenciar Pedidos'}
              {activeTab === 'customers' && 'Clientes'}
              {activeTab === 'transactions' && 'Pagamentos'}
              {activeTab === 'settings' && 'Configurações'}
            </h1>
            <div className="flex items-center">
              <div className="relative">
                <Button variant="ghost" className="text-vb-black flex items-center">
                  <div className="w-8 h-8 bg-vb-beige rounded-full flex items-center justify-center mr-2">
                    <span className="text-vb-black font-medium">A</span>
                  </div>
                  <span className="mr-1">Admin</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>
          
          {/* Dashboard Content */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="bg-vb-beige/30 p-3 rounded-full mr-4">
                      <Package className="h-6 w-6 text-vb-black" />
                    </div>
                    <div>
                      <h3 className="text-sm text-vb-black-light">Total de Produtos</h3>
                      <p className="text-2xl font-medium text-vb-black">142</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="bg-vb-beige/30 p-3 rounded-full mr-4">
                      <ShoppingBag className="h-6 w-6 text-vb-black" />
                    </div>
                    <div>
                      <h3 className="text-sm text-vb-black-light">Pedidos Pendentes</h3>
                      <p className="text-2xl font-medium text-vb-black">
                        {orders.filter(order => order.status === 'pending').length}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="bg-vb-beige/30 p-3 rounded-full mr-4">
                      <Users className="h-6 w-6 text-vb-black" />
                    </div>
                    <div>
                      <h3 className="text-sm text-vb-black-light">Total de Clientes</h3>
                      <p className="text-2xl font-medium text-vb-black">
                        {/* Contagem única de clientes por telefone */}
                        {new Set(orders.map(order => order.customer.phone)).size}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <div className="flex items-center">
                    <div className="bg-vb-beige/30 p-3 rounded-full mr-4">
                      <CreditCard className="h-6 w-6 text-vb-black" />
                    </div>
                    <div>
                      <h3 className="text-sm text-vb-black-light">Vendas (Total)</h3>
                      <p className="text-2xl font-medium text-vb-black">
                        {orders
                          .filter(order => order.status === 'paid' || order.status === 'delivered')
                          .reduce((total, order) => total + order.total, 0)
                          .toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Conteúdo de Pedidos */}
            {activeTab === 'orders' && (
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-4 border-b border-vb-beige">
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-vb-black-light h-4 w-4" />
                      <Input
                        placeholder="Buscar por ID, nome, telefone ou CPF..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <Button
                      variant="destructive"
                      className="whitespace-nowrap"
                      onClick={handleClearAllOrders}
                    >
                      Limpar Todos Pedidos
                    </Button>
                  </div>
                </div>
                
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Pedido</TableHead>
                        <TableHead>Cliente</TableHead>
                        <TableHead>Data</TableHead>
                        <TableHead>Entrega</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Ações</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredOrders.length > 0 ? (
                        filteredOrders.map((order) => (
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>
                              <div>
                                {order.customer.name}
                                <div className="text-xs text-vb-black-light">{order.customer.phone}</div>
                              </div>
                            </TableCell>
                            <TableCell>{formatDate(order.createdAt)}</TableCell>
                            <TableCell>{order.isDelivery ? "Entrega" : "Retirada"}</TableCell>
                            <TableCell>
                              {order.total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {getStatusIcon(order.status)}
                                <span className="text-sm">{getStatusLabel(order.status)}</span>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Abrir menu</span>
                                    <ChevronDown className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Atualizar Status</DropdownMenuLabel>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem 
                                    onClick={() => handleUpdateOrderStatus(order.id, 'awaiting_confirmation')}
                                    className="flex items-center gap-2"
                                  >
                                    <AlertCircle className="h-4 w-4" />
                                    <span>Aguardando Confirmação</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleUpdateOrderStatus(order.id, 'pending')}
                                    className="flex items-center gap-2"
                                  >
                                    <Clock className="h-4 w-4" />
                                    <span>Aguardando Pagamento</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleUpdateOrderStatus(order.id, 'paid')}
                                    className="flex items-center gap-2"
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                    <span>Confirmar Pagamento</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleUpdateOrderStatus(order.id, 'delivered')}
                                    className="flex items-center gap-2"
                                  >
                                    <Truck className="h-4 w-4" />
                                    <span>Marcar como Entregue</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleUpdateOrderStatus(order.id, 'paid_delivered')}
                                    className="flex items-center gap-2"
                                  >
                                    <CheckCheck className="h-4 w-4" />
                                    <span>Pago e Entregue</span>
                                  </DropdownMenuItem>
                                  <DropdownMenuItem 
                                    onClick={() => handleUpdateOrderStatus(order.id, 'canceled')}
                                    className="flex items-center gap-2 text-red-500"
                                  >
                                    <XCircle className="h-4 w-4" />
                                    <span>Cancelar Pedido</span>
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={7} className="h-24 text-center">
                            Nenhum pedido encontrado.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </div>
              </div>
            )}
            
            {/* Placeholder para outras abas */}
            {(activeTab === 'products' || activeTab === 'customers' || activeTab === 'transactions' || activeTab === 'settings') && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-medium text-vb-black mb-4">
                  Funcionalidade em Desenvolvimento
                </h2>
                <p className="text-vb-black-light">
                  Esta área está sendo implementada. Em breve estará disponível.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
