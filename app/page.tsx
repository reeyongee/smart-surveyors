"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Script from "next/script";
import Nav from "../components/ui/nav";
import HeroTypewriter from "../components/ui/hero-typewriter";
import CountUp from "../src/blocks/TextAnimations/CountUp/CountUp";

// Type declaration for particles.js
declare global {
  interface Window {
    particlesJS: (id: string, config: object) => void;
  }
}

// Stats Counter Component
const StatsCounter = ({
  value,
  label,
  duration,
  currentIndex,
  sectionIndex,
}: {
  value: number;
  label: string;
  duration: number;
  currentIndex: number;
  sectionIndex: number;
}) => {
  const [showLabel, setShowLabel] = useState(false);
  const [shouldStart, setShouldStart] = useState(false);
  const [key, setKey] = useState(0); // Force re-render of CountUp

  useEffect(() => {
    // Reset and start animation when we enter the section
    if (currentIndex === sectionIndex) {
      setShowLabel(false);
      setShouldStart(false); // Reset first
      setKey((prev) => prev + 1); // Force CountUp to re-render

      // Small delay to ensure reset, then start
      setTimeout(() => {
        setShouldStart(true);
      }, 100);
    } else {
      setShouldStart(false);
      setShowLabel(false);
    }
  }, [currentIndex, sectionIndex]);

  const handleCountEnd = () => {
    setShowLabel(true);
  };

  return (
    <div className="text-center">
      <div className="mb-4">
        <div style={{ color: "#db2225" }}>
          <CountUp
            key={key} // Force re-render when key changes
            to={value}
            from={0}
            duration={duration}
            className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl"
            startWhen={shouldStart}
            onEnd={handleCountEnd}
          />
          <span className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl">
            +
          </span>
        </div>
      </div>
      <div
        className={`font-body text-base md:text-xl text-gray-700 transition-opacity duration-500 ${
          showLabel ? "opacity-100" : "opacity-0"
        }`}
      >
        {label}
      </div>
    </div>
  );
};

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchStartTime, setTouchStartTime] = useState(0);
  const [isTouchDragging, setIsTouchDragging] = useState(false);
  const [particlesLoaded, setParticlesLoaded] = useState(false);

  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const wheelDebounceRef = useRef<NodeJS.Timeout | null>(null);
  const lastWheelTimeRef = useRef(0);
  const isScrollingRef = useRef(isScrolling);
  const currentIndexRef = useRef(currentIndex);
  const touchStartYRef = useRef(touchStartY);
  const touchStartTimeRef = useRef(touchStartTime);
  const isTouchDraggingRef = useRef(isTouchDragging);

  // Keep refs in sync with state
  useEffect(() => {
    isScrollingRef.current = isScrolling;
  }, [isScrolling]);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    touchStartYRef.current = touchStartY;
  }, [touchStartY]);

  useEffect(() => {
    touchStartTimeRef.current = touchStartTime;
  }, [touchStartTime]);

  useEffect(() => {
    isTouchDraggingRef.current = isTouchDragging;
  }, [isTouchDragging]);

  const updateActiveDot = useCallback((index: number) => {
    const dots = document.querySelectorAll(".progress-dot");
    dots.forEach((dot) => {
      dot.classList.remove("active");
    });
    dots[index]?.classList.add("active");
  }, []);

  // Single useEffect that runs only once on mount
  useEffect(() => {
    if (!particlesLoaded) return;

    // Define changeSection inside useEffect to avoid dependency issues
    const changeSection = (index: number) => {
      const sections = document.querySelectorAll(".section");
      sections.forEach((section) => {
        section.classList.remove("active");
      });

      sections[index]?.classList.add("active");
      updateActiveDot(index);

      const reveals = sections[index]?.querySelectorAll(".reveal");
      reveals?.forEach((el, i) => {
        setTimeout(() => {
          el.classList.add("active");
        }, i * 75);
      });

      sections.forEach((section, i) => {
        if (i !== index) {
          const otherReveals = section.querySelectorAll(".reveal");
          otherReveals.forEach((el) => {
            el.classList.remove("active");
          });
        }
      });
    };

    // Initialize particles.js
    if (typeof window !== "undefined" && window.particlesJS) {
      window.particlesJS("particles-js", {
        particles: {
          number: { value: 25, density: { enable: true, value_area: 800 } },
          color: {
            value: ["#db2225", "#E0C097", "#000000", "#374151"],
          },
          shape: {
            type: ["circle", "triangle"],
            stroke: { width: 2, color: "#db2225" },
          },
          opacity: {
            value: 0.7,
            random: true,
            anim: {
              enable: true,
              speed: 1,
              opacity_min: 0.3,
              sync: false,
            },
          },
          size: {
            value: 4,
            random: true,
            anim: {
              enable: true,
              speed: 2,
              size_min: 2,
              sync: false,
            },
          },
          line_linked: {
            enable: true,
            distance: 200,
            color: "#db2225",
            opacity: 0.6,
            width: 2,
            shadow: {
              enable: true,
              color: "#E0C097",
              blur: 3,
            },
          },
          move: {
            enable: true,
            speed: 1.5,
            direction: "none",
            random: true,
            straight: false,
            out_mode: "bounce",
            bounce: true,
            attract: {
              enable: true,
              rotateX: 600,
              rotateY: 1200,
            },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: {
              enable: true,
              mode: ["grab", "bubble"],
            },
            onclick: {
              enable: true,
              mode: "repulse",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 250,
              line_linked: {
                opacity: 1,
                color: "#a91b2e",
                width: 3,
              },
            },
            bubble: {
              distance: 200,
              size: 8,
              duration: 2,
              opacity: 1,
              speed: 3,
            },
            repulse: {
              distance: 150,
              duration: 0.4,
            },
            push: { particles_nb: 2 },
            remove: { particles_nb: 1 },
          },
        },
        retina_detect: true,
      });

      addSurveyMeasurements();
    }

    // Initialize interactive grid
    if (typeof window !== "undefined") {
      const gridElement = document.getElementById("interactive-grid");
      if (gridElement && !gridElement.dataset.initialized) {
        import("../components/ui/grid").then(({ default: Grid }) => {
          new Grid(gridElement);
          gridElement.dataset.initialized = "true";
        });
      }
    }

    const dots = document.querySelectorAll(".progress-dot");
    const magneticElements = document.querySelectorAll(".magnetic");

    updateActiveDot(currentIndex);

    // Magnetic effect
    magneticElements.forEach((el) => {
      const element = el as HTMLElement;
      element.addEventListener("mousemove", (e) => {
        const rect = element.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        element.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
      });

      element.addEventListener("mouseleave", () => {
        element.style.transform = "translate(0px, 0px)";
      });
    });

    // Scroll event handler - uses refs to avoid stale closures
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (isScrollingRef.current) return;

      const now = Date.now();
      const timeSinceLastWheel = now - lastWheelTimeRef.current;

      // Clear any existing wheel debounce timeout
      if (wheelDebounceRef.current) {
        clearTimeout(wheelDebounceRef.current);
      }

      // If wheel events are coming too quickly (momentum scrolling), debounce them
      if (timeSinceLastWheel < 100) {
        wheelDebounceRef.current = setTimeout(() => {
          handleWheelAction(e);
        }, 150);
        return;
      }

      lastWheelTimeRef.current = now;
      handleWheelAction(e);
    };

    const handleWheelAction = (e: WheelEvent) => {
      const sections = document.querySelectorAll(".section");
      const currentIdx = currentIndexRef.current;
      let newIndex = currentIdx;

      // Enhanced wheel event detection to prevent over-scrolling
      const deltaY = e.deltaY;
      const absDeltaY = Math.abs(deltaY);

      // Define thresholds for valid scroll gestures
      const minScrollThreshold = 30; // Increased minimum scroll delta
      const maxScrollThreshold = 150; // Decreased maximum scroll delta to catch over-scrolls

      // Check if this is a reasonable scroll gesture (not too small, not too large)
      const isValidScroll =
        absDeltaY >= minScrollThreshold && absDeltaY <= maxScrollThreshold;

      if (isValidScroll) {
        if (deltaY > 0) {
          if (currentIdx < sections.length - 1) {
            newIndex = currentIdx + 1;
          }
        } else {
          if (currentIdx > 0) {
            newIndex = currentIdx - 1;
          }
        }

        // Only proceed if there's actually a change
        if (newIndex !== currentIdx) {
          // Clear any existing timeout
          if (scrollTimeoutRef.current) {
            clearTimeout(scrollTimeoutRef.current);
          }

          // Use functional updates to avoid stale closures
          setIsScrolling(true);
          setCurrentIndex(newIndex);
          changeSection(newIndex);

          // Reduced timeout for better responsiveness
          scrollTimeoutRef.current = setTimeout(() => {
            setIsScrolling(false);
            scrollTimeoutRef.current = null;
          }, 500);
        }
      }
    };

    // Touch event handlers - improved for mobile
    const handleTouchStart = (e: TouchEvent) => {
      setTouchStartY(e.touches[0].clientY);
      setTouchStartTime(Date.now());
      setIsTouchDragging(false);
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Prevent default scrolling behavior on touch move
      e.preventDefault();

      if (!isTouchDraggingRef.current) {
        const currentY = e.touches[0].clientY;
        const diff = Math.abs(touchStartYRef.current - currentY);

        // If user has moved more than 15px, consider it dragging/scrubbing
        if (diff > 15) {
          setIsTouchDragging(true);
        }
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isScrollingRef.current) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartYRef.current - touchEndY;
      const touchDuration = Date.now() - touchStartTimeRef.current;

      // Calculate velocity (pixels per millisecond)
      const velocity = Math.abs(diff) / Math.max(touchDuration, 1);

      const sections = document.querySelectorAll(".section");
      const currentIdx = currentIndexRef.current;
      let newIndex = currentIdx;

      // Improved swipe detection - more lenient for mobile
      const minSwipeDistance = 50; // Reduced minimum swipe distance
      const maxSwipeDuration = 1000; // Increased maximum duration
      const minVelocity = 0.05; // Reduced minimum velocity
      const maxVelocity = 3.0; // Increased maximum velocity

      // More lenient swipe detection
      const isValidSwipe =
        Math.abs(diff) > minSwipeDistance &&
        touchDuration < maxSwipeDuration &&
        velocity > minVelocity &&
        velocity < maxVelocity;

      if (isValidSwipe) {
        if (diff > 0) {
          // Swipe up - next section
          if (currentIdx < sections.length - 1) {
            newIndex = currentIdx + 1;
          }
        } else {
          // Swipe down - previous section
          if (currentIdx > 0) {
            newIndex = currentIdx - 1;
          }
        }
      }

      // Only proceed if there's actually a change
      if (newIndex !== currentIdx) {
        // Clear any existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        setIsScrolling(true);
        setCurrentIndex(newIndex);
        changeSection(newIndex);

        // Timeout for mobile responsiveness
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
          scrollTimeoutRef.current = null;
        }, 600);
      }
    };

    // Dot click handler
    const handleDotClick = (e: Event) => {
      if (isScrollingRef.current) return;

      const dot = e.currentTarget as HTMLElement;
      const index = parseInt(dot.getAttribute("data-index") || "0");
      const currentIdx = currentIndexRef.current;

      if (index !== currentIdx) {
        // Clear any existing timeout
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        setIsScrolling(true);
        setCurrentIndex(index);
        changeSection(index);

        // Set timeout with ref to ensure proper cleanup
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
          scrollTimeoutRef.current = null;
        }, 1100);
      }
    };

    // Add event listeners
    dots.forEach((dot) => {
      dot.addEventListener("click", handleDotClick);
    });

    window.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("touchstart", handleTouchStart, {
      passive: true,
    });
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    document.addEventListener("touchend", handleTouchEnd, { passive: true });

    // Cleanup function
    return () => {
      window.removeEventListener("wheel", handleWheel);
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);

      dots.forEach((dot) => {
        dot.removeEventListener("click", handleDotClick);
      });

      // Clear any pending timeouts
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = null;
      }
      if (wheelDebounceRef.current) {
        clearTimeout(wheelDebounceRef.current);
        wheelDebounceRef.current = null;
      }
    };
  }, [particlesLoaded, updateActiveDot]);

  const addSurveyMeasurements = () => {
    const particlesContainer = document.getElementById("particles-js");
    if (!particlesContainer) return;

    // Remove existing measurements
    const existingMeasurements = particlesContainer.querySelectorAll(
      ".survey-measurement"
    );
    existingMeasurements.forEach((el) => el.remove());

    // Survey measurement data
    const surveyData = [
      { text: "N 45°12'30\" E", x: 15, y: 20 },
      { text: "125.50'", x: 80, y: 15 },
      { text: "S 22°45'15\" W", x: 25, y: 75 },
      { text: "89.25'", x: 70, y: 80 },
      { text: "Elev: 1,245.6'", x: 50, y: 50 },
      { text: "BM #23", x: 85, y: 45 },
      { text: "POB", x: 10, y: 85 },
      { text: "N 78°30'00\" W", x: 60, y: 25 },
      { text: "156.75'", x: 35, y: 60 },
      { text: "IP #1", x: 90, y: 70 },
    ];

    surveyData.forEach((data, index) => {
      const measurementEl = document.createElement("div");
      measurementEl.className = "survey-measurement";
      measurementEl.textContent = data.text;
      measurementEl.style.cssText = `
        position: absolute;
        left: ${data.x}%;
        top: ${data.y}%;
        color: ${index % 2 === 0 ? "#db2225" : "#000000"};
        font-family: 'Inter', sans-serif;
        font-size: 12px;
        font-weight: 500;
        text-shadow: 1px 1px 2px rgba(224, 192, 151, 0.3);
        pointer-events: none;
        z-index: 5;
        opacity: 0;
        transform: translateX(-50%) translateY(-50%);
        animation: surveyFade ${3 + Math.random() * 4}s ease-in-out infinite;
        animation-delay: ${Math.random() * 2}s;
      `;
      particlesContainer.appendChild(measurementEl);
    });
  };

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/npm/particles.js@2.0.0/particles.min.js"
        onLoad={() => setParticlesLoaded(true)}
      />
      <div className="bg-white text-black font-body">
        <Nav />

        {/* Progress Indicator */}
        <div className="progress-bar">
          <div className="progress-dot" data-index="0"></div>
          <div className="progress-dot" data-index="1"></div>
          <div className="progress-dot" data-index="2"></div>
          <div className="progress-dot" data-index="3"></div>
        </div>

        {/* Sections */}
        <section className="section active bg-white" data-index="0">
          <div id="particles-js"></div>
          {/* Enhanced overlay for better text contrast - mobile optimized */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.45)",
              backdropFilter: "blur(2px)",
              zIndex: 1,
              pointerEvents: "none",
            }}
            className="md:backdrop-blur-none"
          ></div>
          {/* Additional mobile overlay for better readability */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.25)",
              backdropFilter: "blur(4px)",
              zIndex: 1,
              pointerEvents: "none",
            }}
            className="md:hidden"
          ></div>
          <div
            className="content-overlay container mx-auto h-full flex flex-col justify-center px-4 md:px-8"
            style={{ position: "relative", zIndex: 2 }}
          >
            <HeroTypewriter className="reveal active" />
            {/* Mobile and desktop button positioning */}
            <div
              className="reveal active mt-8 md:mt-0 md:absolute md:top-[650px] md:left-8"
              style={{
                transitionDelay: "0.4s",
              }}
            >
              <button
                className="bg-red-500 text-white px-8 py-3 md:px-12 md:py-4 font-body transition-all duration-300 magnetic text-base md:text-lg tracking-wide w-full md:w-auto"
                style={{
                  backgroundColor: "#ef4444",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#991b1b";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#ef4444";
                }}
                onClick={() => {
                  if (isScrollingRef.current) return;

                  const currentIdx = currentIndexRef.current;
                  if (1 !== currentIdx) {
                    if (scrollTimeoutRef.current) {
                      clearTimeout(scrollTimeoutRef.current);
                    }

                    setIsScrolling(true);
                    setCurrentIndex(1);

                    // Section change logic inline
                    const sections = document.querySelectorAll(".section");
                    sections.forEach((section) => {
                      section.classList.remove("active");
                    });
                    sections[1]?.classList.add("active");
                    updateActiveDot(1);

                    const reveals = sections[1]?.querySelectorAll(".reveal");
                    reveals?.forEach((el, i) => {
                      setTimeout(() => {
                        el.classList.add("active");
                      }, i * 75);
                    });

                    sections.forEach((section, i) => {
                      if (i !== 1) {
                        const otherReveals =
                          section.querySelectorAll(".reveal");
                        otherReveals.forEach((el) => {
                          el.classList.remove("active");
                        });
                      }
                    });

                    scrollTimeoutRef.current = setTimeout(() => {
                      setIsScrolling(false);
                      scrollTimeoutRef.current = null;
                    }, 1100);
                  }
                }}
              >
                View Our Projects
              </button>
            </div>
          </div>
        </section>

        <section className="section bg-sand-100" data-index="1">
          {/* Interactive Grid Background */}
          <div className="image-grid image-grid--img" id="interactive-grid">
            <div className="image-grid__item pos-1">
              <div
                className="image-grid__item-img"
                style={{ backgroundImage: "url('/images/survey-1.jpg')" }}
              ></div>
            </div>
            <div className="image-grid__item pos-2">
              <div
                className="image-grid__item-img"
                style={{ backgroundImage: "url('/images/survey-2.jpg')" }}
              ></div>
            </div>
            <div className="image-grid__item pos-3">
              <div
                className="image-grid__item-img"
                style={{ backgroundImage: "url('/images/survey-3.jpg')" }}
              ></div>
            </div>
            <div className="image-grid__item pos-4">
              <div
                className="image-grid__item-img"
                style={{ backgroundImage: "url('/images/survey-4.jpg')" }}
              ></div>
            </div>
            <div className="image-grid__item pos-5">
              <div
                className="image-grid__item-img"
                style={{ backgroundImage: "url('/images/survey-5.jpg')" }}
              ></div>
            </div>
            <div className="image-grid__item pos-6">
              <div
                className="image-grid__item-img"
                style={{ backgroundImage: "url('/images/survey-6.jpg')" }}
              ></div>
            </div>
            <div className="image-grid__item pos-7">
              <div
                className="image-grid__item-img"
                style={{ backgroundImage: "url('/images/survey-7.jpg')" }}
              ></div>
            </div>
            <div className="image-grid__item pos-8">
              <div
                className="image-grid__item-img"
                style={{ backgroundImage: "url('/images/survey-8.jpg')" }}
              ></div>
            </div>
            <div className="image-grid__item pos-9">
              <div
                className="image-grid__item-img"
                style={{ backgroundImage: "url('/images/survey-9.jpg')" }}
              ></div>
            </div>
            <div className="image-grid__item pos-10">
              <div
                className="image-grid__item-img"
                style={{ backgroundImage: "url('/images/survey-10.jpg')" }}
              ></div>
            </div>
          </div>
          {/* Light overlay for better contrast - similar to hero section */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(255, 255, 255, 0.45)",
              zIndex: 10,
              pointerEvents: "none",
            }}
          ></div>
          {/* Centered Content */}
          <div
            className="container mx-auto h-full flex flex-col justify-center items-center px-4 md:px-8 text-center"
            style={{ position: "relative", zIndex: 11 }}
          >
            <div
              className="reveal max-w-4xl mb-8 md:mb-16 mt-8"
              style={{
                padding: "24px 32px",
              }}
            >
              <div className="relative">
                {/* Glow background for title */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "120%",
                    height: "120%",
                    background:
                      "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 80%)",
                    filter: "blur(40px)",
                    transform: "translate(-50%, -50%) scaleX(1.5) scaleY(1)",
                    zIndex: -1,
                    pointerEvents: "none",
                  }}
                ></div>
                <h1
                  className="font-heading font-semibold heading-tight mb-2 mt-4 relative"
                  style={{
                    fontSize: "clamp(32px, 8vw, 88px)",
                    lineHeight: "0.9",
                    color: "#db2225",
                  }}
                >
                  Proof, in Every Plot.
                </h1>
              </div>
              <div className="relative">
                {/* Glow background for subtitle */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "110%",
                    height: "110%",
                    background:
                      "radial-gradient(ellipse at center, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 80%)",
                    filter: "blur(40px)",
                    transform: "translate(-50%, -50%) scaleX(1.5) scaleY(1)",
                    zIndex: -1,
                    pointerEvents: "none",
                  }}
                ></div>
                <p
                  className="font-body mt-6 pt-18 text-gray-700 relative"
                  style={{
                    fontSize: "clamp(16px, 4vw, 22px)",
                    lineHeight: "1.6",
                  }}
                >
                  For more than a decade, we&apos;ve been the trusted starting
                  point for developers, architects, and engineers — delivering
                  everything from precise land subdivisions and level transfers
                  to full set-outs and AutoCAD drafting.
                </p>
              </div>
            </div>

            {/* Stats Counters */}
            <div
              className="grid grid-cols-2 gap-4 md:gap-16 reveal mb-8 md:mb-16"
              style={{ transitionDelay: "0.4s" }}
            >
              <StatsCounter
                value={15}
                label="Years of Experience"
                duration={1}
                currentIndex={currentIndex}
                sectionIndex={1}
              />
              <StatsCounter
                value={200}
                label="Projects Completed"
                duration={1}
                currentIndex={currentIndex}
                sectionIndex={1}
              />
            </div>

            {/* Explore Projects Button - Centered */}
            <div
              className="reveal flex justify-center"
              style={{ transitionDelay: "0.6s" }}
            >
              <button
                className="bg-red-500 text-white px-8 py-3 md:px-12 md:py-4 font-body transition-all duration-300 magnetic text-base md:text-lg tracking-wide w-full md:w-auto max-w-xs md:max-w-none"
                style={{
                  backgroundColor: "#ef4444",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#991b1b";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#ef4444";
                }}
              >
                Explore Our Projects
              </button>
            </div>
          </div>
        </section>

        <section className="section bg-red-100" data-index="2">
          <div className="container mx-auto h-full flex flex-col justify-center px-4 md:px-8 pt-16 md:pt-24">
            <h2
              className="font-heading font-semibold heading-tight mb-8 md:mb-16 text-center reveal text-black"
              style={{ fontSize: "clamp(48px, 6vw, 72px)", lineHeight: "0.9" }}
            >
              Our Services
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-7xl mx-auto">
              {/* Land Surveying */}
              <div
                className="p-3 md:p-6 border-2 border-red-200 bg-white/70 backdrop-blur-sm rounded interactive-card reveal"
                style={{ transitionDelay: "0.025s" }}
              >
                <div className="text-2xl md:text-4xl mb-2 md:mb-4">🗺️</div>
                <h3 className="font-heading font-medium heading-tight mb-1 md:mb-3 text-base md:text-xl text-black">
                  Land Surveying
                </h3>
                <p className="font-body text-gray-700 text-xs md:text-base leading-relaxed">
                  Professional boundary surveys and property mapping with GPS
                  precision.
                </p>
              </div>

              {/* Building Set Out */}
              <div
                className="p-3 md:p-6 border-2 border-red-200 bg-white/70 backdrop-blur-sm rounded interactive-card reveal"
                style={{ transitionDelay: "0.05s" }}
              >
                <div className="text-2xl md:text-4xl mb-2 md:mb-4">🏗️</div>
                <h3 className="font-heading font-medium heading-tight mb-1 md:mb-3 text-base md:text-xl text-black">
                  Building Set Out
                </h3>
                <p className="font-body text-gray-700 text-xs md:text-base leading-relaxed">
                  Accurate construction staking and layout for precise building
                  placement.
                </p>
              </div>

              {/* L&C Sections */}
              <div
                className="p-3 md:p-6 border-2 border-red-200 bg-white/70 backdrop-blur-sm rounded interactive-card reveal"
                style={{ transitionDelay: "0.075s" }}
              >
                <div className="text-2xl md:text-4xl mb-2 md:mb-4">📏</div>
                <h3 className="font-heading font-medium heading-tight mb-1 md:mb-3 text-base md:text-xl text-black">
                  L&C Sections
                </h3>
                <p className="font-body text-gray-700 text-xs md:text-base leading-relaxed">
                  Longitudinal and cross-sectional surveys for infrastructure
                  projects.
                </p>
              </div>

              {/* AutoCAD Drafting */}
              <div
                className="p-3 md:p-6 border-2 border-red-200 bg-white/70 backdrop-blur-sm rounded interactive-card reveal"
                style={{ transitionDelay: "0.1s" }}
              >
                <div className="text-2xl md:text-4xl mb-2 md:mb-4">📐</div>
                <h3 className="font-heading font-medium heading-tight mb-1 md:mb-3 text-base md:text-xl text-black">
                  AutoCAD Drafting
                </h3>
                <p className="font-body text-gray-700 text-xs md:text-base leading-relaxed">
                  Technical drawings and plans with professional CAD services.
                </p>
              </div>

              {/* Level Transferring */}
              <div
                className="p-3 md:p-6 border-2 border-red-200 bg-white/70 backdrop-blur-sm rounded interactive-card reveal"
                style={{ transitionDelay: "0.125s" }}
              >
                <div className="text-2xl md:text-4xl mb-2 md:mb-4">📊</div>
                <h3 className="font-heading font-medium heading-tight mb-1 md:mb-3 text-base md:text-xl text-black">
                  Level Transferring
                </h3>
                <p className="font-body text-gray-700 text-xs md:text-base leading-relaxed">
                  Precise elevation transfer and height datum establishment.
                </p>
              </div>

              {/* Building Survey */}
              <div
                className="p-3 md:p-6 border-2 border-red-200 bg-white/70 backdrop-blur-sm rounded interactive-card reveal"
                style={{ transitionDelay: "0.15s" }}
              >
                <div className="text-2xl md:text-4xl mb-2 md:mb-4">🏢</div>
                <h3 className="font-heading font-medium heading-tight mb-1 md:mb-3 text-base md:text-xl text-black">
                  Building Survey
                </h3>
                <p className="font-body text-gray-700 text-xs md:text-base leading-relaxed">
                  Comprehensive structural assessments and condition reports.
                </p>
              </div>

              {/* Quantity Calculation */}
              <div
                className="p-3 md:p-6 border-2 border-red-200 bg-white/70 backdrop-blur-sm rounded interactive-card reveal"
                style={{ transitionDelay: "0.175s" }}
              >
                <div className="text-2xl md:text-4xl mb-2 md:mb-4">🧮</div>
                <h3 className="font-heading font-medium heading-tight mb-1 md:mb-3 text-base md:text-xl text-black">
                  Quantity Calculation
                </h3>
                <p className="font-body text-gray-700 text-xs md:text-base leading-relaxed">
                  Accurate material estimates and volume calculations for
                  projects.
                </p>
              </div>

              {/* Large Size Printing */}
              <div
                className="p-3 md:p-6 border-2 border-red-200 bg-white/70 backdrop-blur-sm rounded interactive-card reveal"
                style={{ transitionDelay: "0.2s" }}
              >
                <div className="text-2xl md:text-4xl mb-2 md:mb-4">🖨️</div>
                <h3 className="font-heading font-medium heading-tight mb-1 md:mb-3 text-base md:text-xl text-black">
                  Large Size Printing
                </h3>
                <p className="font-body text-gray-700 text-xs md:text-base leading-relaxed">
                  Professional plotting and printing services for technical
                  drawings.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section bg-sand-400" data-index="3">
          <div className="container mx-auto h-full flex flex-col justify-center items-center px-8 text-center">
            <h2
              className="font-heading font-semibold heading-tight mb-8 reveal floating text-black"
              style={{ fontSize: "clamp(64px, 8vw, 88px)", lineHeight: "0.9" }}
            >
              Let&apos;s Survey Together
            </h2>
            <p
              className="font-body text-gray-700 max-w-4xl mb-16 reveal"
              style={{
                fontSize: "22px",
                lineHeight: "1.5",
                transitionDelay: "0.2s",
              }}
            >
              Ready to start your surveying project? Contact our licensed
              professional surveyors for accurate, reliable, and timely
              surveying services.
            </p>
            <div className="reveal" style={{ transitionDelay: "0.4s" }}>
              <button
                className="bg-red-500 text-white px-16 py-5 font-body transition-all duration-300 magnetic text-xl tracking-wide rounded-full"
                style={{
                  backgroundColor: "#ef4444",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#991b1b";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#ef4444";
                }}
              >
                Get Your Quote
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
