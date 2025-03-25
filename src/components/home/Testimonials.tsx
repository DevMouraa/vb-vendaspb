
import React from "react";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface Testimonial {
  id: number;
  name: string;
  content: string;
  rating: number;
  date: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Maria Silva",
    content: "Os perfumes são maravilhosos e duradouros! Já é a terceira vez que compro e sempre saio satisfeita. A entrega foi rápida e a embalagem muito bem cuidada.",
    rating: 5,
    date: "15/04/2023"
  },
  {
    id: 2,
    name: "João Almeida",
    content: "As joias são lindas e de excelente qualidade. Comprei uma pulseira para minha esposa e ela adorou. Atendimento nota 10!",
    rating: 5,
    date: "22/05/2023"
  },
  {
    id: 3,
    name: "Ana Pereira",
    content: "Comprei um hidratante e superou minhas expectativas. A textura é perfeita e deixa a pele muito macia. Com certeza voltarei a comprar!",
    rating: 4,
    date: "07/06/2023"
  }
];

const Testimonials = () => {
  const variants = {
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
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={variants}
        >
          <span className="inline-block px-3 py-1 bg-vb-beige/30 text-vb-black-light text-sm rounded-full mb-3">
            Depoimentos
          </span>
          <h2 className="text-3xl font-medium text-vb-black">O Que Nossos Clientes Dizem</h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={testimonial.id}
              className="bg-white p-6 rounded-xl shadow-sm border border-vb-beige hover-lift"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={variants}
              transition={{ delay: index * 0.1 }}
            >
              {/* Rating */}
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-2 text-xs text-vb-black-light/70">
                  {testimonial.date}
                </span>
              </div>
              
              {/* Content */}
              <p className="text-vb-black-light mb-4 italic">
                "{testimonial.content}"
              </p>
              
              {/* Customer Name */}
              <p className="font-medium text-vb-black">
                {testimonial.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
