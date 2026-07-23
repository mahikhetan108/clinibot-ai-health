import { Link } from 'react-router-dom';
import { Activity } from 'lucide-react';

export default function Logo({ className = '' }: { className?: string }) {
  return (
    <Link to="/" className={`flex items-center gap-2.5 group ${className}`}>
      <div className="relative w-9 h-9 rounded-xl gradient-bg flex items-center justify-center shadow-md shadow-primary-500/30 transition-transform group-hover:scale-105">
        <Activity className="w-5 h-5 text-white" strokeWidth={2.5} />
        <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-teal-400 border-2 border-white animate-pulse" />
      </div>
      <span className="font-display text-xl font-bold tracking-tight text-slate-800">
        CliniBot<span className="text-primary-600"> AI</span>
      </span>
    </Link>
  );
}
