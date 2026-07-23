import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  Mail,
  Send,
  Twitter,
  Linkedin,
  Github,
  Facebook,
  MapPin,
  MessageSquare,
  CheckCircle2,
  Loader2,
} from 'lucide-react';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    setFeedback('');

    try {
      // Simulate submission (no backend required for the feedback form)
      await new Promise((r) => setTimeout(r, 1200));
      setStatus('sent');
      setFeedback("Thanks for reaching out! We'll get back to you soon.");
      setForm({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    } catch {
      setStatus('error');
      setFeedback('Something went wrong. Please email us directly.');
    }
  };

  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/60 to-white py-16 lg:py-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-sm font-medium mb-6">
            <Mail className="w-4 h-4" />
            Get in touch
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            We'd love to <span className="gradient-text">hear from you</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Have a question, suggestion, or feedback about CliniBot AI? Reach out using the form
            below or connect with us on social media.
          </p>
        </div>
      </section>

      {/* Contact cards */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            <div className="p-6 rounded-2xl border border-slate-100 shadow-sm text-center hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Email Us</h3>
              <a href="mailto:hello@clinibot.ai" className="text-sm text-primary-600 hover:underline">
                hello@clinibot.ai
              </a>
            </div>
            <Link to="/chat" className="p-6 rounded-2xl border border-slate-100 shadow-sm text-center hover:shadow-md hover:border-teal-200 transition-all block">
              <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Live Chat</h3>
              <p className="text-sm text-teal-600 font-medium hover:underline">Talk to CliniBot AI anytime →</p>
            </Link>
            <div className="p-6 rounded-2xl border border-slate-100 shadow-sm text-center hover:shadow-md transition-all">
              <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">Location</h3>
              <p className="text-sm text-slate-500">Remote · Worldwide</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* Form */}
            <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-1">Send us a message</h2>
              <p className="text-sm text-slate-500 mb-6">
                We typically respond within 1–2 business days.
              </p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="you@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us what's on your mind…"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/40 focus:border-primary-400 focus:bg-white transition-all resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="btn-primary w-full sm:w-auto disabled:opacity-60"
                >
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </button>
                {status === 'sent' && (
                  <div className="flex items-center gap-2 text-sm text-teal-700 bg-teal-50 px-4 py-3 rounded-xl border border-teal-200">
                    <CheckCircle2 className="w-5 h-5" />
                    {feedback}
                  </div>
                )}
                {status === 'error' && (
                  <div className="text-sm text-red-600 bg-red-50 px-4 py-3 rounded-xl border border-red-200">
                    {feedback}
                  </div>
                )}
              </form>
            </div>

            {/* Social + info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gradient-to-br from-primary-600 to-teal-500 rounded-2xl p-7 text-white shadow-lg">
                <h3 className="font-display text-xl font-bold mb-2">Connect with us</h3>
                <p className="text-primary-50 text-sm mb-5">
                  Follow CliniBot AI on social media for health tips, updates, and announcements.
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { Icon: Twitter, label: 'Twitter' },
                    { Icon: Linkedin, label: 'LinkedIn' },
                    { Icon: Github, label: 'GitHub' },
                    { Icon: Facebook, label: 'Facebook' },
                  ].map(({ Icon, label }) => (
                    <a
                      key={label}
                      href="#"
                      className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-white/10 backdrop-blur hover:bg-white/20 transition-all text-sm font-medium"
                    >
                      <Icon className="w-5 h-5" />
                      {label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-7">
                <h3 className="font-display font-bold text-slate-900 mb-3">Quick note</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  CliniBot AI provides <strong>educational information only</strong> and cannot
                  provide medical diagnoses or treatment. For health concerns, please consult a
                  qualified healthcare provider. For emergencies, call your local emergency number.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
