import { Link } from 'react-router-dom';
import {
  MessageSquare,
  ArrowRight,
  Stethoscope,
  Pill,
  HeartPulse,
  Salad,
  ShieldPlus,
  Brain,
  Sparkles,
  ShieldCheck,
  Clock,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import DoctorIllustration from '@/components/DoctorIllustration';

const features = [
  {
    icon: Stethoscope,
    title: 'Symptom Checker',
    desc: 'Describe your symptoms and get general, educational insights about possible causes and what they may indicate.',
    color: 'from-primary-500 to-primary-600',
  },
  {
    icon: Pill,
    title: 'Medicine Information',
    desc: 'Look up general information about medications, common uses, and typical precautions in plain language.',
    color: 'from-teal-500 to-teal-600',
  },
  {
    icon: HeartPulse,
    title: 'Healthy Lifestyle Tips',
    desc: 'Practical, evidence-informed guidance on building daily habits that support long-term wellbeing.',
    color: 'from-primary-500 to-teal-500',
  },
  {
    icon: Salad,
    title: 'Nutrition Guidance',
    desc: 'Understand balanced eating, nutrients, and dietary patterns that support a healthy lifestyle.',
    color: 'from-teal-500 to-primary-500',
  },
  {
    icon: ShieldPlus,
    title: 'First Aid Basics',
    desc: 'Quick educational overviews of common first-aid situations so you feel more prepared in everyday life.',
    color: 'from-primary-600 to-primary-500',
  },
  {
    icon: Brain,
    title: 'Mental Wellness Support',
    desc: 'Explore stress management, mindfulness, and general mental wellness topics in a supportive tone.',
    color: 'from-teal-600 to-teal-500',
  },
];

const stats = [
  { value: '24/7', label: 'Always Available' },
  { value: '6+', label: 'Health Topics' },
  { value: 'Gemini', label: 'AI Powered' },
  { value: '100%', label: 'Educational' },
];

export default function Home() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/60 via-white to-teal-50/40">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-20 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-0 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Powered by Google Gemini AI
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 leading-[1.1] tracking-tight">
                Your Intelligent <span className="gradient-text">AI Health Companion</span>
              </h1>
              <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl">
                CliniBot AI helps users understand symptoms, general health information, and
                wellness guidance. It is for educational purposes only and does not replace
                professional medical advice.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/chat" className="btn-primary text-base">
                  <MessageSquare className="w-5 h-5" />
                  Start Chat
                </Link>
                <Link to="/about" className="btn-secondary text-base">
                  Learn More
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate-500">
                <span className="flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-500" /> Educational use
                </span>
                <span className="flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-teal-500" /> Private & secure
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-teal-500" /> Available 24/7
                </span>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="absolute inset-0 gradient-bg rounded-[2.5rem] blur-2xl opacity-20 scale-95" />
              <div className="relative bg-white rounded-[2rem] shadow-2xl shadow-primary-200/40 p-6 border border-slate-100">
                <DoctorIllustration className="w-full h-auto" />
              </div>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass rounded-2xl p-5 text-center card-hover"
              >
                <div className="font-display text-3xl font-bold gradient-text">{s.value}</div>
                <div className="text-sm text-slate-500 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-700 text-sm font-medium mb-4">
              <HeartPulse className="w-4 h-4" />
              What CliniBot AI can help with
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-slate-900">
              Comprehensive health guidance, <span className="gradient-text">all in one place</span>
            </h2>
            <p className="mt-4 text-slate-600">
              From understanding symptoms to building healthier habits, CliniBot AI offers
              educational support across a range of everyday health topics.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="group relative bg-white rounded-2xl p-7 border border-slate-100 shadow-sm card-hover overflow-hidden"
              >
                <div className={`absolute -top-12 -right-12 w-32 h-32 rounded-full bg-gradient-to-br ${f.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                <div className={`relative w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center shadow-md mb-5`}>
                  <f.icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA banner */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-teal-500 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/4 w-64 h-64 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-white rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white">
            Ready to talk to your AI health companion?
          </h2>
          <p className="mt-4 text-primary-50 text-lg">
            Start a conversation with CliniBot AI and get educational health insights in seconds.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/chat"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-primary-700 font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <MessageSquare className="w-5 h-5" />
              Start Chat Now
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white/10 backdrop-blur text-white font-semibold border border-white/30 hover:bg-white/20 transition-all"
            >
              Contact Us
            </Link>
          </div>
          <div className="mt-6 flex items-center justify-center gap-2 text-primary-50 text-sm">
            <CheckCircle2 className="w-4 h-4" />
            No sign-up required · Free to use · Educational purposes only
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-12 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 p-5 rounded-xl bg-amber-50 border border-amber-200">
            <ShieldCheck className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>Important:</strong> CliniBot AI is an educational tool and does not provide
              medical diagnoses or treatment recommendations. It is not a substitute for
              professional medical advice, diagnosis, or treatment. Always seek the advice of a
              qualified healthcare provider with any questions about a medical condition.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
