'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Eye, Lock, Database, X } from 'lucide-react';
import Header from '@/components/Header';
import FloatingLines from '@/components/FloatingLines';
import { Card } from '@/components/ui/card';

export default function Privacy() {
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
      <main className="relative z-10 px-4 py-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <motion.a
            href="/"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors mb-8"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </motion.a>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">Privacy Policy</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Your privacy is our top priority. This policy outlines how we collect, use, and protect your information.
            </p>
          </motion.div>

          {/* Content Sections */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="glass-effect border-emerald-500/20 p-8">
                <div className="flex items-center mb-4">
                  <Shield className="w-6 h-6 text-emerald-400 mr-3" />
                  <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    At UMBRAI, we are committed to minimizing data collection while providing our privacy-focused services:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Wallet addresses (only when interacting with our smart contracts)</li>
                    <li>Transaction data (encrypted and anonymized using ZK-SNARKs)</li>
                    <li>Usage analytics (anonymized and aggregated)</li>
                    <li>Technical error logs (no personal information)</li>
                  </ul>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Card className="glass-effect border-emerald-500/20 p-8">
                <div className="flex items-center mb-4">
                  <Eye className="w-6 h-6 text-emerald-400 mr-3" />
                  <h2 className="text-2xl font-bold text-white">Zero-Knowledge Privacy</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Our platform utilizes advanced zero-knowledge proof technology to ensure:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Complete transaction privacy - no one can see your transaction details</li>
                    <li>Identity protection - your wallet address and identity remain confidential</li>
                    <li>Amount confidentiality - transaction amounts are hidden from public view</li>
                    <li>Unlinkability - transactions cannot be linked to each other or to you</li>
                  </ul>
                  <p className="text-emerald-400 font-medium">
                    We cannot access your transaction data even if we wanted to - that's the power of zero-knowledge proofs.
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Card className="glass-effect border-emerald-500/20 p-8">
                <div className="flex items-center mb-4">
                  <Lock className="w-6 h-6 text-emerald-400 mr-3" />
                  <h2 className="text-2xl font-bold text-white">Data Security</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    We implement industry-leading security measures to protect any data we do collect:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>End-to-end encryption for all data transmissions</li>
                    <li>Decentralized storage to eliminate single points of failure</li>
                    <li>Regular security audits by third-party experts</li>
                    <li>Open-source code for complete transparency</li>
                    <li>No storage of sensitive personal information</li>
                  </ul>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="glass-effect border-emerald-500/20 p-8">
                <div className="flex items-center mb-4">
                  <Database className="w-6 h-6 text-emerald-400 mr-3" />
                  <h2 className="text-2xl font-bold text-white">Data Retention</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    We follow strict data retention policies:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Temporary logs are deleted within 24 hours</li>
                    <li>Analytics data is aggregated and anonymized immediately</li>
                    <li>No long-term storage of user activity or transaction data</li>
                    <li>Smart contract data exists only on the blockchain as encrypted proofs</li>
                  </ul>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <Card className="glass-effect border-emerald-500/20 p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    As a user of our platform, you have the right to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Complete privacy and anonymity</li>
                    <li>Access our open-source code at any time</li>
                    <li>Verify the integrity of our smart contracts</li>
                    <li>Use our services without providing personal information</li>
                    <li>Export any data you choose to provide</li>
                  </ul>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <Card className="glass-effect border-emerald-500/20 p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    If you have any questions about this Privacy Policy or our data practices:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Email: office@umbrai.dev</li>
                    <li>Twitter: x.com/UmbraiTech</li>
                    <li>GitHub: github.com/umbraitech</li>
                  </ul>
                  <p className="text-sm text-gray-400 mt-4">
                    Last updated: {new Date().toLocaleDateString()}
                  </p>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}