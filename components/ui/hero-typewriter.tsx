"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

interface HeroTypewriterProps {
  className?: string;
}

const typewriterData = [
  {
    text: "Smart Surveyors",
    subtitle:
      "A modern land surveying company built on accuracy, integrity, and expertise.",
  },
  {
    text: "Built for Precision",
    subtitle:
      "Delivering accurate, dependable surveys that form the backbone of your next project.",
  },
  {
    text: "the First Step on Site",
    subtitle:
      "Our surveys are the first step toward every successful development.",
  },
  {
    text: "Measurably Better",
    subtitle: "Because when it comes to land, precision is everything.",
  },
  {
    text: "Mapping Tomorrow",
    subtitle:
      "Defining the edges, corners, and contours your vision relies on.",
  },
  {
    text: "Anchored in Trust",
    subtitle: "Built on years of precision, backed by a legacy of reliability.",
  },
];

function TypewriterText({
  text,
  className = "",
  style = {},
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Reset count to 0 first
    count.set(0);
    setIsComplete(false);

    // Calculate duration based on text length, with minimum duration
    const baseDuration = Math.max(text.length * 0.08, 1.2); // Minimum 1.2s, 0.08s per character

    const controls = animate(count, text.length, {
      type: "tween",
      duration: baseDuration,
      ease: "easeInOut",
      onComplete: () => setIsComplete(true),
    });
    return controls.stop;
  }, [text, count]);

  return (
    <span className={className} style={style}>
      <motion.span>{displayText}</motion.span>
      {/* Blinking cursor */}
      <motion.span
        className="inline-block w-1 ml-1"
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        style={{
          height: "1em",
          background: "linear-gradient(135deg, #ef4444, #dc2626, #991b1b)",
        }}
      >
        |
      </motion.span>
    </span>
  );
}

export default function HeroTypewriter({
  className = "",
}: HeroTypewriterProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSubtitle, setShowSubtitle] = useState(false);
  const [showTypewriter, setShowTypewriter] = useState(true);

  useEffect(() => {
    // Show first subtitle after initial typewriter animation
    const initialTimer = setTimeout(() => {
      setShowSubtitle(true);
    }, 1500);

    const interval = setInterval(() => {
      // Hide subtitle immediately (no fade out)
      setShowSubtitle(false);
      // Hide typewriter to prevent overlap
      setShowTypewriter(false);

      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % typewriterData.length);
        // Show typewriter again
        setShowTypewriter(true);
        setTimeout(() => {
          setShowSubtitle(true);
        }, 1500); // Show subtitle after typewriter finishes
      }, 100); // Very brief pause before next text starts
    }, 4500); // 4.5 seconds per rotation

    return () => {
      clearTimeout(initialTimer);
      clearInterval(interval);
    };
  }, []);

  const currentData = typewriterData[currentIndex];

  return (
    <div
      className={className}
      style={{ position: "relative", height: "350px", marginTop: "20px" }}
    >
      {/* Fixed position for "We are" text */}
      <div
        style={{ position: "absolute", top: "10px", left: "0", width: "100%" }}
      >
        <h1
          className="font-heading font-semibold heading-tight"
          style={{
            fontSize: "clamp(32px, 8vw, 96px)",
            lineHeight: "0.85",
          }}
        >
          <span style={{ color: "black" }}>We are </span>
          <br />
          {/* Fixed position for typewriter text */}
          <span
            style={{
              position: "absolute",
              top: "clamp(35px, 8vw, 90px)",
              left: "0",
              width: "100%",
            }}
          >
            {showTypewriter && (
              <TypewriterText
                text={currentData.text}
                className=""
                style={{
                  background:
                    "linear-gradient(135deg, #db2225, #c41e3a, #a91b2e)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              />
            )}
          </span>
        </h1>
      </div>

      {/* Fixed position for subtitle */}
      <div
        style={{
          position: "absolute",
          top: "clamp(140px, 20vw, 200px)",
          left: "0",
          width: "100%",
        }}
      >
        {showSubtitle && (
          <motion.p
            key={currentIndex}
            className="font-body text-gray-700 max-w-3xl"
            style={{
              fontSize: "clamp(16px, 4vw, 28px)",
              lineHeight: "1.4",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.6,
            }}
          >
            {currentData.subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
