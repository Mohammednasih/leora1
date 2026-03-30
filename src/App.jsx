/* eslint-disable no-unused-vars */
import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OpeningScene from './components/OpeningScene';
import MainInvitation from './components/MainInvitation';
import StoryExperience from './components/StoryExperience';
import EndingSection from './components/EndingSection';

function App() {
  const [isEntered, setIsEntered] = useState(false);
  const audioRef = useRef(null);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.play().catch(e => console.error("Audio play failed:", e));
    }
  };

  return (
    <main className="w-full min-h-screen bg-black text-white font-sans selection:bg-wedding-gold selection:text-black">
      {/* Hidden video wrapper for continuous background MP4 audio tracking */}
      <video ref={audioRef} loop playsInline style={{ display: 'none' }}>
        <source src="/vedios/Music%20.mp4" type="video/mp4" />
      </video>

      <AnimatePresence mode="wait">
        {!isEntered && (
          <OpeningScene 
            key="opening" 
            onEnter={() => setIsEntered(true)} 
            onMusicStart={startMusic}
          />
        )}
      </AnimatePresence>
      
      {isEntered && (
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1.5 }}
          className="flex flex-col w-full h-full"
        >
          <MainInvitation />
          <StoryExperience />
          <EndingSection />
        </motion.div>
      )}
    </main>
  );
}

export default App;
