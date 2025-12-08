'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Shield, AlertTriangle, Code, Users, X } from 'lucide-react';
import Header from '@/components/Header';
import FloatingLines from '@/components/FloatingLines';
import { Card } from '@/components/ui/card';

export default function Terms() {
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
              <span className="gradient-text">Terms of Service</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              By using UMBRAI, you agree to these terms and conditions designed to protect both users and the ecosystem.
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
                  <h2 className="text-2xl font-bold text-white">Acceptance of Terms</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    By accessing or using UMBRAI's services, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                  </p>
                  <p>
                    If you do not agree to these terms, you may not access or use our services.
                  </p>
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
                  <AlertTriangle className="w-6 h-6 text-emerald-400 mr-3" />
                  <h2 className="text-2xl font-bold text-white">Risk Disclaimer</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p className="font-medium text-emerald-400">
                    IMPORTANT: Cryptocurrency and DeFi activities involve significant risks.
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Smart contract risk: Code vulnerabilities may lead to loss of funds</li>
                    <li>Market volatility: Asset values can fluctuate dramatically</li>
                    <li>Regulatory uncertainty: Laws and regulations may change</li>
                    <li>Technical risks: Network congestion, oracle failures, etc.</li>
                    <li>Privacy risks: While we use ZK-SNARKs, no system is 100% infallible</li>
                  </ul>
                  <p>
                    <strong>Never invest more than you can afford to lose.</strong> Do your own research before using any DeFi protocol.
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
                  <Code className="w-6 h-6 text-emerald-400 mr-3" />
                  <h2 className="text-2xl font-bold text-white">Service Description</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    UMBRAI provides privacy-focused decentralized finance services including:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Privacy Swap - Anonymous token exchanges using ZK-SNARKs</li>
                    <li>REPL - Private computational environment for developers</li>
                    <li>Privacy tools and infrastructure for Web3 applications</li>
                  </ul>
                  <p>
                    Our services are provided "as is" without warranties of any kind, express or implied.
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Card className="glass-effect border-emerald-500/20 p-8">
                <h2 className="text-2xl font-bold text-white mb-4">User Responsibilities</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    As a user of UMBRAI, you agree to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Use the services for lawful purposes only</li>
                    <li>Not attempt to exploit vulnerabilities or manipulate the system</li>
                    <li>Keep your private keys secure - we cannot recover lost funds</li>
                    <li>Comply with applicable laws and regulations</li>
                    <li>Not use the services for illegal activities including money laundering</li>
                    <li>Respect the privacy and security of other users</li>
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
                <h2 className="text-2xl font-bold text-white mb-4">Privacy and Data</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    Our commitment to privacy:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>We do not collect personal information unless voluntarily provided</li>
                    <li>Transactions are anonymized using zero-knowledge proofs</li>
                    <li>We cannot access your transaction data or private information</li>
                    <li>For detailed privacy practices, see our Privacy Policy</li>
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
                <div className="flex items-center mb-4">
                  <Users className="w-6 h-6 text-emerald-400 mr-3" />
                  <h2 className="text-2xl font-bold text-white">Limitation of Liability</h2>
                </div>
                <div className="space-y-4 text-gray-300">
                  <p>
                    To the fullest extent permitted by law:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>UMBRAI is not liable for any loss of funds or assets</li>
                    <li>We are not responsible for market losses or technical failures</li>
                    <li>Our total liability shall not exceed any fees you have paid</li>
                    <li>We are not liable for indirect, incidental, or consequential damages</li>
                  </ul>
                  <p className="text-sm text-emerald-400">
                    You use DeFi protocols at your own risk. Smart contracts are immutable once deployed.
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <Card className="glass-effect border-emerald-500/20 p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Intellectual Property</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    UMBRAI's code, designs, and intellectual property are protected by applicable laws:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Our smart contracts are open-source for transparency</li>
                    <li>You may review but not copy our proprietary code</li>
                    <li>The UMBRAI name and branding are trademarked</li>
                    <li>Unauthorized use of our intellectual property is prohibited</li>
                  </ul>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <Card className="glass-effect border-emerald-500/20 p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    We reserve the right to:
                  </p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Suspend or terminate access for violations of these terms</li>
                    <li>Modify or discontinue services at any time</li>
                    <li>Update these terms with reasonable notice</li>
                  </ul>
                  <p>
                    You may stop using our services at any time. However, transactions on the blockchain are irreversible.
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <Card className="glass-effect border-emerald-500/20 p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Governing Law</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    These Terms of Service are governed by the laws of decentralized protocols and the jurisdiction where our entity is registered.
                  </p>
                  <p>
                    Disputes shall be resolved through arbitration when possible, following industry best practices for DeFi protocols.
                  </p>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1 }}
            >
              <Card className="glass-effect border-emerald-500/20 p-8">
                <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    For questions about these Terms of Service:
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