/* eslint-disable no-unused-vars */
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef } from 'react';

export default function OpeningScene({ onEnter, onMusicStart }) {
  const [isOpening, setIsOpening] = useState(false);
  const videoRef = useRef(null);

  const handleEnter = () => {
    setIsOpening(true);
    
    if (onMusicStart) onMusicStart();

    // Play the video programmatically to ensure mobile compatibility
    if (videoRef.current) {
      videoRef.current.play().catch(err => console.error("Video play failed:", err));
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black"
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src="/vedios/curratinmoving.mp4"
          muted
          playsInline
          onEnded={() => onEnter()} // Trigger enter when curtain fully opens
        />

        {!isOpening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            <button
              onClick={handleEnter}
              className="px-8 py-3 bg-wedding-red/80 hover:bg-wedding-red text-wedding-gold-light border border-wedding-gold rounded-full text-lg md:text-xl tracking-widest transition-all shadow-[0_0_15px_rgba(212,175,55,0.4)] hover:shadow-[0_0_25px_rgba(212,175,55,0.7)] backdrop-blur-sm cursor-pointer"
            >
              TAP TO ENTER
            </button>
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
