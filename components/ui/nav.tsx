"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice =
        window.innerWidth <= 768 || "ontouchstart" in window;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      const nav = document.querySelector("nav");
      if (nav && !nav.contains(event.target as Node) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Escape" && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);

    // Haptic feedback on mobile
    if (isMobile && "vibrate" in navigator) {
      navigator.vibrate(25);
    }
  };

  return (
    <>
      {/* Desktop navbar */}
      <nav className="hidden md:block fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 border-white/20 border rounded-full pt-3 pr-4 pb-3 pl-4 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/SMART-2.svg"
              alt="Smart Surveyors Logo"
              width={128}
              height={32}
              className="w-32 h-8"
              priority
            />
          </div>
          <div className="flex items-center space-x-6 text-xs text-gray-800 ml-8 font-body">
            <a
              href="#services"
              className="hover:text-red-500 transition-colors focus:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded px-2 py-1"
              tabIndex={0}
            >
              Services
            </a>
            <a
              href="#projects"
              className="hover:text-red-500 transition-colors focus:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded px-2 py-1"
              tabIndex={0}
            >
              Projects
            </a>
            <a
              href="#technology"
              className="hover:text-red-500 transition-colors focus:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded px-2 py-1"
              tabIndex={0}
            >
              Technology
            </a>
            <a
              href="#about"
              className="hover:text-red-500 transition-colors focus:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded px-2 py-1"
              tabIndex={0}
            >
              About
            </a>
            <a
              href="#contact"
              className="hover:text-red-500 transition-colors focus:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded px-2 py-1"
              tabIndex={0}
            >
              Contact
            </a>
          </div>
          <div className="flex items-center space-x-3 ml-8">
            <a
              href="#portal"
              className="text-xs font-medium font-body hover:text-red-500 transition-colors text-gray-800 focus:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 rounded px-2 py-1"
              tabIndex={0}
            >
              Client Portal
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile navbar */}
      <nav
        className={`md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isMobileMenuOpen
            ? "bg-white border-b border-gray-200 shadow-lg"
            : "bg-transparent"
        }`}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center justify-between px-4 py-3">
          {/* Hamburger menu button - Enhanced for mobile */}
          <button
            onClick={toggleMobileMenu}
            className={`p-3 rounded-lg transition-all duration-300 relative z-10 touch-manipulation ${
              isMobileMenuOpen
                ? "bg-gray-100 border border-gray-200"
                : "bg-white/10 border border-white/20 backdrop-blur-sm"
            }`}
            style={{
              minWidth: "48px",
              minHeight: "48px",
              WebkitTapHighlightColor: "transparent",
            }}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            type="button"
          >
            <div className="w-5 h-5 flex flex-col justify-center items-center">
              <div
                className={`w-4 h-0.5 bg-black transition-all duration-300 ${
                  isMobileMenuOpen ? "rotate-45 translate-y-1" : ""
                }`}
              ></div>
              <div
                className={`w-4 h-0.5 bg-black transition-all duration-300 ${
                  isMobileMenuOpen ? "opacity-0" : "mt-1"
                }`}
              ></div>
              <div
                className={`w-4 h-0.5 bg-black transition-all duration-300 ${
                  isMobileMenuOpen ? "-rotate-45 -translate-y-1" : "mt-1"
                }`}
              ></div>
            </div>
          </button>

          {/* Centered logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
            <Image
              src="/SMART-2.svg"
              alt="Smart Surveyors Logo"
              width={112}
              height={28}
              className="w-28 h-7"
              priority
            />
          </div>

          {/* Empty div to maintain flexbox spacing */}
          <div className="w-12"></div>
        </div>

        {/* Mobile menu dropdown - Enhanced */}
        <div
          id="mobile-menu"
          className={`absolute top-full left-0 right-0 bg-white border-b border-gray-200 transition-all duration-300 ${
            isMobileMenuOpen
              ? "opacity-100 visible transform translate-y-0"
              : "opacity-0 invisible transform -translate-y-2"
          }`}
          style={{
            maxHeight: isMobileMenuOpen ? "100vh" : "0",
            overflow: "hidden",
          }}
          role="menu"
          aria-label="Mobile navigation menu"
        >
          <div className="px-4 py-4 space-y-1 max-h-screen overflow-y-auto">
            <a
              href="#services"
              className="block text-gray-800 hover:text-red-500 active:text-red-500 transition-colors font-body py-3 px-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              style={{
                minHeight: "48px",
                fontSize: "16px",
                WebkitTapHighlightColor: "transparent",
              }}
              role="menuitem"
              tabIndex={isMobileMenuOpen ? 0 : -1}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Services
            </a>
            <a
              href="#projects"
              className="block text-gray-800 hover:text-red-500 active:text-red-500 transition-colors font-body py-3 px-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              style={{
                minHeight: "48px",
                fontSize: "16px",
                WebkitTapHighlightColor: "transparent",
              }}
              role="menuitem"
              tabIndex={isMobileMenuOpen ? 0 : -1}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Projects
            </a>
            <a
              href="#technology"
              className="block text-gray-800 hover:text-red-500 active:text-red-500 transition-colors font-body py-3 px-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              style={{
                minHeight: "48px",
                fontSize: "16px",
                WebkitTapHighlightColor: "transparent",
              }}
              role="menuitem"
              tabIndex={isMobileMenuOpen ? 0 : -1}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Technology
            </a>
            <a
              href="#about"
              className="block text-gray-800 hover:text-red-500 active:text-red-500 transition-colors font-body py-3 px-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              style={{
                minHeight: "48px",
                fontSize: "16px",
                WebkitTapHighlightColor: "transparent",
              }}
              role="menuitem"
              tabIndex={isMobileMenuOpen ? 0 : -1}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </a>
            <a
              href="#contact"
              className="block text-gray-800 hover:text-red-500 active:text-red-500 transition-colors font-body py-3 px-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              style={{
                minHeight: "48px",
                fontSize: "16px",
                WebkitTapHighlightColor: "transparent",
              }}
              role="menuitem"
              tabIndex={isMobileMenuOpen ? 0 : -1}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </a>

            {/* Separator */}
            <div className="border-t border-gray-200 my-2"></div>

            <a
              href="#portal"
              className="block text-gray-800 hover:text-red-500 active:text-red-500 transition-colors font-body py-3 px-2 rounded-lg hover:bg-gray-50 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              style={{
                minHeight: "48px",
                fontSize: "16px",
                WebkitTapHighlightColor: "transparent",
              }}
              role="menuitem"
              tabIndex={isMobileMenuOpen ? 0 : -1}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Client Portal
            </a>

            {/* CTA Button */}
            <div className="pt-2">
              <a
                href="#quote"
                className="block bg-red-500 text-white text-center py-3 px-4 rounded-lg font-medium hover:bg-red-600 active:bg-red-700 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
                style={{
                  minHeight: "48px",
                  fontSize: "16px",
                  WebkitTapHighlightColor: "transparent",
                }}
                role="menuitem"
                tabIndex={isMobileMenuOpen ? 0 : -1}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Get Quote
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Desktop Get Quote button - positioned separately */}
      <div className="hidden md:block fixed top-6 right-8 z-50">
        <a
          href="#quote"
          className="flex items-center justify-center h-12 px-6 hover:bg-red-600 focus:bg-red-600 transition-colors text-sm font-medium font-body text-white bg-red-500 rounded-full shadow-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          tabIndex={0}
        >
          Get Quote
        </a>
      </div>

      {/* Mobile menu overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 z-40 md:hidden transition-opacity duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
}
