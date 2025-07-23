"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

// Mobile Navigation Icons
const HomeIcon = ({ active }: { active: boolean }) => (
  <svg
    className={`w-6 h-6 ${active ? "text-red-600" : "text-gray-600"}`}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const ServicesIcon = ({ active }: { active: boolean }) => (
  <svg
    className={`w-6 h-6 ${active ? "text-red-600" : "text-gray-600"}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    />
  </svg>
);

const ProjectsIcon = ({ active }: { active: boolean }) => (
  <svg
    className={`w-6 h-6 ${active ? "text-red-600" : "text-gray-600"}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
    />
  </svg>
);

const ContactIcon = ({ active }: { active: boolean }) => (
  <svg
    className={`w-6 h-6 ${active ? "text-red-600" : "text-gray-600"}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
);

const MenuIcon = () => (
  <svg
    className="w-6 h-6 text-gray-800"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4 6h16M4 12h16M4 18h16"
    />
  </svg>
);

const CloseIcon = () => (
  <svg
    className="w-6 h-6 text-gray-800"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M6 18L18 6M6 6l12 12"
    />
  </svg>
);

const PhoneIcon = () => (
  <svg
    className="w-5 h-5"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
);

export default function Nav() {
  const [activeTab, setActiveTab] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection and viewport setup
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Handle menu close on route change
  useEffect(() => {
    // Close menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const menu = document.querySelector(".mobile-menu");
      const menuButton = document.querySelector(".menu-button");

      if (
        menu &&
        !menu.contains(event.target as Node) &&
        menuButton &&
        !menuButton.contains(event.target as Node) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMenuOpen]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen, isMobile]);

  const navigationItems = [
    { id: "home", label: "Home", href: "#home", icon: HomeIcon },
    {
      id: "services",
      label: "Services",
      href: "#services",
      icon: ServicesIcon,
    },
    { id: "projects", label: "Projects", href: "#stats", icon: ProjectsIcon },
    { id: "contact", label: "Contact", href: "#contact", icon: ContactIcon },
  ];

  const secondaryMenuItems = [
    { label: "About Us", href: "#about" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Blog", href: "/blog" },
    { label: "Quote Request", href: "#quote" },
  ];

  const handleTabClick = (tabId: string, href: string) => {
    setActiveTab(tabId);

    // Smooth scroll to section
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCall = () => {
    window.location.href = "tel:+1234567890";
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <nav className="mobile-nav">
        <div className="container mx-auto h-full flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 touch-target">
            <Image
              src="/logo.svg"
              alt="Smart Surveyors Logo"
              width={32}
              height={32}
              className="w-8 h-8"
            />
            <span className="font-bold text-lg text-gray-800 hidden-mobile">
              Smart Surveyors
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className={`touch-target px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === item.id
                    ? "text-red-600 bg-red-50"
                    : "text-gray-700 hover:text-red-600 hover:bg-gray-50"
                }`}
                onClick={() => handleTabClick(item.id, item.href)}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={handleCall}
              className="btn-secondary flex items-center space-x-2"
            >
              <PhoneIcon />
              <span>Call Now</span>
            </button>
            <Link href="#quote" className="btn-primary">
              Get Quote
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="menu-button md:hidden touch-target-comfortable"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </nav>

      {/* Mobile Hamburger Menu Overlay */}
      {isMenuOpen && isMobile && (
        <div className="mobile-menu fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          />

          {/* Menu Content */}
          <div className="absolute right-0 top-0 h-full w-80 max-w-sm bg-white shadow-xl overflow-y-auto">
            <div className="safe-top p-6">
              {/* Menu Header */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-2">
                  <Image
                    src="/logo.svg"
                    alt="Smart Surveyors"
                    width={24}
                    height={24}
                  />
                  <span className="font-bold text-lg">Smart Surveyors</span>
                </div>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="touch-target"
                  aria-label="Close menu"
                >
                  <CloseIcon />
                </button>
              </div>

              {/* Primary Navigation */}
              <div className="space-y-2 mb-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  Navigation
                </h3>
                {navigationItems.map((item) => (
                  <Link
                    key={item.id}
                    href={item.href}
                    className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      activeTab === item.id
                        ? "bg-red-50 text-red-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                    onClick={() => {
                      handleTabClick(item.id, item.href);
                      setIsMenuOpen(false);
                    }}
                  >
                    <item.icon active={activeTab === item.id} />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>

              {/* Secondary Menu */}
              <div className="space-y-2 mb-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
                  More
                </h3>
                {secondaryMenuItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="block p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Contact Actions */}
              <div className="space-y-3 pt-6 border-t border-gray-200">
                <button
                  onClick={() => {
                    handleCall();
                    setIsMenuOpen(false);
                  }}
                  className="w-full btn-secondary flex items-center justify-center space-x-2"
                >
                  <PhoneIcon />
                  <span>Call (555) 123-4567</span>
                </button>
                <Link
                  href="#quote"
                  className="w-full btn-primary text-center block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Get Free Quote
                </Link>
              </div>

              {/* Contact Info */}
              <div className="mt-8 pt-6 border-t border-gray-200 text-sm text-gray-600">
                <p className="mb-2">
                  <strong className="text-gray-800">Email:</strong>
                  <br />
                  info@smartsurveyors.com
                </p>
                <p>
                  <strong className="text-gray-800">Address:</strong>
                  <br />
                  123 Survey Street
                  <br />
                  Your City, ST 12345
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Navigation (Mobile Only) */}
      <nav className="bottom-nav md:hidden">
        <div className="flex items-center justify-around h-full safe-bottom">
          {navigationItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleTabClick(item.id, item.href)}
              className="touch-target-comfortable flex flex-col items-center justify-center space-y-1 transition-colors"
            >
              <item.icon active={activeTab === item.id} />
              <span
                className={`text-xs font-medium ${
                  activeTab === item.id ? "text-red-600" : "text-gray-600"
                }`}
              >
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
