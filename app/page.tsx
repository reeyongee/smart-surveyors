"use client";

import { useEffect, useState, useRef } from "react";
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

// Mobile viewport height fix
function setViewportHeight() {
  const vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
}

// Stats Counter Component
const StatsCounter = ({
  value,
  label,
  duration,
}: {
  value: number;
  label: string;
  duration: number;
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-red-600 mb-2">
        {isVisible ? <CountUp to={value} duration={duration} /> : "0"}+
      </div>
      <div className="text-lg md:text-xl text-gray-700">{label}</div>
    </div>
  );
};

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);

  // Handle viewport height changes for mobile browsers
  useEffect(() => {
    setViewportHeight();

    const handleResize = () => {
      setViewportHeight();
    };

    const handleOrientationChange = () => {
      setTimeout(setViewportHeight, 100);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("orientationchange", handleOrientationChange);

    // Handle mobile browser address bar show/hide
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setViewportHeight();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("orientationchange", handleOrientationChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Initialize particles
  useEffect(() => {
    if (typeof window !== "undefined" && window.particlesJS) {
      window.particlesJS("particles-js", {
        particles: {
          number: { value: 80, density: { enable: true, value_area: 800 } },
          color: { value: "#ffffff" },
          shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 5 },
          },
          opacity: {
            value: 0.5,
            random: false,
            anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
          },
          size: {
            value: 3,
            random: true,
            anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: "#ffffff",
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 6,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
            attract: { enable: false, rotateX: 600, rotateY: 1200 },
          },
        },
        interactivity: {
          detect_on: "canvas",
          events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" },
            resize: true,
          },
          modes: {
            grab: { distance: 400, line_linked: { opacity: 1 } },
            bubble: {
              distance: 400,
              size: 40,
              duration: 2,
              opacity: 8,
              speed: 3,
            },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
          },
        },
        retina_detect: true,
      });
      setIsLoaded(true);
    }
  }, []);

  return (
    <>
      <Script
        src="https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js"
        strategy="beforeInteractive"
        onLoad={() => {
          if (typeof window !== "undefined" && window.particlesJS) {
            window.particlesJS("particles-js", {
              particles: {
                number: {
                  value: 80,
                  density: { enable: true, value_area: 800 },
                },
                color: { value: "#ffffff" },
                shape: {
                  type: "circle",
                  stroke: { width: 0, color: "#000000" },
                  polygon: { nb_sides: 5 },
                },
                opacity: {
                  value: 0.5,
                  random: false,
                  anim: {
                    enable: false,
                    speed: 1,
                    opacity_min: 0.1,
                    sync: false,
                  },
                },
                size: {
                  value: 3,
                  random: true,
                  anim: {
                    enable: false,
                    speed: 40,
                    size_min: 0.1,
                    sync: false,
                  },
                },
                line_linked: {
                  enable: true,
                  distance: 150,
                  color: "#ffffff",
                  opacity: 0.4,
                  width: 1,
                },
                move: {
                  enable: true,
                  speed: 6,
                  direction: "none",
                  random: false,
                  straight: false,
                  out_mode: "out",
                  bounce: false,
                  attract: { enable: false, rotateX: 600, rotateY: 1200 },
                },
              },
              interactivity: {
                detect_on: "canvas",
                events: {
                  onhover: { enable: true, mode: "repulse" },
                  onclick: { enable: true, mode: "push" },
                  resize: true,
                },
                modes: {
                  grab: { distance: 400, line_linked: { opacity: 1 } },
                  bubble: {
                    distance: 400,
                    size: 40,
                    duration: 2,
                    opacity: 8,
                    speed: 3,
                  },
                  repulse: { distance: 200, duration: 0.4 },
                  push: { particles_nb: 4 },
                  remove: { particles_nb: 2 },
                },
              },
              retina_detect: true,
            });
            setIsLoaded(true);
          }
        }}
      />

      <div className="overflow-x-hidden">
        <Nav />

        {/* Hero Section */}
        <section id="home" className="hero-section mobile-viewport-fix">
          <div id="particles-js"></div>
          <div className="hero-content">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 font-playfair">
                <HeroTypewriter />
              </h1>
              <p className="text-lg md:text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
                Professional land surveying services with over 15 years of
                experience. We provide precise boundary surveys, building
                set-outs, AutoCAD drafting, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="#contact"
                  className="btn btn-primary text-lg px-8 py-4 bg-white text-red-600 hover:bg-gray-100"
                >
                  Get Free Quote
                </a>
                <a
                  href="#services"
                  className="btn btn-secondary text-lg px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-red-600"
                >
                  Our Services
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="stats" className="stats-section full-section">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 font-playfair">
                Trusted by Professionals
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Our commitment to precision and reliability has made us the
                preferred choice for surveying professionals across the region.
              </p>
            </div>

            <div className="responsive-grid">
              <StatsCounter
                value={500}
                label="Projects Completed"
                duration={2000}
              />
              <StatsCounter
                value={15}
                label="Years Experience"
                duration={1500}
              />
              <StatsCounter
                value={98}
                label="Client Satisfaction"
                duration={2500}
              />
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="about-section full-section">
          <div className="container mx-auto">
            <div className="responsive-grid items-center">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 font-playfair">
                  About Smart Surveyors
                </h2>
                <p className="text-lg md:text-xl text-gray-600 mb-6 leading-relaxed">
                  With over 15 years of experience in the surveying industry,
                  Smart Surveyors has built a reputation for delivering
                  accurate, reliable, and efficient surveying solutions.
                </p>
                <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                  Our team of licensed professionals uses the latest technology
                  and equipment to ensure precision in every project, from
                  residential boundary surveys to large-scale commercial
                  developments.
                </p>
                <a
                  href="#contact"
                  className="btn btn-primary text-lg px-8 py-4"
                >
                  Learn More
                </a>
              </div>
              <div className="order-first md:order-last">
                <div className="bg-gradient-to-br from-red-600 to-red-800 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 font-playfair">
                    Why Choose Us?
                  </h3>
                  <ul className="space-y-4 text-lg">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-white rounded-full mr-4"></span>
                      Licensed & Insured Professionals
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-white rounded-full mr-4"></span>
                      Latest GPS & Laser Technology
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-white rounded-full mr-4"></span>
                      Fast Turnaround Times
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-white rounded-full mr-4"></span>
                      Competitive Pricing
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="services-section full-section">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-gray-900 font-playfair">
                Our Services
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                Comprehensive surveying solutions tailored to meet your specific
                needs, from residential properties to commercial developments.
              </p>
            </div>

            <div className="responsive-grid">
              <div className="card">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 font-playfair">
                  Boundary Surveys
                </h3>
                <p className="text-gray-600 mb-6">
                  Precise property line determination using advanced GPS and
                  laser technology to establish accurate boundaries for your
                  property.
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• Property line identification</li>
                  <li>• Corner monument location</li>
                  <li>• Encroachment detection</li>
                  <li>• Legal documentation</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 font-playfair">
                  Building Set-Outs
                </h3>
                <p className="text-gray-600 mb-6">
                  Professional construction layout services to ensure your
                  building is positioned correctly according to approved plans
                  and regulations.
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• Foundation layout</li>
                  <li>• Elevation certificates</li>
                  <li>• Construction staking</li>
                  <li>• As-built surveys</li>
                </ul>
              </div>

              <div className="card">
                <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 font-playfair">
                  AutoCAD Drafting
                </h3>
                <p className="text-gray-600 mb-6">
                  Professional CAD drafting services to create detailed,
                  accurate technical drawings for your surveying and
                  construction projects.
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• Survey plat preparation</li>
                  <li>• Site plan development</li>
                  <li>• Topographic mapping</li>
                  <li>• Technical illustrations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="contact-section full-section">
          <div className="container mx-auto">
            <div className="responsive-grid items-center">
              <div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white font-playfair">
                  Ready to Get Started?
                </h2>
                <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                  Contact us today for a free consultation and quote. Our
                  experienced team is ready to help you with all your surveying
                  needs.
                </p>
                <div className="space-y-4 text-gray-300">
                  <div className="flex items-center text-lg">
                    <span className="w-6 h-6 bg-red-600 rounded-full mr-4 flex items-center justify-center">
                      📞
                    </span>
                    (555) 123-4567
                  </div>
                  <div className="flex items-center text-lg">
                    <span className="w-6 h-6 bg-red-600 rounded-full mr-4 flex items-center justify-center">
                      ✉️
                    </span>
                    info@smartsurveyors.com
                  </div>
                  <div className="flex items-center text-lg">
                    <span className="w-6 h-6 bg-red-600 rounded-full mr-4 flex items-center justify-center">
                      📍
                    </span>
                    123 Survey Street, Your City, ST 12345
                  </div>
                </div>
              </div>
              <div className="order-first md:order-last">
                <div className="bg-white rounded-2xl p-8">
                  <h3 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900 font-playfair">
                    Get Your Free Quote
                  </h3>
                  <form className="space-y-6">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="(555) 123-4567"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="service"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Service Needed
                      </label>
                      <select
                        id="service"
                        name="service"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      >
                        <option value="">Select a service</option>
                        <option value="boundary">Boundary Survey</option>
                        <option value="building">Building Set-Out</option>
                        <option value="autocad">AutoCAD Drafting</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-medium text-gray-700 mb-2"
                      >
                        Project Details
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={4}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        placeholder="Tell us about your project..."
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full btn btn-primary text-lg py-4"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
