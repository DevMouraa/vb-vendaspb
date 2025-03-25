
import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface Category {
  id: string;
  name: string;
  image: string;
  slug: string;
}

const categories: Category[] = [
  {
    id: "1",
    name: "Perfumes Femininos",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    slug: "perfumes-femininos"
  },
  {
    id: "2",
    name: "Perfumes Masculinos",
    image: "https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    slug: "perfumes-masculinos"
  },
  {
    id: "3",
    name: "Joias",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    slug: "joias"
  },
  {
    id: "4",
    name: "Hidratantes",
    image: "https://images.unsplash.com/photo-1556228578-4da87a0060f9?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    slug: "hidratantes"
  }
];

const FeaturedCategories = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block px-3 py-1 bg-vb-beige/30 text-vb-black-light text-sm rounded-full mb-3">
            Categorias
          </span>
          <h2 className="text-3xl font-medium text-vb-black">Explore Nossa Coleção</h2>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category) => (
            <motion.div 
              key={category.id} 
              variants={itemVariants}
              className="group"
            >
              <Link 
                to={`/categoria/${category.slug}`}
                className="relative block h-64 rounded-xl overflow-hidden shadow-sm"
              >
                {/* Category Image */}
                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
                  style={{ backgroundImage: `url(${category.image})` }} 
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-vb-black to-transparent opacity-70 group-hover:opacity-80 transition-opacity" />
                
                {/* Category Name */}
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white text-xl font-medium">
                    {category.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
