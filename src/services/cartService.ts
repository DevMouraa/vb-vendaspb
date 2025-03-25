
import { Product } from "@/components/products/ProductCard";

// Interface para itens do carrinho
export interface CartItem {
  product: Product;
  quantity: number;
}

// Interface para o pedido
export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'awaiting_confirmation' | 'paid' | 'paid_delivered' | 'canceled' | 'delivered';
  customer: {
    name: string;
    phone: string;
    cpf?: string;
    address?: string;
  };
  isDelivery: boolean;
  createdAt: string;
  updatedAt: string;
}

// Chaves para o localStorage
const CART_STORAGE_KEY = 'vb_cart';
const ORDERS_STORAGE_KEY = 'vb_orders';

// Evento personalizado para atualização do carrinho
const dispatchCartUpdateEvent = () => {
  window.dispatchEvent(new Event('cartUpdated'));
};

// Funções para manipulação do carrinho
export const getCart = (): CartItem[] => {
  const cartData = localStorage.getItem(CART_STORAGE_KEY);
  return cartData ? JSON.parse(cartData) : [];
};

export const saveCart = (cart: CartItem[]): void => {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  dispatchCartUpdateEvent();
};

export const addToCart = (product: Product, quantity: number = 1): void => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.product.id === product.id);

  if (existingItemIndex >= 0) {
    // Atualiza a quantidade se o produto já existe no carrinho
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Adiciona um novo item ao carrinho
    cart.push({ product, quantity });
  }

  saveCart(cart);
};

export const updateQuantity = (productId: string, quantity: number): void => {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.product.id === productId);

  if (itemIndex >= 0) {
    cart[itemIndex].quantity = Math.max(1, Math.min(quantity, 10)); // Limita entre 1 e 10
    saveCart(cart);
  }
};

export const removeFromCart = (productId: string): void => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.product.id !== productId);
  saveCart(updatedCart);
};

export const clearCart = (): void => {
  localStorage.removeItem(CART_STORAGE_KEY);
  dispatchCartUpdateEvent();
};

export const calculateSubtotal = (cart: CartItem[]): number => {
  return cart.reduce((total, item) => {
    const price = item.product.discountPrice || item.product.price;
    return total + (price * item.quantity);
  }, 0);
};

// Funções para gerenciamento de pedidos
export const getOrders = (): Order[] => {
  const ordersData = localStorage.getItem(ORDERS_STORAGE_KEY);
  return ordersData ? JSON.parse(ordersData) : [];
};

export const saveOrders = (orders: Order[]): void => {
  localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
};

export const createOrder = (cart: CartItem[], customer: Order['customer'], isDelivery: boolean): Order => {
  const orders = getOrders();
  const now = new Date().toISOString();
  
  // Gerar ID único para o pedido (formato: VB-YYYYMMDD-XXXX)
  const datePart = now.slice(0, 10).replace(/-/g, '');
  const randomPart = Math.floor(1000 + Math.random() * 9000).toString();
  const orderId = `VB-${datePart}-${randomPart}`;
  
  const newOrder: Order = {
    id: orderId,
    items: [...cart],
    total: calculateSubtotal(cart) + (isDelivery ? 5 : 0),
    status: 'awaiting_confirmation',
    customer,
    isDelivery,
    createdAt: now,
    updatedAt: now
  };
  
  orders.push(newOrder);
  saveOrders(orders);
  
  // Limpar o carrinho após criar o pedido
  clearCart();
  
  return newOrder;
};

export const getOrderByIdOrContact = (
  search: string
): Order | undefined => {
  const orders = getOrders();
  return orders.find(
    order => 
      order.id === search || 
      order.customer.phone === search || 
      (order.customer.cpf && order.customer.cpf === search)
  );
};

export const updateOrderStatus = (
  orderId: string, 
  status: Order['status']
): boolean => {
  const orders = getOrders();
  const orderIndex = orders.findIndex(order => order.id === orderId);
  
  if (orderIndex >= 0) {
    orders[orderIndex].status = status;
    orders[orderIndex].updatedAt = new Date().toISOString();
    saveOrders(orders);
    return true;
  }
  
  return false;
};

// Função para obter o label de um status
export const getStatusLabel = (status: Order['status']): string => {
  switch (status) {
    case 'awaiting_confirmation': return "Aguardando Confirmação";
    case 'pending': return "Aguardando Pagamento";
    case 'paid': return "Pago";
    case 'paid_delivered': return "Pago e Entregue";
    case 'canceled': return "Cancelado";
    case 'delivered': return "Entregue";
    default: return status;
  }
};
