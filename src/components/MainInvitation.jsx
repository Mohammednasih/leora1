/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion';
import { useMemo } from 'react';

const generateParticles = () => {
  return [...Array(35)].map(() => ({
    width: Math.random() * 8 + 6 + 'px',
    height: Math.random() * 12 + 8 + 'px',
    left: Math.random() * 100 + '%',
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 5,
    rotation: Math.random() * 360,
    xValues: [0, Math.random() * 100 - 50, Math.random() * 100 - 50],
  }));
};

export default function MainInvitation() {
  const particles = useMemo(() => generateParticles(), []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Slow Zoom Effect */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/stage.jpg')" }}
        animate={{ scale: [1, 1.15] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      />
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

      {/* Falling Flower Petals Layer */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-[50%_0_50%_50%] bg-wedding-gold-light/60 blur-[1px]"
            style={{
               width: particle.width,
               height: particle.height,
               left: particle.left,
               top: '-10%',
               originX: 0.5,
               originY: 0.5,
            }}
            animate={{
              y: ['0vh', '120vh'],
              x: particle.xValues,
              rotate: [particle.rotation, particle.rotation + 360],
              opacity: [0, 0.9, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              ease: "linear",
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      {/* Main Full-Screen Typographic Reveal */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center px-4"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, delay: 1 }}
          className="text-center"
        >
          <div className="mb-4">
            <h1 className="text-5xl md:text-6xl text-wedding-gold-light font-serif">
              ﷽
            </h1>
          </div>
          
          <p className="text-wedding-gold-light text-sm md:text-base tracking-[0.2em] mb-10 font-serif italic drop-shadow-md">
            In the name of Allah <br/> the most gracious and most merciful
          </p>
          
          <h2 className="text-7xl md:text-9xl text-wedding-gold font-serif italic drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] leading-none tracking-tight pb-2 md:pb-4">
            Raniya
          </h2>
          
          <div className="py-4">
            <p className="text-4xl md:text-6xl text-wedding-gold font-serif italic drop-shadow-md">
              &
            </p>
          </div>
          
          <h2 className="text-7xl md:text-9xl text-wedding-gold font-serif italic drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] leading-none tracking-tight pb-2 md:pb-4">
            Safeer
          </h2>
        </motion.div>
      </motion.div>
    </section>
  );
}
