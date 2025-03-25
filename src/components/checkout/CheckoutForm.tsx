
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { CartItem, createOrder } from "@/services/cartService";

// Esquema de validação com Zod
const formSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  phone: z.string().min(11, "Telefone deve ter pelo menos 11 números (com DDD)"),
  cpf: z.string().min(11, "CPF deve ter 11 números").optional(),
  address: z.string().min(5, "Endereço necessário para entrega").optional(),
});

interface CheckoutFormProps {
  cartItems: CartItem[];
  isDelivery: boolean;
  total: number;
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({ 
  cartItems, 
  isDelivery, 
  total 
}) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  
  // Inicializar formulário com react-hook-form e zod
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      cpf: "",
      address: isDelivery ? "" : undefined,
    },
  });
  
  // Validar o endereço apenas se for entrega
  React.useEffect(() => {
    if (isDelivery) {
      form.register("address", { required: "Endereço é necessário para entrega" });
    }
  }, [isDelivery, form]);

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    try {
      // Criar pedido e salvar no localStorage
      const order = createOrder(cartItems, {
        name: data.name,
        phone: data.phone,
        cpf: data.cpf,
        address: data.address,
      }, isDelivery);
      
      // Enviar mensagem de sucesso
      toast({
        title: "Pedido realizado com sucesso!",
        description: `Seu número de pedido é: ${order.id}`,
        duration: 5000,
      });
      
      // Redirecionar para a página inicial ou de confirmação
      navigate("/checkout-success", { 
        state: { 
          orderId: order.id,
          orderTotal: total,
        } 
      });
    } catch (error) {
      toast({
        title: "Erro ao finalizar pedido",
        description: "Ocorreu um erro ao processar seu pedido. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-medium text-vb-black mb-6">Informações do Cliente</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome Completo*</FormLabel>
                <FormControl>
                  <Input placeholder="Digite seu nome completo" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone com DDD*</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="(00) 00000-0000" 
                    {...field} 
                    type="tel"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormItem>
                <FormLabel>CPF (opcional)</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="Digite seu CPF" 
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {isDelivery && (
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço de Entrega*</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Digite seu endereço completo" 
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
          
          <div className="pt-4 border-t border-vb-beige">
            <div className="flex justify-between mb-4">
              <span className="text-lg font-medium text-vb-black">Total do Pedido:</span>
              <span className="text-lg font-medium text-vb-black">
                {total.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </div>
            
            <Button 
              type="submit" 
              className="w-full bg-vb-black text-white hover:bg-vb-black-light py-6"
            >
              Confirmar Pedido
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CheckoutForm;
