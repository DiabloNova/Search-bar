"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";

// Mock suggestion database for initial verification
const MOCK_SUGGESTIONS = [
  "Next.js App Router Deep Dive",
  "Framer Motion 3D Tilt Tutorial",
  "Tailwind CSS Glassmorphism Guide",
  "Advanced Lucide Icon Integration"
];

export default function WatchVideoBadge() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter suggestion list based on user typing query
  const filteredSuggestions = MOCK_SUGGESTIONS.filter((item) =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  // Handle click outside to close suggestion dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle keyboard interaction and navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        setIsOpen(true);
      }
      return;
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex < filteredSuggestions.length - 1 ? prevIndex + 1 : 0
      );
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setFocusedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : filteredSuggestions.length - 1
      );
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (focusedIndex >= 0 && focusedIndex < filteredSuggestions.length) {
        selectSuggestion(filteredSuggestions[focusedIndex]);
      } else if (query.trim() !== "") {
        console.log(`Searching for: ${query}`);
        setIsOpen(false);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setQuery(suggestion);
    setIsOpen(false);
    setFocusedIndex(-1);
    console.log(`Selected suggestion: ${suggestion}`);
  };

  // Main container hover variants configuration - scale to 1.02 and apply standard shadow
  const containerVariants: Variants = {
    initial: {
      scale: 1,
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)"
    },
    hover: {
      scale: 1.02,
      boxShadow: "0px 15px 35px rgba(0, 0, 0, 0.15)",
      transition: { duration: 0.25, ease: "easeOut" }
    }
  };

  // Blue action button hover/orchestration variants configuration
  const buttonVariants: Variants = {
    initial: { x: 0, scale: 1 },
    hover: {
      x: 2,
      scale: 1.08,
      transition: { duration: 0.25, ease: "easeOut" }
    }
  };

  const chevronVariants: Variants = {
    initial: { x: 0 },
    hover: {
      x: 2,
      transition: { duration: 0.25, ease: "easeOut" }
    }
  };

  // Dropdown framer-motion animations config
  const dropdownVariants = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.2, ease: "easeOut" }
  };

  return (
    <div ref={containerRef} className="relative z-50 w-[420px]">
      {/* Search Bar / BadgeBody Base Container */}
      <motion.div
        className="relative w-full h-[64px] bg-[#181920] rounded-full flex items-center border-none select-none shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
        variants={containerVariants}
        initial="initial"
        animate={isHovered ? "hover" : "initial"}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Interactive Text Input Field */}
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setFocusedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder="Watch video about this here..."
          className="w-full h-full bg-transparent pl-8 pr-[72px] text-[15px] font-medium text-white placeholder-white/60 tracking-tight outline-none border-none cursor-text rounded-full"
        />

        {/* Overlaid blue action circular button, perfectly inside the capsule with right-1.5 and top-1.5 */}
        <motion.button
          onClick={() => {
            if (query.trim() !== "") {
              console.log(`Searching for: ${query}`);
              setIsOpen(false);
            }
          }}
          className="absolute right-1.5 top-1.5 w-[52px] h-[52px] rounded-full bg-[#005eff] flex items-center justify-center shadow-[0_4px_14px_rgba(0,94,255,0.4)] cursor-pointer outline-none focus:ring-2 focus:ring-[#005eff] focus:ring-offset-2 focus:ring-offset-[#181920] transition-shadow duration-200"
          variants={buttonVariants}
          animate={isHovered ? "hover" : "initial"}
        >
          {/* Centered Chevron Arrow Indicator */}
          <motion.div variants={chevronVariants} className="flex items-center justify-center">
            <ChevronRight className="w-5.5 h-5.5 text-white stroke-[2.5]" />
          </motion.div>
        </motion.button>
      </motion.div>

      {/* Dynamic Suggestions Dropdown List with Premium Dark Glassmorphism */}
      <AnimatePresence>
        {isOpen && filteredSuggestions.length > 0 && (
          <motion.div
            key="suggestions-dropdown"
            variants={dropdownVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="absolute top-[72px] left-0 w-full rounded-2xl border border-white/20 bg-[#181920]/95 backdrop-blur-lg overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.15)]"
          >
            <ul className="py-2 flex flex-col">
              {filteredSuggestions.map((item, index) => {
                const isSelected = index === focusedIndex;
                return (
                  <motion.li
                    key={item}
                    onClick={() => selectSuggestion(item)}
                    onMouseEnter={() => setFocusedIndex(index)}
                    className={`px-6 py-3.5 text-[14px] text-slate-200 font-medium tracking-tight cursor-pointer transition-colors duration-150 select-none ${
                      isSelected
                        ? "bg-white/20 text-white font-semibold"
                        : "hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    {item}
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
