
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const AdminLogin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulação de validação básica
    if (!username.trim() || !password.trim()) {
      toast({
        title: "Erro",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulação de autenticação (substituir por sistema real)
    setLoading(true);
    
    // Credenciais simuladas
    const isValid = username === "admin" && password === "admin123";
    
    setTimeout(() => {
      setLoading(false);
      
      if (isValid) {
        toast({
          title: "Login realizado com sucesso!",
          description: "Bem-vindo(a) ao painel administrativo.",
        });
        navigate("/admin/dashboard");
      } else {
        toast({
          title: "Erro de autenticação",
          description: "Usuário ou senha incorretos.",
          variant: "destructive",
        });
      }
    }, 1000);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-vb-beige/20 px-4"
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <img
              src="/lovable-uploads/6b835a67-ce01-4ccb-b115-adb9141a398b.png"
              alt="VB Essências e Acessórios"
              className="h-16 mx-auto mb-4"
            />
          </Link>
          <h1 className="text-2xl font-bold text-vb-black">
            Área Administrativa
          </h1>
          <p className="text-vb-black-light mt-2">
            Acesso restrito para administradores
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex justify-center mb-6">
            <div className="bg-vb-beige p-3 rounded-full">
              <Lock className="h-6 w-6 text-vb-black" />
            </div>
          </div>
          
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div>
                <label htmlFor="username" className="block text-sm font-medium text-vb-black mb-1">
                  Usuário
                </label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Digite seu usuário"
                  className="bg-vb-beige/20 border-vb-beige-dark"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-vb-black mb-1">
                  Senha
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Digite sua senha"
                    className="bg-vb-beige/20 border-vb-beige-dark pr-10"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-vb-black-light"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-vb-black text-white hover:bg-vb-black-light"
                disabled={loading}
              >
                {loading ? "Verificando..." : "Entrar"}
              </Button>
            </div>
          </form>
          
          <div className="mt-6 pt-4 border-t border-vb-beige text-center">
            <p className="text-vb-black-light text-sm">
              Área restrita. Clientes, por favor
              <Link to="/" className="text-vb-black underline ml-1">
                voltar para a loja
              </Link>
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AdminLogin;
