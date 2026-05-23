import Link from 'next/link';
import Image from 'next/image';
import { Leaf, Package, ShieldCheck, Zap, CheckCircle2 } from 'lucide-react';
import { RegisterForm } from '@/features/auth/components/RegisterForm';

const FARM_IMAGE = 'https://images.unsplash.com/photo-1561504935-4e7d4516a2d1?auto=format&fit=crop&w=1200&q=80';

const benefits = [
  { icon: Package,       text: 'Order eco-briquettes online with M-Pesa' },
  { icon: ShieldCheck,   text: 'Track your order from pickup to delivery' },
  { icon: Zap,           text: 'Support certified zero-poison farmers' },
  { icon: CheckCircle2,  text: 'Same-day delivery across Kirinyaga County' },
];

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-slate-950 flex">

      {/* Left branding panel — desktop only */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col">

        {/* Background farm photo */}
        <Image
          src={FARM_IMAGE}
          alt="Rice farm in Kirinyaga County"
          fill
          className="object-cover"
          priority
        />

        {/* Dark gradient overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/85 via-slate-950/70 to-green-950/60" />

        {/* Content sits above the overlay */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full p-10 text-center">
          <Link href="/" className="flex items-center gap-2.5 mb-10">
            <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center shrink-0">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <span className="text-white text-xl font-bold">Zao<span className="text-green-400">Cycle</span></span>
          </Link>

          <h2 className="text-white text-3xl font-extrabold leading-tight mb-3">
            Clean energy,<br />
            <span className="text-green-400">delivered to you.</span>
          </h2>
          <p className="text-slate-300 text-sm leading-relaxed mb-8">
            Join schools, homes and businesses across Kirinyaga County ordering
            eco-briquettes made from certified zero-poison agricultural waste.
          </p>

          <div className="space-y-3 w-full max-w-xs">
            {benefits.map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 backdrop-blur-sm rounded-lg flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4 text-green-400" />
                </div>
                <span className="text-slate-200 text-sm text-left">{text}</span>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <p className="text-slate-400 text-xs">
              Kirinyaga County · Mwea · Gichugu · Kirinyaga Central · Ndia
            </p>
            <p className="text-slate-600 text-xs mt-1">
              Photo: Mwea Irrigation Scheme
            </p>
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-lg">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2 justify-center mb-8">
            <div className="w-8 h-8 bg-green-600 rounded-xl flex items-center justify-center shrink-0">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <span className="text-white text-xl font-bold">Zao<span className="text-green-400">Cycle</span></span>
          </div>

          <div className="mb-6">
            <h1 className="text-white text-2xl font-bold">Create your account</h1>
            <p className="text-slate-400 text-sm mt-1">Start ordering eco-briquettes today</p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6 ring-1 ring-slate-800">
            <RegisterForm />
          </div>
        </div>
      </div>
    </main>
  );
}
