'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Shield, Zap, Lock } from 'lucide-react';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { 
      name: 'Privacy Swap', 
      href: 'https://app.umbrai.dev',
      external: true,
      icon: <Lock className="w-4 h-4" />
    },
    { 
      name: 'REPL', 
      href: 'https://repl.umbrai.dev',
      external: true,
      icon: <Zap className="w-4 h-4" />
    },
    { name: 'About', href: '/about'},
    {name: 'Contact', href: '/contact'}
  ];

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-black/20 backdrop-blur-xl border-b border-white/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.a 
              href="/"
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="relative">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/25 overflow-hidden">
                  <img 
                    src="/umbrai.png" 
                    alt="UMBRAI" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold text-white">
                  UMBRAI
                </h1>
                <p className="text-xs lg:text-sm text-emerald-400 font-medium">
                  Privacy First
                </p>
              </div>
            </motion.a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.name}
                  href={item.href}
                  target={item.external ? '_blank' : '_self'}
                  rel={item.external ? 'noopener noreferrer' : undefined}
                  className="flex items-center space-x-2 text-gray-300 hover:text-emerald-400 transition-colors duration-200 font-medium"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.icon && item.icon}
                  <span>{item.name}</span>
                  {item.external && (
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </motion.a>
              ))}
            </nav>

            {/* Mobile Menu Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="lg:hidden bg-black/40 backdrop-blur-xl border-b border-white/10"
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    target={item.external ? '_blank' : '_self'}
                    rel={item.external ? 'noopener noreferrer' : undefined}
                    className="flex items-center space-x-3 text-gray-300 hover:text-emerald-400 transition-colors duration-200 font-medium py-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index, duration: 0.3 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.icon && item.icon}
                    <span>{item.name}</span>
                    {item.external && (
                      <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    )}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Gradient Overlay */}
      <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-b from-emerald-900/20 to-transparent pointer-events-none z-40"></div>
    </>
  );
};

export default Header;