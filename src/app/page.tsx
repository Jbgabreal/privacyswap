'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Lock, Eye, Github, Send, Copy, Check } from 'lucide-react';
import Header from '@/components/Header';
import FloatingLines from '@/components/FloatingLines';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

export default function Home() {
  const [copiedAddress, setCopiedAddress] = useState(false);
  const { toast } = useToast();

  const contractAddress = "TBA";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress);
      setCopiedAddress(true);
      toast({
        title: "Contract address copied!",
        description: "The address has been copied to your clipboard.",
      });
      setTimeout(() => setCopiedAddress(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the address manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-black to-emerald-950/20" />
        <div className="absolute inset-0">
          <FloatingLines 
            enabledWaves={['top', 'middle', 'bottom']}
            lineCount={1}
            lineDistance={5}
            bendRadius={5}
            bendStrength={-0.5}
            interactive={true}
            parallax={true}
          />
        </div>
      </div>

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 py-20">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="mb-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full glass-effect text-emerald-400 text-sm font-medium mb-6">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy-First Web3 Platform
                </span>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-8"
              >
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-emerald-500 rounded-full blur-md opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative bg-black/40 backdrop-blur-sm rounded-full px-6 py-3 border-2 border-emerald-500 cursor-pointer hover:bg-black/60 transition-all duration-300" onClick={copyToClipboard}>
                      <div className="flex items-center gap-3">
                        <code className="text-white font-mono text-sm tracking-wide">
                          TBA
                        </code>
                        {copiedAddress ? (
                          <Check className="w-4 h-4 text-emerald-400" />
                        ) : (
                          <Copy className="w-4 h-4 text-emerald-400" />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-black mb-6">
                <span className="gradient-text text-glow">UMBRAI</span>
              </h1>
              
              <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
                Experience the future of decentralized privacy with zero-knowledge proofs, 
                secure swaps, and private DeFi solutions
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.a
                  href="https://app.umbrai.dev"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-200 glow-green"
                >
                  <Lock className="w-5 h-5 mr-2" />
                  Privacy Swap
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.a>
                
                <motion.a
                  href="https://repl.umbrai.dev"
                  className="inline-flex items-center px-8 py-4 glass-effect text-emerald-400 font-semibold rounded-xl hover:bg-white/10 transition-all duration-200 border border-emerald-500/30"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Try REPL
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="gradient-text">Why Choose UMBRAI?</span>
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Built for the privacy-conscious crypto investor who values security above all else
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <Eye className="w-8 h-8" />,
                  title: "Zero-Knowledge Proofs",
                  description: "Advanced ZK-SNARKs technology ensures complete transaction privacy while maintaining network integrity"
                },
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "Military-Grade Security",
                  description: "Enterprise-level encryption and security protocols protect your assets at all times"
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "Lightning Fast",
                  description: "Optimized for speed without compromising on privacy or security features"
                },
                {
                  icon: <Lock className="w-8 h-8" />,
                  title: "Private Swaps",
                  description: "Exchange tokens privately without revealing your identity or transaction history"
                },
                {
                  icon: <Github className="w-8 h-8" />,
                  title: "Open Source",
                  description: "Fully transparent and auditable codebase built by the community for the community"
                },
                {
                  icon: <Send className="w-8 h-8" />,
                  title: "Cross-Chain",
                  description: "Seamlessly interact with multiple blockchain networks through a single interface"
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="glass-effect border-emerald-500/20 p-8 h-full hover:border-emerald-500/40 transition-all duration-300">
                    <div className="text-emerald-400 mb-4">
                      {feature.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="glass-effect rounded-3xl p-12 border border-emerald-500/30"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="gradient-text">Ready to Experience True Privacy?</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                Join thousands of crypto investors who have already made the switch to privacy-first DeFi
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.a
                  href="https://app.umbrai.dev"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-green-700 transition-all duration-200 glow-green"
                >
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </motion.a>
                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-8 py-4 glass-effect text-emerald-400 font-semibold rounded-xl hover:bg-white/10 transition-all duration-200 border border-emerald-500/30"
                >
                  Contact Us
                  <Send className="w-5 h-5 ml-2" />
                </motion.a>
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 glass-effect border-t border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden">
                  <img 
                    src="/umbrai.png" 
                    alt="UMBRAI" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold gradient-text">UMBRAI</h3>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                The future of decentralized privacy. Built with zero-knowledge proofs for the security-conscious crypto investor.
              </p>
              <div className="flex space-x-4">
                <motion.a
                  href="https://github.com/umbraitech"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <Github className="w-5 h-5" />
                </motion.a>
                <motion.a
                  href="https://x.com/UmbraiTech"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 glass-effect rounded-lg flex items-center justify-center text-gray-400 hover:text-emerald-400 transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </motion.a>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Products</h4>
              <ul className="space-y-2">
                <li><a href="https://app.umbrai.dev" className="text-gray-400 hover:text-emerald-400 transition-colors">Privacy Swap</a></li>
                <li><a href="https://repl.umbrai.dev" className="text-gray-400 hover:text-emerald-400 transition-colors">REPL</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="/contact" className="text-gray-400 hover:text-emerald-400 transition-colors">Contact Us</a></li>
                <li><a href="/privacy" className="text-gray-400 hover:text-emerald-400 transition-colors">Privacy Policy</a></li>
                <li><a href="/terms" className="text-gray-400 hover:text-emerald-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-emerald-500/20 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © 2025 UMBRAI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}