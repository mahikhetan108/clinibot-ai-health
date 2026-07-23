import { useState, useRef, useEffect, FormEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  Send,
  Trash2,
  Activity,
  AlertTriangle,
  ShieldCheck,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTIONS = [
  'What are common causes of headaches?',
  'How can I improve my sleep naturally?',
  'Explain the benefits of a balanced diet.',
  'What are basic first-aid steps for a minor burn?',
];

const WELCOME: Message = {
  id: 'welcome',
  role: 'assistant',
  content:
    "Hello! I'm **CliniBot AI**, your educational AI health companion. 🩺\n\nI can help you understand symptoms, learn about general health topics, and explore wellness guidance. Remember — I provide **educational information only** and I'm not a substitute for professional medical advice.\n\nWhat would you like to know today?",
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: text.trim(),
    };
    const history = [...messages, userMsg];
    setMessages(history);
    setInput('');
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text.trim(),
          history: history
            .filter((m) => m.id !== 'welcome')
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      const data = await res.json();
      const reply: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content: data.reply ?? 'Sorry, I could not generate a response.',
      };
      setMessages((prev) => [...prev, reply]);
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Something went wrong. Please try again.';
      setError(msg);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: `I'm sorry, I ran into an issue: **${msg}**. Please try again in a moment.`,
        },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const clearChat = () => {
    setMessages([WELCOME]);
    setError(null);
    setInput('');
    inputRef.current?.focus();
  };

  return (
    <div className="pt-16 h-screen flex flex-col bg-gradient-to-b from-primary-50/40 to-white">
      {/* Chat header */}
      <div className="border-b border-slate-200 bg-white/80 backdrop-blur-lg sticky top-16 z-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-md">
              <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-teal-400 border-2 border-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-slate-900 leading-tight">CliniBot AI</h1>
              <p className="text-xs text-teal-600 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse" />
                Online · Powered by Gemini
              </p>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            <span className="hidden sm:inline">Clear Chat</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-5">
          {/* Emergency banner */}
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-red-50 border border-red-200">
            <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-red-700 leading-relaxed">
              <strong>Medical emergency?</strong> If you or someone else is experiencing chest
              pain, severe breathing difficulty, loss of consciousness, stroke symptoms, or
              suicidal thoughts — call your local emergency number immediately. CliniBot AI is
              not for emergencies.
            </p>
          </div>

          {messages.map((m) => (
            <MessageBubble key={m.id} message={m} />
          ))}

          {loading && <TypingIndicator />}

          {/* Suggestions (only when just the welcome message is present) */}
          {messages.length === 1 && !loading && (
            <div className="pt-2">
              <p className="text-sm text-slate-500 mb-3 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary-500" />
                Try asking:
              </p>
              <div className="grid sm:grid-cols-2 gap-3">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => sendMessage(s)}
                    className="text-left px-4 py-3 rounded-xl bg-white border border-slate-200 text-sm text-slate-700 hover:border-primary-300 hover:bg-primary-50/50 hover:shadow-sm transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-slate-200 bg-white/80 backdrop-blur-lg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          {error && (
            <div className="mb-2 flex items-center gap-2 text-sm text-red-600">
              <AlertTriangle className="w-4 h-4" />
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex items-end gap-3">
            <div className="flex-1 relative">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder="Ask about symptoms, nutrition, wellness…"
                className="w-full resize-none px-4 py-3 pr-12 rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400 focus:bg-white transition-all max-h-32"
                style={{ minHeight: '48px' }}
                disabled={loading}
              />
            </div>
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-r from-primary-600 to-primary-500 text-white shadow-md shadow-primary-500/30 hover:shadow-lg hover:shadow-primary-500/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0"
            >
              {loading ? <RefreshCw className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            </button>
          </form>
          <p className="mt-2 text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5" />
            Educational information only — not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex gap-3 animate-slide-in ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center shadow-sm ${
          isUser ? 'bg-slate-700' : 'gradient-bg'
        }`}
      >
        {isUser ? (
          <span className="text-white text-sm font-bold">You</span>
        ) : (
          <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
        )}
      </div>
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? 'bg-gradient-to-br from-primary-600 to-primary-500 text-white rounded-tr-md shadow-md shadow-primary-500/20'
            : 'bg-white text-slate-800 border border-slate-100 rounded-tl-md shadow-sm'
        }`}
      >
        {isUser ? (
          <p className="whitespace-pre-wrap">{message.content}</p>
        ) : (
          <div className="chat-markdown">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{message.content}</ReactMarkdown>
          </div>
        )}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex gap-3 animate-slide-in">
      <div className="flex-shrink-0 w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-sm">
        <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
      </div>
      <div className="px-5 py-4 rounded-2xl rounded-tl-md bg-white border border-slate-100 shadow-sm">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-primary-400 animate-bounce-dot" style={{ animationDelay: '0s' }} />
          <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-bounce-dot" style={{ animationDelay: '0.16s' }} />
          <span className="w-2.5 h-2.5 rounded-full bg-primary-400 animate-bounce-dot" style={{ animationDelay: '0.32s' }} />
        </div>
      </div>
    </div>
  );
}
