'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Users, Github, X, Send, ArrowRight, Target, Zap, Award, Globe } from 'lucide-react';
import Header from '@/components/Header';
import FloatingLines from '@/components/FloatingLines';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function About() {
  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-black to-emerald-950/20" />
        <div className="absolute inset-0">
          <FloatingLines 
            enabledWaves={['top', 'middle']}
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
      <div className="relative z-10 pt-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <motion.a
              href="/"
              className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </motion.a>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center overflow-hidden shadow-lg shadow-emerald-500/25">
                <img 
                  src="/privacyswap.png" 
                  alt="PrivacySwap" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              <span className="gradient-text">About PrivacySwap</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto">
              The future of privacy-first DeFi on Solana blockchain
            </p>
          </motion.div>

          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-16"
          >
            <Card className="glass-effect border-emerald-500/20 p-8 lg:p-12">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-emerald-500/20 rounded-xl">
                  <Target className="w-8 h-8 text-emerald-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                PrivacySwap is dedicated to revolutionizing decentralized finance by providing complete privacy and security for Solana users. 
                We believe that financial privacy is a fundamental right, and our zero-knowledge proof technology 
                ensures that your transactions remain completely confidential while maintaining the highest standards of security.
              </p>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    title: "Complete Privacy",
                    description: "Zero-knowledge proofs ensure no transaction details are ever revealed",
                    icon: <Shield className="w-6 h-6" />
                  },
                  {
                    title: "Solana Native",
                    description: "Built specifically for Solana's high-speed, low-cost ecosystem",
                    icon: <Zap className="w-6 h-6" />
                  },
                  {
                    title: "Developer Friendly",
                    description: "Open-source with comprehensive APIs and SDKs",
                    icon: <Github className="w-6 h-6" />
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                  >
                    <Card className="glass-effect border-emerald-500/20 p-6 h-full">
                      <div className="flex items-start space-x-4">
                        <div className="text-emerald-400">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                          <p className="text-gray-400 text-sm">{item.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-16"
          >
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Privacy Swap",
                  description: "Exchange tokens privately using advanced ZK-SNARKs technology",
                  features: [
                    "Zero-knowledge proofs",
                    "No transaction history",
                    "Complete anonymity",
                    "MEV protection"
                  ]
                },
                {
                  title: "REPL Environment",
                  description: "Interactive coding environment for privacy-preserving applications",
                  features: [
                    "Real-time execution",
                    "Privacy-focused libraries",
                    "Collaborative coding",
                    "Instant deployment"
                  ]
                },
                {
                  title: "Developer Tools",
                  description: "Comprehensive SDKs and APIs for building on PrivacySwap",
                  features: [
                    "TypeScript support",
                    "Comprehensive docs",
                    "Testing frameworks",
                    "Community support"
                  ]
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                >
                  <Card className="glass-effect border-emerald-500/20 p-8 h-full">
                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-gray-300 mb-6">{feature.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {feature.features.map((item, itemIndex) => (
                        <div key={itemIndex} className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                          <span className="text-gray-400 text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Technology Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mb-16"
          >
            <Card className="glass-effect border-emerald-500/20 p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Technology Stack</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    name: "Zero-Knowledge Proofs",
                    description: "Advanced cryptographic proofs for privacy",
                    icon: <Shield className="w-8 h-8" />
                  },
                  {
                    name: "Solana Blockchain",
                    description: "High-performance Layer 1 blockchain",
                    icon: <Zap className="w-8 h-8" />
                  },
                  {
                    name: "Rust & TypeScript",
                    description: "Secure and efficient programming languages",
                    icon: <Github className="w-8 h-8" />
                  },
                  {
                    name: "WebAssembly",
                    description: "Fast execution in browser environments",
                    icon: <Globe className="w-8 h-8" />
                  }
                ].map((tech, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Card className="glass-effect border-emerald-500/20 p-6 text-center h-full hover:border-emerald-500/40 transition-all duration-300">
                      <div className="text-emerald-400 mb-4">
                        {tech.icon}
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{tech.name}</h3>
                      <p className="text-gray-400 text-sm">{tech.description}</p>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Team */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mb-16"
          >
            <Card className="glass-effect border-emerald-500/20 p-8 lg:p-12">
              <h2 className="text-3xl font-bold text-white mb-8 text-center">Our Team</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    name: "Privacy Experts",
                    role: "Cryptography & ZK Research",
                    description: "Leading researchers in zero-knowledge proof systems"
                  },
                  {
                    name: "Blockchain Engineers",
                    role: "Solana Protocol Development",
                    description: "Experienced Solana ecosystem developers"
                  },
                  {
                    name: "Security Team",
                    role: "Smart Contract Auditing",
                    description: "Expert auditors ensuring platform security"
                  },
                  {
                    name: "Product Designers",
                    role: "UX/UI Development",
                    description: "Creating intuitive and secure user experiences"
                  },
                  {
                    name: "Community Managers",
                    role: "Developer Relations & Support",
                    description: "Building and supporting our developer community"
                  },
                  {
                    name: "Core Contributors",
                    role: "Open Source Development",
                    description: "Maintaining and improving our codebase"
                  }
                ].map((member, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.9 + index * 0.1 }}
                  >
                    <Card className="glass-effect border-emerald-500/20 p-6 h-full">
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center">
                          <Users className="w-6 h-6 text-emerald-400" />
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{member.name}</h3>
                          <p className="text-emerald-400 text-sm mb-2">{member.role}</p>
                          <p className="text-gray-400 text-sm">{member.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
            className="mb-16"
          >
            <Card className="glass-effect border-emerald-500/20 p-8 lg:p-12">
              <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-emerald-500/20 rounded-xl">
                  <Award className="w-8 h-8 text-emerald-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">Achievements & Recognition</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Security Audited",
                    description: "All smart contracts audited by leading security firms",
                    icon: <Shield className="w-6 h-6 text-emerald-400" />
                  },
                  {
                    title: "Open Source",
                    description: "Fully transparent codebase with community contributions",
                    icon: <Github className="w-6 h-6 text-emerald-400" />
                  },
                  {
                    title: "Growing Community",
                    description: "10,000+ developers building on PrivacySwap",
                    icon: <Users className="w-6 h-6 text-emerald-400" />
                  },
                  {
                    title: "Enterprise Ready",
                    description: "Used by leading DeFi protocols and institutions",
                    icon: <Award className="w-6 h-6 text-emerald-400" />
                  }
                ].map((achievement, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 1.1 + index * 0.1 }}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="text-emerald-400 mt-1">
                        {achievement.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{achievement.title}</h3>
                        <p className="text-gray-400 text-sm">{achievement.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mb-12"
          >
            <Card className="glass-effect border-emerald-500/20 p-8 lg:p-12 text-center">
              <h2 className="text-3xl font-bold text-white mb-6">
                Join the Privacy Revolution
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Be part of the movement that's bringing true privacy to Solana DeFi. 
                Start building, swapping, and innovating with PrivacySwap today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  asChild
                  href="https://app.umbrai.dev"
                  className="bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-semibold"
                >
                  <a href="https://app.umbrai.dev" className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Try Privacy Swap
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
                <Button
                  asChild
                  href="/about"
                  className="bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30"
                >
                  <a href="https://github.com/Jbgabreal/privacyswap" className="flex items-center">
                    <Github className="w-5 h-5 mr-2" />
                    View Documentation
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </a>
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}