import { Link } from 'react-router-dom';
import { Activity, Mail, Twitter, Linkedin, Github, Facebook } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-md">
                <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
              </div>
              <span className="font-display text-xl font-bold text-white">
                CliniBot<span className="text-teal-400"> AI</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Your intelligent AI health companion. Understand symptoms, get wellness
              guidance, and learn about general health — all powered by Google Gemini AI.
            </p>
            <div className="flex items-center gap-3 mt-5">
              {[
                { Icon: Twitter, label: 'Twitter' },
                { Icon: Linkedin, label: 'LinkedIn' },
                { Icon: Github, label: 'GitHub' },
                { Icon: Facebook, label: 'Facebook' },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-primary-600 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3 text-sm">Navigation</h3>
            <ul className="space-y-2 text-sm">
              {[
                { to: '/', label: 'Home' },
                { to: '/chat', label: 'AI Chat' },
                { to: '/about', label: 'About' },
                { to: '/contact', label: 'Contact' },
              ].map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-slate-400 hover:text-teal-400 transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-white mb-3 text-sm">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:hello@clinibot.ai" className="text-slate-400 hover:text-teal-400 transition-colors flex items-center gap-2">
                  <Mail className="w-4 h-4" /> hello@clinibot.ai
                </a>
              </li>
              <li className="text-slate-400">Privacy Policy</li>
              <li className="text-slate-400">Terms of Use</li>
              <li className="text-slate-400">Disclaimer</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © 2026 CliniBot AI · Educational purposes only · Not medical advice.
          </p>
          <p className="text-xs text-slate-500 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
            Powered by Google Gemini AI
          </p>
        </div>
      </div>
    </footer>
  );
}
