/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import ScratchCard from './ScratchCard';
import { MapPin, Calendar, Clock, Hand } from 'lucide-react';

export default function StoryExperience() {
  return (
    <div className="relative w-full bg-black text-white">
      {/* Welcome Section */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center p-8 relative pt-20">
        
        {/* dsn-removebg-preview.png divider */}
        <motion.img 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          src="/images/dsn-removebg-preview.png" 
          alt="Divider" 
          className="w-72 md:w-96 opacity-80 mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, delay: 0.3 }}
          className="max-w-3xl text-center space-y-8"
        >
          <h2 className="text-3xl md:text-5xl font-serif italic text-wedding-gold">
            Our Family Welcome You
          </h2>
          <p className="text-lg md:text-xl font-sans leading-loose text-center text-gray-300">
            We cordially invite your esteemed presence and blessings with family on the auspicious occasion of the marriage of our daughter Raniya and Safeer (S/o Mrs and Mr Aboobaker, Mampatta House, Varanakkara, Kanamana)
          </p>
        </motion.div>
      </section>

      {/* Date Section (Interactive Circular Scratch Cards) */}
      <section className="min-h-[70vh] flex flex-col items-center justify-center p-8 relative overflow-hidden">
        
        {/* Bird floating image */}
        <motion.img 
          src="/images/bird-removebg-preview.png" 
          alt="Bird"
          className="absolute right-[-2%] top-[-1%] w-40 md:w-56 opacity-70"
          animate={{ y: [0, -20, 0], x: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center mb-12 flex flex-col items-center"
        >
          {/* Scratch Icon Hint */}
          <div className="flex flex-col items-center mb-10 text-gray-400">
             <div className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center mb-3">
               <Hand className="w-5 h-5 text-gray-400" />
             </div>
             <p className="font-serif text-[11px] md:text-xs tracking-widest text-gray-400">
               Scratch all three circles to continue
             </p>
          </div>
          
          <h2 className="text-5xl md:text-6xl font-serif italic mb-6 text-wedding-gold">
            Reveal
          </h2>
          <p className="font-serif tracking-[0.4em] uppercase text-xs md:text-sm text-gray-300">
            SCRATCH TO DISCOVER THE DATE
          </p>
        </motion.div>

        {/* Forced row layout specifically to fit correctly, perfectly circular */}
        <div className="relative z-10 flex flex-row flex-wrap justify-center gap-6 md:gap-12 mt-4">
          <ScratchCard>
            <span className="text-3xl sm:text-5xl font-serif text-white mb-2 drop-shadow-md">15</span>
            <span className="text-wedding-gold tracking-[0.2em] uppercase text-[10px] sm:text-xs">Date</span>
          </ScratchCard>
          
          <ScratchCard>
            <span className="text-xl sm:text-4xl font-serif text-white mb-2 drop-shadow-md">Nov</span>
            <span className="text-wedding-gold tracking-[0.2em] uppercase text-[10px] sm:text-xs">Month</span>
          </ScratchCard>

          <ScratchCard>
            <span className="text-xl sm:text-3xl font-serif text-white mb-2 drop-shadow-md">2026</span>
            <span className="text-wedding-gold tracking-[0.2em] uppercase text-[10px] sm:text-xs">Year</span>
          </ScratchCard>
        </div>
      </section>

      {/* Venue Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center">
        {/* Parallax Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
          style={{ backgroundImage: "url('/images/venue.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black" />
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-2xl px-8 py-12 bg-black/50 backdrop-blur-md rounded-[2rem] shadow-2xl"
        >
          <h2 className="text-4xl md:text-5xl font-serif text-wedding-gold mb-10">
            The Venue
          </h2>
          <h4 className="text-2xl font-serif text-white mb-8">
            The Grand Royal Palace
          </h4>
          
          <div className="flex flex-col items-center gap-4 text-gray-200 font-sans mb-10 text-base md:text-lg">
            <div className="flex items-center gap-3">
              <MapPin className="text-wedding-red w-5 h-5 md:w-6 md:h-6" /> 
              <span>123 Heritage Road, City of Love</span>
            </div>
            <div className="flex items-center gap-3">
              <Calendar className="text-wedding-red w-5 h-5 md:w-6 md:h-6" /> 
              <span>15th November 2026</span>
            </div>
            <div className="flex items-center gap-3">
              <Clock className="text-wedding-red w-5 h-5 md:w-6 md:h-6" /> 
              <span>6:00 PM Onwards</span>
            </div>
          </div>

          <a
            href="https://maps.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-8 py-3 bg-transparent border-2 border-wedding-gold text-wedding-gold hover:bg-wedding-gold hover:text-black transition-colors rounded-full uppercase tracking-widest text-sm font-semibold"
          >
            View Location
          </a>
        </motion.div>
      </section>
    </div>
  );
}
