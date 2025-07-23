"use client";

import { useState } from "react";

export default function Nav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Desktop navbar */}
      <nav className="hidden md:block fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-white/10 border-white/20 border rounded-full pt-3 pr-4 pb-3 pl-4 shadow-xl backdrop-blur-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/SMART-2.svg"
              alt="Smart Surveyors"
              className="w-32 h-8"
            />
          </div>
          <div className="flex items-center space-x-6 text-xs text-gray-800 ml-8 font-body">
            <a href="#" className="hover:text-red-500 transition-colors">
              Services
            </a>
            <a href="#" className="hover:text-red-500 transition-colors">
              Projects
            </a>
            <a href="#" className="hover:text-red-500 transition-colors">
              Technology
            </a>
            <a href="#" className="hover:text-red-500 transition-colors">
              About
            </a>
            <a href="#" className="hover:text-red-500 transition-colors">
              Contact
            </a>
          </div>
          <div className="flex items-center space-x-3 ml-8">
            <a
              href="#"
              className="text-xs font-medium font-body hover:text-red-500 transition-colors text-gray-800"
            >
              Client Portal
            </a>
          </div>
        </div>
      </nav>

      {/* Mobile navbar */}
      <nav
        className={`md:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 py-3 ${
          isMobileMenuOpen
            ? "bg-white border-b border-gray-200"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Hamburger menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-2 rounded-lg transition-all duration-300 relative z-10 ${
              isMobileMenuOpen
                ? "bg-gray-100 border border-gray-200"
                : "bg-white/10 border border-white/20"
            }`}
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
            <img
              src="/SMART-2.svg"
              alt="Smart Surveyors"
              className="w-28 h-7"
            />
          </div>

          {/* Empty div to maintain flexbox spacing */}
          <div className="w-20"></div>
        </div>

        {/* Mobile menu dropdown */}
        <div
          className={`absolute top-full left-0 right-0 bg-white border-b border-gray-200 transition-all duration-300 ${
            isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="px-4 py-4 space-y-4">
            <a
              href="#"
              className="block text-gray-800 hover:text-red-500 transition-colors font-body"
            >
              Services
            </a>
            <a
              href="#"
              className="block text-gray-800 hover:text-red-500 transition-colors font-body"
            >
              Projects
            </a>
            <a
              href="#"
              className="block text-gray-800 hover:text-red-500 transition-colors font-body"
            >
              Technology
            </a>
            <a
              href="#"
              className="block text-gray-800 hover:text-red-500 transition-colors font-body"
            >
              About
            </a>
            <a
              href="#"
              className="block text-gray-800 hover:text-red-500 transition-colors font-body"
            >
              Contact
            </a>
            <a
              href="#"
              className="block text-gray-800 hover:text-red-500 transition-colors font-body border-t border-gray-200 pt-4"
            >
              Client Portal
            </a>
            <a
              href="#"
              className="block bg-red-500 text-white px-4 py-2 rounded-full text-center font-medium hover:bg-red-600 transition-colors"
            >
              Get Quote
            </a>
          </div>
        </div>
      </nav>

      {/* Desktop Get Quote button - positioned separately */}
      <div className="hidden md:block fixed top-6 right-8 z-50">
        <a
          href="#"
          className="flex items-center justify-center h-12 px-6 hover:bg-red-600 transition-colors text-sm font-medium font-body text-white bg-red-500 rounded-full shadow-xl"
        >
          Get Quote
        </a>
      </div>
    </>
  );
}
