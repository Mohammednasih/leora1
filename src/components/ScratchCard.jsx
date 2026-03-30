/* eslint-disable no-unused-vars */
import { useRef, useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { motion } from 'framer-motion';

export default function ScratchCard({ children, coverText = "" /* we won't draw text over the beautiful metallic circle */ }) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const isDrawing = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    
    canvas.width = container.offsetWidth;
    canvas.height = container.offsetHeight;

    // Draw the metallic gold conic gradient just like the reference screenshot
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    
    if (ctx.createConicGradient) {
      const gradient = ctx.createConicGradient(-Math.PI / 4, cx, cy);
      gradient.addColorStop(0, '#DAA520');
      gradient.addColorStop(0.1, '#FFD700');
      gradient.addColorStop(0.25, '#B8860B');
      gradient.addColorStop(0.4, '#FFECB3');
      gradient.addColorStop(0.5, '#F0E68C');
      gradient.addColorStop(0.6, '#B8860B');
      gradient.addColorStop(0.75, '#FFD700');
      gradient.addColorStop(0.9, '#DAA520');
      gradient.addColorStop(1, '#DAA520');
      ctx.fillStyle = gradient;
    } else {
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(cx, cy));
      gradient.addColorStop(0, '#FFECB3');
      gradient.addColorStop(0.5, '#D4AF37');
      gradient.addColorStop(1, '#8B6508');
      ctx.fillStyle = gradient;
    }
    
    // Fill circular pattern instead of square box
    ctx.beginPath();
    ctx.arc(cx, cy, Math.min(cx, cy), 0, Math.PI * 2);
    ctx.fill();
    
    if (coverText) {
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(coverText, cx, cy);
    }

    const getMousePos = (evt) => {
      const rect = canvas.getBoundingClientRect();
      if (evt.touches) {
        return {
          x: evt.touches[0].clientX - rect.left,
          y: evt.touches[0].clientY - rect.top
        };
      }
      return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
      };
    };

    const handlePointerDown = (e) => {
      isDrawing.current = true;
      e.preventDefault(); 
      scratch(e);
    };

    const handlePointerMove = (e) => {
      if (!isDrawing.current) return;
      e.preventDefault();
      scratch(e);
    };

    const handlePointerUp = () => {
      isDrawing.current = false;
      checkReveal();
    };

    const scratch = (e) => {
      if (isRevealed) return;
      const { x, y } = getMousePos(e);
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(x, y, 40, 0, Math.PI * 2, false); 
      ctx.fill();
    };

    const checkReveal = () => {
      if (isRevealed) return;
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      let transparent = 0;
      for (let i = 3; i < pixels.length; i += 4) {
        if (pixels[i] === 0) transparent++;
      }
      // Reveal at 60% scratched
      if (transparent / (pixels.length / 4) > 0.6) {
        setIsRevealed(true);
        canvas.style.opacity = '0';
        canvas.style.transition = 'opacity 0.4s ease-out';
        setTimeout(() => {
          canvas.style.display = 'none';
          
          const rect = canvas.getBoundingClientRect();
          const pCx = (rect.left + rect.width / 2) / window.innerWidth;
          const pCy = (rect.top + rect.height / 2) / window.innerHeight;
          
          const duration = 1500;
          const end = Date.now() + duration;

          (function frame() {
            confetti({
              particleCount: 5,
              angle: 60,
              spread: 55,
              origin: { x: pCx - 0.05, y: pCy },
              colors: ['#D4AF37', '#ffffff']
            });
            confetti({
              particleCount: 5,
              angle: 120,
              spread: 55,
              origin: { x: pCx + 0.05, y: pCy },
              colors: ['#D4AF37', '#ffffff']
            });
            if (Date.now() < end) {
              requestAnimationFrame(frame);
            }
          }());
          
        }, 400);
      }
    };

    canvas.addEventListener('mousedown', handlePointerDown);
    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('mouseup', handlePointerUp);
    canvas.addEventListener('mouseleave', handlePointerUp);
    
    canvas.addEventListener('touchstart', handlePointerDown, { passive: false });
    canvas.addEventListener('touchmove', handlePointerMove, { passive: false });
    canvas.addEventListener('touchend', handlePointerUp);

    return () => {
      canvas.removeEventListener('mousedown', handlePointerDown);
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('mouseup', handlePointerUp);
      canvas.removeEventListener('mouseleave', handlePointerUp);

      canvas.removeEventListener('touchstart', handlePointerDown);
      canvas.removeEventListener('touchmove', handlePointerMove);
      canvas.removeEventListener('touchend', handlePointerUp);
    };
  }, [isRevealed, coverText]);

  return (
    <div ref={containerRef} className="relative inline-block touch-none select-none rounded-full w-28 h-28 sm:w-36 sm:h-36 shadow-lg bg-white/20 p-[2px]">
      <div className="w-full h-full rounded-full overflow-hidden bg-black/80 flex items-center justify-center border-4 border-white">
        <motion.div 
          className="w-full h-full flex flex-col items-center justify-center pt-2"
          animate={isRevealed ? { scale: [0.8, 1.1, 1], opacity: 1 } : { scale: 0.95, opacity: 0.8 }}
          transition={{ duration: 0.5, type: "spring", bounce: 0.6 }}
        >
          {children}
        </motion.div>
      </div>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10 cursor-pointer touch-none rounded-full"
      />
    </div>
  );
}
