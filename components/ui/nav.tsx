"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Enhanced mobile detection with touch support
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice =
        window.innerWidth <= 768 ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    const handleResize = () => {
      checkMobile();
      // Close mobile menu on resize to desktop
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileMenuOpen]);

  // Track scroll position for nav styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside or pressing escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      const nav = document.querySelector("nav");
      const target = event.target as Node;

      if (nav && !nav.contains(target) && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside, {
        passive: true,
      });
      document.addEventListener("keydown", handleKeyDown);

      // Prevent body scroll when menu is open
      document.body.classList.add("mobile-menu-open");
    } else {
      document.body.classList.remove("mobile-menu-open");
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove("mobile-menu-open");
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen((prev) => !prev);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  // Navigation items with proper accessibility
  const navItems = [
    { href: "#home", label: "Home", ariaLabel: "Navigate to home section" },
    { href: "#about", label: "About", ariaLabel: "Navigate to about section" },
    {
      href: "#services",
      label: "Services",
      ariaLabel: "Navigate to services section",
    },
    {
      href: "#contact",
      label: "Contact",
      ariaLabel: "Navigate to contact section",
    },
  ];

  // Handle smooth scrolling with proper focus management
  const handleNavClick = useCallback(
    (href: string, event: React.MouseEvent) => {
      event.preventDefault();

      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        // Close mobile menu first
        closeMobileMenu();

        // Smooth scroll to target
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });

        // Update URL without triggering navigation
        history.replaceState(null, "", href);

        // Set focus to target for accessibility
        setTimeout(() => {
          targetElement.focus({ preventScroll: true });
        }, 500);
      }
    },
    [closeMobileMenu]
  );

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm"
          : "bg-white/90 backdrop-blur-sm"
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a
              href="#home"
              onClick={(e) => handleNavClick("#home", e)}
              className="flex items-center space-x-2 touch-manipulation focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-lg p-2 -m-2"
              aria-label="Smart Surveyors - Go to home"
            >
              <Image
                src="/logo.svg"
                alt="Smart Surveyors Logo"
                width={40}
                height={40}
                className="w-8 h-8 sm:w-10 sm:h-10"
                priority
              />
              <span className="font-playfair font-bold text-lg sm:text-xl text-red-600 hidden sm:block">
                Smart Surveyors
              </span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => handleNavClick(item.href, e)}
                  className="px-4 py-2 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-200 font-medium touch-manipulation focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  aria-label={item.ariaLabel}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* CTA Button - Desktop */}
          <div className="hidden md:block">
            <a
              href="#contact"
              onClick={(e) => handleNavClick("#contact", e)}
              className="btn btn-primary inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 touch-manipulation focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              aria-label="Get a quote - Contact us"
            >
              Get Quote
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-3 rounded-lg text-gray-700 hover:text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 touch-manipulation"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              style={{ minWidth: "48px", minHeight: "48px" }} // Ensure 48x48px touch target
            >
              <span className="sr-only">
                {isMobileMenuOpen ? "Close menu" : "Open menu"}
              </span>

              {/* Animated hamburger icon */}
              <div className="w-6 h-6 relative">
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? "rotate-45 top-3" : "top-1"
                  }`}
                />
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 top-3 ${
                    isMobileMenuOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute block h-0.5 w-6 bg-current transform transition-all duration-300 ${
                    isMobileMenuOpen ? "-rotate-45 top-3" : "top-5"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`md:hidden fixed inset-0 top-16 sm:top-20 z-40 transform transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? "translate-x-0 opacity-100 visible"
            : "translate-x-full opacity-0 invisible"
        }`}
        aria-hidden={!isMobileMenuOpen}
      >
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />

        {/* Menu panel */}
        <div className="mobile-menu relative bg-white/98 backdrop-blur-md h-full overflow-y-auto">
          <div className="px-4 py-6 space-y-2">
            {/* Mobile navigation items */}
            {navItems.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleNavClick(item.href, e)}
                className="block w-full text-left px-6 py-4 rounded-xl text-lg font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-all duration-200 touch-manipulation focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                style={{ minHeight: "56px" }} // Extra touch-friendly height for mobile
                aria-label={item.ariaLabel}
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                <span className="flex items-center">
                  <span className="w-2 h-2 bg-red-600 rounded-full mr-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  {item.label}
                </span>
              </a>
            ))}

            {/* Mobile CTA Button */}
            <div className="pt-6 px-6">
              <a
                href="#contact"
                onClick={(e) => handleNavClick("#contact", e)}
                className="btn btn-primary w-full inline-flex items-center justify-center px-6 py-4 text-base font-medium rounded-xl transition-all duration-200 touch-manipulation focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                style={{ minHeight: "56px" }} // Extra touch-friendly height
                aria-label="Get a quote - Contact us"
                tabIndex={isMobileMenuOpen ? 0 : -1}
              >
                Get Quote
              </a>
            </div>

            {/* Contact info in mobile menu */}
            <div className="pt-8 px-6 border-t border-gray-200 mt-8">
              <div className="text-sm text-gray-600 space-y-2">
                <p className="font-medium text-gray-900">
                  Ready to get started?
                </p>
                <p>
                  Call us at{" "}
                  <a
                    href="tel:+1234567890"
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    (123) 456-7890
                  </a>
                </p>
                <p>
                  Or{" "}
                  <a
                    href="mailto:info@smartsurveyors.com"
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    email us
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
