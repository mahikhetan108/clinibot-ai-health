import { Link } from 'react-router-dom';
import {
  Sparkles,
  ShieldCheck,
  Brain,
  HeartPulse,
  Lock,
  Clock,
  Target,
  Lightbulb,
  MessageSquare,
  Cpu,
  Stethoscope,
} from 'lucide-react';

const values = [
  {
    icon: ShieldCheck,
    title: 'Safety First',
    desc: 'Every response reminds users that CliniBot AI is educational, not a replacement for professional care.',
  },
  {
    icon: Brain,
    title: 'Powered by Gemini',
    desc: 'Built on Google Gemini AI to deliver clear, context-aware health information in natural language.',
  },
  {
    icon: Lock,
    title: 'Private by Design',
    desc: 'Conversations are processed securely and not stored or shared with third parties.',
  },
  {
    icon: Clock,
    title: 'Always Available',
    desc: 'Get educational health guidance any time of day, without waiting rooms or appointments.',
  },
];

const steps = [
  {
    icon: MessageSquare,
    title: 'Ask a Question',
    desc: 'Type any health-related question in plain language — symptoms, nutrition, wellness, and more.',
  },
  {
    icon: Cpu,
    title: 'AI Processes It',
    desc: 'Google Gemini AI analyzes your question using a carefully designed medical-education system prompt.',
  },
  {
    icon: Stethoscope,
    title: 'Get an Educational Answer',
    desc: 'Receive a clear, structured response with the reminder that it is not professional medical advice.',
  },
];

export default function About() {
  return (
    <div className="pt-16">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50/60 to-white py-16 lg:py-24">
        <div className="absolute top-10 right-10 w-72 h-72 bg-teal-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-200/30 rounded-full blur-3xl" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            About CliniBot AI
          </div>
          <h1 className="font-display text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight">
            An educational AI health assistant <span className="gradient-text">powered by Google Gemini AI</span>
          </h1>
          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            CliniBot AI is designed to help people better understand everyday health topics — from
            symptoms and medications to nutrition and mental wellness. It provides general,
            educational information in a friendly, accessible way, and always reminds users that
            it is not a substitute for professional medical advice.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-teal-50 border border-primary-100">
              <Target className="w-10 h-10 text-primary-600 mb-4" />
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed">
                To make basic health information more accessible and understandable for everyone.
                We believe that clear, educational guidance can help people make more informed
                decisions about their wellbeing — while always encouraging them to consult
                qualified healthcare professionals for diagnosis and treatment.
              </p>
            </div>
            <div className="p-8 rounded-2xl bg-gradient-to-br from-teal-50 to-primary-50 border border-teal-100">
              <Lightbulb className="w-10 h-10 text-teal-600 mb-4" />
              <h2 className="font-display text-2xl font-bold text-slate-900 mb-3">How It Works</h2>
              <p className="text-slate-600 leading-relaxed">
                CliniBot AI uses Google Gemini AI with a carefully crafted system prompt that
                keeps responses educational, balanced, and safety-conscious. When severe symptoms
                are mentioned, it directs users to seek immediate emergency medical care.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works steps */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-slate-900 text-center mb-12">
            How CliniBot AI works
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={s.title} className="relative bg-white rounded-2xl p-7 shadow-sm border border-slate-100">
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full gradient-bg text-white text-sm font-bold flex items-center justify-center shadow-md">
                  {i + 1}
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mb-4 mt-2">
                  <s.icon className="w-6 h-6 text-primary-600" />
                </div>
                <h3 className="font-display text-lg font-bold text-slate-900 mb-2">{s.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-slate-900 text-center mb-4">
            What we stand for
          </h2>
          <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            CliniBot AI is built on principles that put user safety and clarity first.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div key={v.title} className="text-center p-6 rounded-2xl border border-slate-100 hover:border-primary-200 hover:shadow-md transition-all">
                <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-4 shadow-md">
                  <v.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display font-bold text-slate-900 mb-2">{v.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Disclaimer + CTA */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4 p-6 rounded-2xl bg-amber-50 border border-amber-200 mb-8">
            <HeartPulse className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-amber-800 leading-relaxed">
              <strong>Disclaimer:</strong> CliniBot AI is an educational tool and does not provide
              medical diagnoses, treatment recommendations, or emergency services. It is not a
              substitute for professional medical advice. Always consult a qualified healthcare
              provider with questions about a medical condition.
            </p>
          </div>
          <div className="text-center">
            <Link to="/chat" className="btn-primary text-base">
              <MessageSquare className="w-5 h-5" />
              Try CliniBot AI Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
