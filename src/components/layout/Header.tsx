
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Search, ShoppingBag, Instagram, Phone, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { getCart } from "@/services/cartService";

const menuItems = [
  { name: "Início", path: "/" },
  { name: "Perfumes (M)", path: "/categoria/perfumes-masculinos" },
  { name: "Perfumes (F)", path: "/categoria/perfumes-femininos" },
  { name: "Hidratantes", path: "/categoria/hidratantes" },
  { name: "Shampoos", path: "/categoria/shampoos" },
  { name: "Joias", path: "/categoria/joias" },
  { name: "Contato", path: "/contato" },
];

const Header = () => {
  const [searchValue, setSearchValue] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const isMobile = useIsMobile();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get real cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const cart = getCart();
      setCartCount(cart.length);
    };
    
    // Update cart count on mount
    updateCartCount();
    
    // Listen for storage events to update cart count when it changes
    window.addEventListener('storage', updateCartCount);
    
    // Set up custom event listener for cart updates
    const handleCartUpdate = () => updateCartCount();
    window.addEventListener('cartUpdated', handleCartUpdate);
    
    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchValue.trim()) {
      window.location.href = `/busca?q=${encodeURIComponent(searchValue)}`;
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-vb-beige/95 backdrop-blur-sm shadow-md py-2"
          : "bg-vb-beige py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center transition-transform duration-300 hover:scale-105"
          >
            <img
              src="/lovable-uploads/6b835a67-ce01-4ccb-b115-adb9141a398b.png"
              alt="VB Essências e Acessórios"
              className="h-12 md:h-14"
            />
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-6">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-vb-black font-medium transition-all duration-300 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-vb-black after:origin-center after:scale-x-0 after:transition-transform hover:after:scale-x-100"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          )}

          {/* Search, Cart, and Mobile Menu */}
          <div className="flex items-center space-x-3">
            {/* Search Form */}
            <form onSubmit={handleSearch} className="relative hidden md:block">
              <Input
                type="search"
                placeholder="Buscar produtos..."
                className="w-40 lg:w-60 pl-8 pr-2 py-1 text-sm bg-vb-beige-light border-vb-beige-dark focus:border-vb-black-light"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-vb-black-light" />
            </form>

            {/* Social Media Links */}
            <div className="hidden md:flex space-x-3 items-center">
              <a 
                href="https://wa.me/5583988095530" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-vb-black hover:text-vb-black-light transition-colors"
                aria-label="WhatsApp"
              >
                <Phone size={20} />
              </a>
              <a 
                href="https://instagram.com/vb.eacessorios" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-vb-black hover:text-vb-black-light transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
            </div>

            {/* Admin Link */}
            <Link 
              to="/admin/login" 
              className="text-vb-black hover:text-vb-black-light transition-colors p-2"
              aria-label="Área Administrativa"
            >
              <User size={22} />
            </Link>

            {/* Cart Icon with Count */}
            <Link 
              to="/carrinho" 
              className="relative p-2 text-vb-black hover:text-vb-black-light transition-colors"
              aria-label="Carrinho de compras"
            >
              <ShoppingBag size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-vb-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-fade-in">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu */}
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="text-vb-black hover:text-vb-black-light hover:bg-transparent"
                  >
                    <Menu size={24} />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="bg-vb-beige-light border-l border-vb-beige-dark w-full max-w-[280px] sm:max-w-[350px]">
                  <div className="flex flex-col h-full">
                    <div className="py-6">
                      <img
                        src="/lovable-uploads/6b835a67-ce01-4ccb-b115-adb9141a398b.png"
                        alt="VB Essências e Acessórios"
                        className="h-12 mx-auto mb-6"
                      />
                      
                      {/* Mobile Search */}
                      <form onSubmit={handleSearch} className="relative mb-6">
                        <Input
                          type="search"
                          placeholder="Buscar produtos..."
                          className="w-full pl-8 pr-2 py-1 text-sm bg-white/80 border-vb-beige-dark focus:border-vb-black"
                          value={searchValue}
                          onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-vb-black-light" />
                      </form>
                      
                      {/* Menu Items */}
                      <nav className="flex flex-col space-y-4">
                        {menuItems.map((item) => (
                          <Link
                            key={item.name}
                            to={item.path}
                            className="text-vb-black font-medium py-2 px-3 hover:bg-vb-beige/50 rounded-md transition-colors"
                          >
                            {item.name}
                          </Link>
                        ))}
                        <Link
                          to="/admin/login"
                          className="text-vb-black font-medium py-2 px-3 hover:bg-vb-beige/50 rounded-md transition-colors flex items-center"
                        >
                          <User size={18} className="mr-2" />
                          Área Administrativa
                        </Link>
                      </nav>
                    </div>
                    
                    {/* Social Links in Mobile Menu */}
                    <div className="mt-auto border-t border-vb-beige-dark pt-4 flex justify-center space-x-6 pb-6">
                      <a 
                        href="https://wa.me/5583988095530" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-vb-black p-2 hover:bg-vb-beige/50 rounded-full transition-colors"
                        aria-label="WhatsApp"
                      >
                        <Phone size={20} />
                      </a>
                      <a 
                        href="https://instagram.com/vb.eacessorios" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-vb-black p-2 hover:bg-vb-beige/50 rounded-full transition-colors"
                        aria-label="Instagram"
                      >
                        <Instagram size={20} />
                      </a>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
