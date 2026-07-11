"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface WatchVideoBadgeProps {
  href?: string;
}

export default function WatchVideoBadge({ href = "#" }: WatchVideoBadgeProps) {
  // Parent-child orchestration variants configuration
  const containerVariants: Variants = {
    initial: {},
    hover: {}
  };

  const textVariants: Variants = {
    initial: { x: 0, letterSpacing: "-0.01em" },
    hover: {
      x: -4,
      letterSpacing: "-0.02em",
      transition: { duration: 0.25, ease: "easeOut" }
    }
  };

  const buttonVariants: Variants = {
    initial: { x: 0, scale: 1 },
    hover: {
      x: 4,
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

  return (
    <Link href={href} passHref legacyBehavior>
      <motion.a
        className="relative inline-flex items-center select-none cursor-pointer"
        initial="initial"
        whileHover="hover"
        variants={containerVariants}
      >
        {/* BadgeBody Frame */}
        <div className="w-[420px] h-[64px] bg-[#181920] rounded-full pl-8 pr-16 flex items-center shadow-none border-none">
          {/* LabelText Element */}
          <motion.span
            className="text-[15px] font-medium text-white tracking-tight block"
            variants={textVariants}
          >
            Watch video about this here...
          </motion.span>
        </div>

        {/* ArrowButtonContainer & CircularButton Framework */}
        <motion.div
          className="absolute right-[-8px] w-[56px] h-[56px] rounded-full bg-[#005eff] flex items-center justify-center shadow-[0_4px_14px_rgba(0,94,255,0.4)]"
          variants={buttonVariants}
        >
          {/* ChevronIcon Primitive */}
          <motion.div variants={chevronVariants} className="flex items-center justify-center">
            <ChevronRight className="w-6 h-6 text-white stroke-[2.5]" />
          </motion.div>
        </motion.div>
      </motion.a>
    </Link>
  );
}
