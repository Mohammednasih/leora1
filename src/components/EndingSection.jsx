/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';

export default function EndingSection() {
  return (
    <section className="flex items-center justify-center min-h-[50vh] bg-black p-8 text-center relative overflow-hidden border-t border-wedding-gold/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.05),transparent_70%)]" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="relative z-10 max-w-2xl"
      >
        <h2 className="text-3xl md:text-5xl font-serif text-wedding-gold mb-6 leading-relaxed">
          We look forward to celebrating with you
        </h2>
        <p className="text-wedding-red font-serif text-2xl italic">
          Liora & James
        </p>
      </motion.div>
    </section>
  );
}
