#  PrivacySwap --- The Future of Private Swap on Solana

<img src="public/banner.png" width="100%" />

------------------------------------------------------------------------

## 🚀 What is PrivacySwap?

**PrivacySwap** is a next‑generation privacy‑focused DeFi platform built on
**Solana**, powered by
**Zero‑Knowledge Proofs (ZK‑SNARKs)** and an encrypted AI
infrastructure.

We enable users to perform **anonymous swaps**, protect on‑chain
identities, and build privacy apps with a fully integrated SDK.

------------------------------------------------------------------------

## ✨ Core Features

### 🔄 Instant Crypto Exchange

Real-time cryptocurrency swapping powered by FixedFloat API with support for fixed and floating exchange rates.

### 🔒 Privacy Swap

Anonymous token swaps powered by ZK‑SNARK validation and encrypted
routing.

### 🧠 AI‑Powered Web SDK

A privacy‑preserving AI engine for building encrypted, automated dApps.

### ⚡ Ultra‑Fast Execution

Optimized for Solana → sub‑second confirmation.

### 🛡 Enterprise‑Grade Encryption

Secure key handling, encrypted messaging, and identity shielding.

### 🌐 Developer Toolkit

REPL, SDK, and full REST API for zk‑powered app development.

------------------------------------------------------------------------

## 📁 Project Structure

    privacyswap/
    ├── prisma/
    ├── public/
    ├── mini-services/
    ├── examples/
    ├── src/
    │   ├── app/
    │   ├── components/
    │   ├── hooks/
    │   └── lib/
    └── README.md

------------------------------------------------------------------------

## 🧩 Tech Stack

### **Frontend**

-   Next.js 15
-   TypeScript 5
-   Tailwind CSS 4
-   shadcn/ui
-   Framer Motion
-   Lucide Icons

### **Backend**

-   REST API
-   NextAuth.js
-   Prisma ORM
-   FixedFloat API Integration

### **Blockchain**

-   Solana
-   Rust Smart Contracts
-   ZK‑SNARK Circuits

------------------------------------------------------------------------

## 🏁 Quick Start

``` bash
git clone https://github.com/Jbgabreal/privacyswap.git
cd privacyswap

npm install
```

### Environment Setup

1. Copy the example environment file:
``` bash
cp .env.example .env
```

2. Edit `.env` and add your FixedFloat API credentials:
```
FIXEDFLOAT_API_KEY=your_api_key_here
FIXEDFLOAT_API_SECRET=your_api_secret_here
DATABASE_URL="file:./dev.db"
```

Get your API credentials from [FixedFloat](https://fixedfloat.com).

### Database Setup

Initialize the database:

``` bash
npm run db:generate
npm run db:push
```

### Run Development Server

``` bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

``` bash
npm run build
npm start
```

### Database Commands

- `npm run db:generate` - Generate Prisma Client
- `npm run db:push` - Push schema changes to database (development)
- `npm run db:migrate` - Create and run migrations
- `npm run db:reset` - Reset database (⚠️ deletes all data)

------------------------------------------------------------------------

## 🛡 Security

### Smart Contract Audit

-   Independently audited
-   zk‑circuits validated
-   Regular security reviews

------------------------------------------------------------------------

## 🤝 Contributing

``` bash
git checkout -b feature/new-feature
git add .
git commit -m "feat: new feature"
git push origin feature/new-feature
```

------------------------------------------------------------------------

## 🌐 Community & Links

-   Website: https://privacyswap.dev
-   App: https://app.privacyswap.dev
-   X (Twitter): https://x.com/PrivacySwap

------------------------------------------------------------------------

