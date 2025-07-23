// Utility functions for GSAP grid animation

// Linear interpolation function
export const lerp = (a, b, n) => (1 - n) * a + n * b;

// Map number x from range [a, b] to [c, d]
export const map = (x, a, b, c, d) => ((x - a) * (d - c)) / (b - a) + c;

// Get mouse position relative to the viewport
export const getMousePos = (ev) => {
  return {
    x: ev.clientX,
    y: ev.clientY,
  };
};

// Calculate viewport size
export const calcWinsize = () => {
  if (typeof window === "undefined") {
    return { width: 1920, height: 1080 }; // Default values for SSR
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

// Get random number between min and max
export const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
