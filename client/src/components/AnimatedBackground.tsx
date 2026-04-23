
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

// Helper to generate non-overlapping positions with layers
function getNonOverlappingPositions(count, minY, maxY, minDist, existingPositions = []) {
  const positions = [];
  let attempts = 0;
  const allExisting = [...existingPositions];
  
  while (positions.length < count && attempts < count * 30) {
    const x = Math.random() * 90 + 5; // 5% to 95%
    const y = Math.random() * (maxY - minY) + minY;
    
    const tooClose = allExisting.some(
      pos => Math.abs(pos.x - x) < minDist && Math.abs(pos.y - y) < minDist
    );
    
    if (!tooClose) {
      const newPos = { x, y };
      positions.push(newPos);
      allExisting.push(newPos);
    }
    attempts++;
  }
  return positions;
}

const NUM_STARS = 80;
const NUM_CLOUDS = 15;
const NUM_BACKGROUND_TREES = 25; // Far back trees
const NUM_MIDGROUND_TREES = 20;  // Middle layer trees
const NUM_FOREGROUND_TREES = 15; // Front trees
const NUM_LARGE_BUSHES = 35;
const NUM_SMALL_BUSHES = 45;
const NUM_GLOWWORMS = 60;
const NUM_FIREFLIES = 25;
const NUM_MIDDLE_GLOWWORMS = 50; // New floating glowworms for middle area

export const AnimatedBackground = () => {
  // Memoize positions for consistent rendering with proper layering
  console.log("background is rendered");
  const backgroundTreePositions = useMemo(
    () => getNonOverlappingPositions(NUM_BACKGROUND_TREES, 65, 75, 8),
    []
  );
  
  const midgroundTreePositions = useMemo(
    () => getNonOverlappingPositions(NUM_MIDGROUND_TREES, 70, 80, 9, backgroundTreePositions),
    [backgroundTreePositions]
  );
  
  const foregroundTreePositions = useMemo(
    () => getNonOverlappingPositions(NUM_FOREGROUND_TREES, 75, 85, 10, [...backgroundTreePositions, ...midgroundTreePositions]),
    [backgroundTreePositions, midgroundTreePositions]
  );
  
  const allTreePositions = [...backgroundTreePositions, ...midgroundTreePositions, ...foregroundTreePositions];
  
  const largeBushPositions = useMemo(
    () => getNonOverlappingPositions(NUM_LARGE_BUSHES, 85, 95, 6, allTreePositions),
    [allTreePositions]
  );
  
  const smallBushPositions = useMemo(
    () => getNonOverlappingPositions(NUM_SMALL_BUSHES, 90, 98, 4, [...allTreePositions, ...largeBushPositions]),
    [allTreePositions, largeBushPositions]
  );
  
  const glowwormPositions = useMemo(
    () => getNonOverlappingPositions(NUM_GLOWWORMS, 92, 99, 2, [...allTreePositions, ...largeBushPositions, ...smallBushPositions]),
    [allTreePositions, largeBushPositions, smallBushPositions]
  );
  
  const fireflyPositions = useMemo(
    () => getNonOverlappingPositions(NUM_FIREFLIES, 50, 90, 3),
    []
  );

  // New middle area floating glowworms
  const middleGlowwormPositions = useMemo(
    () => getNonOverlappingPositions(NUM_MIDDLE_GLOWWORMS, 35, 70, 3),
    []
  );

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-gradient-to-b from-gray-950 via-green-950 to-green-800">
      {/* Enhanced stars at the top */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(NUM_STARS)].map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 30}%`,
              width: i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1.5,
              height: i % 5 === 0 ? 3 : i % 3 === 0 ? 2 : 1.5,
              background: i % 5 === 0 ? '#fff' : i % 4 === 1 ? '#fef9c3' : i % 4 === 2 ? '#bae6fd' : '#e0e7ff',
              opacity: 0.9,
              filter: 'blur(0.5px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.6, 1, 0.8] }}
            transition={{ duration: 3 + Math.random() * 3, repeat: Infinity }}
          />
        ))}
      </div>

      {/* Enhanced clouds */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(NUM_CLOUDS)].map((_, i) => (
          <motion.div
            key={`cloud-${i}`}
            className="absolute opacity-25"
            style={{
              left: `${Math.random() * 85}%`,
              top: `${5 + Math.random() * 20}%`,
              zIndex: 1,
            }}
            initial={{ opacity: 0.15, x: 0 }}
            animate={{ 
              opacity: [0.15, 0.35, 0.2], 
              x: [0, 20, 0],
              y: [0, -5, 0]
            }}
            transition={{ duration: 15 + Math.random() * 10, repeat: Infinity }}
          >
            <svg
              width={100 + Math.random() * 80}
              height={40 + Math.random() * 30}
              viewBox="0 0 120 50"
              className="text-gray-300"
            >
              <circle cx="25" cy="30" r="15" fill="currentColor" />
              <circle cx="50" cy="22" r="20" fill="currentColor" />
              <circle cx="75" cy="28" r="18" fill="currentColor" />
              <circle cx="95" cy="35" r="12" fill="currentColor" />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Background trees (farthest) */}
      {backgroundTreePositions.map((pos, i) => (
        <motion.div
          key={`bg-tree-${i}`}
          className="absolute"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            zIndex: 2,
          }}
          initial={{ scale: 0.7, opacity: 0.4 }}
          animate={{ scale: [0.7, 0.75, 0.7], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 8 + Math.random() * 4, repeat: Infinity }}
        >
          <svg
            width={40 + Math.random() * 20}
            height={60 + Math.random() * 30}
            viewBox="0 0 70 100"
            className="text-green-800 opacity-60"
          >
            <rect x="30" y="75" width="10" height="25" fill="#654321" opacity="0.6" />
            <circle cx="35" cy="60" r="20" fill="currentColor" opacity="0.5" />
            <circle cx="30" cy="55" r="15" fill="currentColor" opacity="0.6" />
            <circle cx="40" cy="65" r="13" fill="currentColor" opacity="0.7" />
          </svg>
        </motion.div>
      ))}

      {/* Midground trees */}
      {midgroundTreePositions.map((pos, i) => (
        <motion.div
          key={`mid-tree-${i}`}
          className="absolute"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            zIndex: 3,
          }}
          initial={{ scale: 0.8, opacity: 0.6 }}
          animate={{ scale: [0.8, 0.9, 0.85], opacity: [0.6, 0.8, 0.7] }}
          transition={{ duration: 6 + Math.random() * 3, repeat: Infinity }}
        >
          <svg
            width={55 + Math.random() * 25}
            height={75 + Math.random() * 35}
            viewBox="0 0 80 110"
            className={`${
              i % 4 === 0 ? 'text-green-700' : i % 4 === 1 ? 'text-green-600' : i % 4 === 2 ? 'text-emerald-700' : 'text-green-800'
            } drop-shadow-md opacity-75`}
          >
            <rect x="35" y="80" width="12" height="28" fill="#8B4513" opacity="0.7" />
            <circle cx="40" cy="65" r="22" fill="currentColor" opacity="0.6" />
            <circle cx="35" cy="60" r="17" fill="currentColor" opacity="0.7" />
            <circle cx="45" cy="70" r="15" fill="currentColor" opacity="0.8" />
            <circle cx="40" cy="50" r="13" fill="currentColor" opacity="0.9" />
          </svg>
        </motion.div>
      ))}

      {/* Foreground trees (closest, largest) */}
      {foregroundTreePositions.map((pos, i) => (
        <motion.div
          key={`fg-tree-${i}`}
          className="absolute"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            zIndex: 4,
          }}
          initial={{ scale: 0.9, opacity: 0.8 }}
          animate={{ scale: [0.9, 1.05, 0.95], opacity: [0.8, 1, 0.9] }}
          transition={{ duration: 5 + Math.random() * 2, repeat: Infinity }}
        >
          <svg
            width={70 + Math.random() * 40}
            height={90 + Math.random() * 50}
            viewBox="0 0 100 140"
            className={`${
              i % 5 === 0 ? 'text-green-600' : i % 5 === 1 ? 'text-green-700' : i % 5 === 2 ? 'text-emerald-600' : i % 5 === 3 ? 'text-green-800' : 'text-emerald-700'
            } drop-shadow-lg`}
          >
            <rect x="45" y="100" width="15" height="35" fill="#8B4513" opacity="0.8" />
            <circle cx="50" cy="80" r="28" fill="currentColor" opacity="0.6" />
            <circle cx="42" cy="75" r="22" fill="currentColor" opacity="0.7" />
            <circle cx="58" cy="85" r="20" fill="currentColor" opacity="0.8" />
            <circle cx="50" cy="60" r="18" fill="currentColor" opacity="0.9" />
            <circle cx="45" cy="95" r="12" fill="currentColor" opacity="0.7" />
          </svg>
        </motion.div>
      ))}

      {/* Middle Area Floating Colorful Glowworms - Moving SW to NE */}
      {middleGlowwormPositions.map((pos, i) => (
        <motion.div
          key={`middle-glowworm-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            width: '5px',
            height: '5px',
            background:
              i % 8 === 0 ? '#fde047' : // Yellow
              i % 8 === 1 ? '#f97316' : // Orange  
              i % 8 === 2 ? '#ec4899' : // Pink
              i % 8 === 3 ? '#8b5cf6' : // Purple
              i % 8 === 4 ? '#06b6d4' : // Cyan
              i % 8 === 5 ? '#10b981' : // Emerald
              i % 8 === 6 ? '#f59e0b' : // Amber
              '#ef4444', // Red
            boxShadow:
              i % 8 === 0 ? '0 0 12px 3px rgba(253, 224, 71, 0.7)' :
              i % 8 === 1 ? '0 0 12px 3px rgba(249, 115, 22, 0.7)' :
              i % 8 === 2 ? '0 0 12px 3px rgba(236, 72, 153, 0.7)' :
              i % 8 === 3 ? '0 0 12px 3px rgba(139, 92, 246, 0.7)' :
              i % 8 === 4 ? '0 0 12px 3px rgba(6, 182, 212, 0.7)' :
              i % 8 === 5 ? '0 0 12px 3px rgba(16, 185, 129, 0.7)' :
              i % 8 === 6 ? '0 0 12px 3px rgba(245, 158, 11, 0.7)' :
              '0 0 12px 3px rgba(239, 68, 68, 0.7)',
            zIndex: 3,
            opacity: 0.8,
          }}
          initial={{ x: 0, y: 0, opacity: 0.4 }}
          animate={{ 
            x: [0, 40, 80, 120], // Moving from left to right (west to east)
            y: [0, -20, -40, -60], // Moving upward (south to north)
            opacity: [0.4, 1, 0.6, 1, 0.3]
          }}
          transition={{ 
            duration: 12 + Math.random() * 8, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}

      {/* Large bushes */}
      {largeBushPositions.map((pos, i) => (
        <motion.div
          key={`large-bush-${i}`}
          className="absolute"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            zIndex: 5,
          }}
          initial={{ scale: 0.8, opacity: 0.7 }}
          animate={{ scale: [0.8, 1, 0.9], opacity: [0.7, 1, 0.8] }}
          transition={{ duration: 4 + Math.random() * 2, repeat: Infinity }}
        >
          <svg
            width={45 + Math.random() * 30}
            height={25 + Math.random() * 15}
            viewBox="0 0 75 40"
            className={`${
              i % 5 === 0 ? 'text-green-500' : i % 5 === 1 ? 'text-green-600' : i % 5 === 2 ? 'text-emerald-500' : i % 5 === 3 ? 'text-green-700' : 'text-emerald-600'
            } drop-shadow-sm`}
          >
            <circle cx="20" cy="30" r="15" fill="currentColor" opacity="0.7" />
            <circle cx="40" cy="22" r="18" fill="currentColor" opacity="0.8" />
            <circle cx="55" cy="28" r="12" fill="currentColor" opacity="0.6" />
            <circle cx="30" cy="35" r="10" fill="currentColor" opacity="0.9" />
            <circle cx="50" cy="38" r="8" fill="currentColor" opacity="0.7" />
          </svg>
        </motion.div>
      ))}

      {/* Small bushes (dense ground cover) */}
      {smallBushPositions.map((pos, i) => (
        <motion.div
          key={`small-bush-${i}`}
          className="absolute"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            zIndex: 6,
          }}
          initial={{ scale: 0.6, opacity: 0.6 }}
          animate={{ scale: [0.6, 0.8, 0.7], opacity: [0.6, 0.9, 0.7] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity }}
        >
          <svg
            width={25 + Math.random() * 20}
            height={15 + Math.random() * 10}
            viewBox="0 0 45 25"
            className={`${
              i % 4 === 0 ? 'text-green-400' : i % 4 === 1 ? 'text-green-500' : i % 4 === 2 ? 'text-emerald-400' : 'text-green-600'
            }`}
          >
            <circle cx="12" cy="18" r="8" fill="currentColor" opacity="0.8" />
            <circle cx="25" cy="15" r="10" fill="currentColor" opacity="0.7" />
            <circle cx="35" cy="20" r="7" fill="currentColor" opacity="0.9" />
            <circle cx="20" cy="22" r="6" fill="currentColor" opacity="0.6" />
          </svg>
        </motion.div>
      ))}

      {/* Ground glow worms */}
      {glowwormPositions.map((pos, i) => (
        <motion.div
          key={`glowworm-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            width: '6px',
            height: '6px',
            background: i % 4 === 0 ? '#fde047' : i % 4 === 1 ? '#bbf7d0' : i % 4 === 2 ? '#bef264' : '#a7f3d0',
            boxShadow: i % 4 === 0 ? '0 0 8px 2px #fde047' : i % 4 === 1 ? '0 0 6px 2px #bbf7d0' : i % 4 === 2 ? '0 0 6px 2px #bef264' : '0 0 5px 1px #a7f3d0',
            zIndex: 7,
            opacity: 0.9,
          }}
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 1, 0.6, 1] }}
          transition={{ duration: 2 + Math.random() * 3, repeat: Infinity }}
        />
      ))}

      {/* Flying fireflies */}
      {fireflyPositions.map((pos, i) => (
        <motion.div
          key={`firefly-${i}`}
          className="absolute rounded-full"
          style={{
            left: `${pos.x}%`,
            top: `${pos.y}%`,
            width: '4px',
            height: '4px',
            background: i % 3 === 0 ? '#fbbf24' : i % 3 === 1 ? '#34d399' : '#60a5fa',
            boxShadow: i % 3 === 0 ? '0 0 12px 3px #fbbf24' : i % 3 === 1 ? '0 0 10px 2px #34d399' : '0 0 8px 2px #60a5fa',
            zIndex: 8,
            opacity: 0.8,
          }}
          initial={{ x: 0, y: 0, opacity: 0.3 }}
          animate={{ 
            x: [0, 30, -20, 15, 0],
            y: [0, -25, 20, -10, 0],
            opacity: [0.3, 1, 0.5, 1, 0.4]
          }}
          transition={{ 
            duration: 8 + Math.random() * 6, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      ))}

      {/* Enhanced atmospheric layers */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/70 via-green-900/40 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-green-900/20 pointer-events-none" />
    </div>
  );
};

export default AnimatedBackground;