# Sahay (सहाय) — AI Citizen Grievance & Document Assistant

**Sahay** is an AI-powered citizen assistant designed to simplify complex government documents, legal notices, and official procedures. Built for accessibility and multi-language inclusivity, Sahay empowers citizens to understand notices, detect critical deadlines, verify official processes, and draft grievance responses with ease.

---

## 🌟 Key Features

- **📄 Document Analysis & Simplification**:
  - Understand complex government notices, tax alerts, electricity/utility disputes, and legal letters.
  - Automatically extracts key details: issuing authority, reference numbers, actionable items, and critical deadlines.
  - Generates clear, plain-language summaries in plain terms.

- **🌐 Multilingual Support**:
  - Full support across multiple languages (English, Hindi, Bengali, and more).
  - Accurate localized explanations and responses.

- **⏱️ Critical Deadlines & Urgency Detection**:
  - Highlights upcoming compliance dates and consequence warnings.
  - Provides step-by-step resolution checklists.

- **🛡️ Built-in Security & Safety**:
  - Prompt injection sanitizer and sensitive PII masking.
  - Official procedure verification against verified government portals (Digital India, UMANG, CPGRAMS, etc.).

- **🎙️ Voice Assistant & High Accessibility**:
  - Integrated speech recognition & text-to-speech for seamless accessibility.
  - High-contrast modes, font size scaling, and screen-reader-friendly semantic structure.

- **📝 Grievance & Response Generator**:
  - Formulate structured RTI applications, appeal letters, and grievance submissions.
  - Pre-filled templates tailored to specific document types.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Frontend**: [React 19](https://react.dev/), Vanilla CSS & Modern Design System
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/)
- **Language**: TypeScript

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or 20+
- npm, pnpm, or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/debangshuuii/Sahay.git
   cd Sahay
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (optional for live AI provider integrations):
   ```bash
   cp .env.example .env
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🧪 Testing

Run unit tests with:
```bash
npm run test
```

---

## 📄 License

This project is licensed under the MIT License.
