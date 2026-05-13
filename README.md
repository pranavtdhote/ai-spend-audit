# NeuralCost
**The definitive AI Spend Intelligence platform for startups.**

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg)

NeuralCost helps modern startups eliminate redundant AI tooling, optimize seat licenses, and negotiate volume API pricing. Built for the founders and engineering leaders who want to maximize their AI ROI.

## 🚀 Features
- **Dynamic Stack Auditing**: Select from a curated database of AI tools (ChatGPT, Claude, Cursor, Copilot, etc.) to instantly map your current spend.
- **Rule-Based Optimization Engine**: A deterministic, pure-function backend that identifies overlaps (e.g., Copilot vs. Cursor) and flags enterprise overspend.
- **Real-Time Financial Dashboard**: View potential savings, category breakdowns, and AI-generated executive summaries.
- **Local Persistence**: State is safely stored via Zustand `persist` (localStorage).
- **Export & Share**: Generate anonymized, public URLs to share with stakeholders (Supabase Integration).

## 🛠 Tech Stack
- **Frontend**: React 19, Vite 8, TypeScript (Strict TS6)
- **Styling**: Tailwind CSS v4, Framer Motion
- **State Management**: Zustand
- **Backend/DB**: Supabase (PostgreSQL), Resend (Transactional Email)
- **Testing & CI/CD**: Vitest, GitHub Actions
- **Deployment**: Vercel

## 📦 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/pranavtdhote/ai-spend-audit.git
   cd ai-spend-audit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file:
   ```env
   VITE_SUPABASE_URL=your_supabase_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   RESEND_API_KEY=your_resend_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 🧪 Testing
We use Vitest for unit testing the pure functions within the audit engine.
```bash
npm run test
```

## 📈 Deployment
This project is configured for seamless deployment on Vercel. 
Simply push to `main` and GitHub Actions will validate the build before Vercel deploys it to production.
