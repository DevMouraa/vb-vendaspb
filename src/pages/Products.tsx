
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Filter, ChevronUp, ChevronDown } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { sampleProducts } from "@/data/sampleProducts";

// Categorias disponíveis
const categories = [
  { id: "all", name: "Todos os Produtos" },
  { id: "perfumes-masculinos", name: "Perfumes Masculinos" },
  { id: "perfumes-femininos", name: "Perfumes Femininos" },
  { id: "hidratantes", name: "Hidratantes" },
  { id: "shampoos", name: "Shampoos" },
  { id: "joias", name: "Joias" },
];

// Opções de ordenação
const sortOptions = [
  { id: "newest", name: "Mais Recentes" },
  { id: "price-asc", name: "Preço: Menor para Maior" },
  { id: "price-desc", name: "Preço: Maior para Menor" },
  { id: "best-sellers", name: "Mais Vendidos" },
];

const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [filtersOpen, setFiltersOpen] = useState(false);
  
  // Função para filtrar produtos por categoria
  const filterProducts = () => {
    if (selectedCategory === "all") {
      return sampleProducts;
    }
    
    return sampleProducts.filter(product => {
      if (selectedCategory === "perfumes-masculinos") {
        return product.category.toLowerCase().includes("masculino");
      } else if (selectedCategory === "perfumes-femininos") {
        return product.category.toLowerCase().includes("feminino");
      }
      
      return product.category
        .toLowerCase()
        .includes(selectedCategory.replace("-", " "));
    });
  };
  
  // Função para ordenar produtos
  const sortProducts = (products) => {
    return [...products].sort((a, b) => {
      if (sortBy === "price-asc") {
        const priceA = a.discountPrice || a.price;
        const priceB = b.discountPrice || b.price;
        return priceA - priceB;
      }
      
      if (sortBy === "price-desc") {
        const priceA = a.discountPrice || a.price;
        const priceB = b.discountPrice || b.price;
        return priceB - priceA;
      }
      
      if (sortBy === "best-sellers") {
        if (a.isBestSeller && !b.isBestSeller) return -1;
        if (!a.isBestSeller && b.isBestSeller) return 1;
        return 0;
      }
      
      // Por padrão, ordenar por mais recentes (ou alfabeticamente, como simulação)
      return a.name.localeCompare(b.name);
    });
  };
  
  const filteredProducts = sortProducts(filterProducts());
  
  // Função para alternar os filtros em mobile
  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h1 className="text-2xl md:text-3xl font-medium text-vb-black mb-4 sm:mb-0">
              Nossos Produtos
            </h1>
            
            {/* Botão para exibir/ocultar filtros em mobile */}
            <Button
              variant="outline"
              className="flex items-center text-vb-black border-vb-beige-dark sm:hidden"
              onClick={toggleFilters}
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
              {filtersOpen ? (
                <ChevronUp className="h-4 w-4 ml-2" />
              ) : (
                <ChevronDown className="h-4 w-4 ml-2" />
              )}
            </Button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6">
            {/* Sidebar de Filtros */}
            <aside className={`w-full md:w-64 md:block ${filtersOpen ? 'block' : 'hidden'}`}>
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <h2 className="text-lg font-medium text-vb-black mb-4">Categorias</h2>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <button
                        className={`w-full text-left py-2 px-3 rounded-md text-sm transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-vb-beige text-vb-black font-medium'
                            : 'text-vb-black-light hover:bg-vb-beige/50'
                        }`}
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        {category.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-lg font-medium text-vb-black mb-4">Ordenar Por</h2>
                <ul className="space-y-2">
                  {sortOptions.map((option) => (
                    <li key={option.id}>
                      <button
                        className={`w-full text-left py-2 px-3 rounded-md text-sm transition-colors ${
                          sortBy === option.id
                            ? 'bg-vb-beige text-vb-black font-medium'
                            : 'text-vb-black-light hover:bg-vb-beige/50'
                        }`}
                        onClick={() => setSortBy(option.id)}
                      >
                        {option.name}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
            
            {/* Lista de Produtos */}
            <div className="flex-1">
              <ProductGrid 
                products={filteredProducts} 
                title={
                  selectedCategory === "all"
                    ? "Todos os Produtos"
                    : categories.find(c => c.id === selectedCategory)?.name
                }
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default Products;
