# CliniBot AI

Your Intelligent AI Health Companion — a modern healthcare website with an AI chatbot powered by Google Gemini AI.

> **Disclaimer:** CliniBot AI is for **educational purposes only** and is **not a substitute for professional medical advice**. Always consult a qualified healthcare provider.

## Features

- **Home** — Hero section, feature highlights (Symptom Checker, Medicine Info, Lifestyle Tips, Nutrition, First Aid, Mental Wellness), and CTAs.
- **AI Chat** — Modern chatbot interface with chat bubbles, typing indicator, auto-scroll, markdown support, and Clear Chat.
- **About** — Describes CliniBot AI as an educational assistant powered by Google Gemini AI.
- **Contact** — Email, feedback form, and social media links.

## Tech Stack

- **Frontend:** React + TypeScript + Vite + Tailwind CSS
- **AI:** Google Gemini API (`gemini-1.5-flash`)
- **Backend:** Vercel Serverless Functions (`/api/chat`)
- **Icons:** lucide-react

## Getting Started

### Prerequisites

- Node.js 18+
- A Google Gemini API key (get one at <https://aistudio.google.com/app/apikey>)

### Installation

```bash
npm install
```

### Environment Variables

Copy the example env file and add your Gemini API key:

```bash
cp .env.example .env
```

Then edit `.env`:

```
GEMINI_API_KEY=your_gemini_api_key_here
```

> The API key is read **server-side only** in the Vercel serverless function (`api/chat.ts`) and is never exposed to the client.

### Development

```bash
npm run dev
```

The app runs at `http://localhost:5173`.

> Note: The `/api/chat` endpoint runs only on Vercel. For local development of the chat, deploy a preview to Vercel or use `vercel dev`.

### Build

```bash
npm run build
```

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Go to [vercel.com](https://vercel.com) and import the repository.
3. In the project settings, add the environment variable:
   - **Key:** `GEMINI_API_KEY`
   - **Value:** your Gemini API key
4. Deploy. Vercel auto-detects Vite and the `/api` serverless functions.

### Environment Variable on Vercel

| Variable          | Description                          |
| ----------------- | ------------------------------------ |
| `GEMINI_API_KEY`  | Google Gemini API key (server-side)  |

## Project Structure

```
├── api/
│   └── chat.ts            # Vercel serverless function (Gemini API)
├── src/
│   ├── components/        # Navbar, Footer, Logo, illustrations
│   ├── pages/             # Home, Chat, About, Contact
│   ├── App.tsx            # Router + layout
│   ├── main.tsx           # Entry point
│   └── index.css          # Tailwind + custom styles
├── vercel.json            # Vercel config
└── .env.example           # Example environment variables
```

## System Prompt

CliniBot AI uses the following system prompt to keep responses educational and safety-conscious:

> You are CliniBot AI, a medical education assistant. You provide educational health information only. Always remind users that your responses are not a substitute for professional medical advice. If a user reports severe symptoms such as chest pain, severe breathing difficulty, loss of consciousness, stroke symptoms, or suicidal thoughts, advise them to seek immediate emergency medical care.

## License

Educational project. © 2026 CliniBot AI.
