import {
  Smartphone, Database, QrCode, ShoppingBag,
  MessageSquare, Bike, Wallet, Flame,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Step {
  icon: LucideIcon;
  title: string;
  description: string;
}

const loop1Steps: Step[] = [
  { icon: Smartphone, title: 'Log via USSD', description: 'Farmer dials a simple code on any mobile phone to log the pesticide and crop. No smartphone needed.' },
  { icon: Database, title: 'PHI Countdown', description: 'ZaoCycle cross-references the chemical and auto-calculates the safe Pre-Harvest Interval timer.' },
  { icon: QrCode, title: 'Get Certified', description: 'Once safe, the system issues a unique digital "Safe-to-Harvest" QR certificate for the batch.' },
  { icon: ShoppingBag, title: 'Premium Market', description: 'Consumers scan the QR to verify safety. Farmers access premium buyers at higher prices.' },
];

const loop2Steps: Step[] = [
  { icon: MessageSquare, title: 'Automated SMS', description: 'After a safe harvest, ZaoCycle auto-sends: "Do you have rice husks or coffee pulp for collection?"' },
  { icon: Bike, title: 'Youth Rider Dispatch', description: 'A local youth logistics rider is dispatched by motorcycle to collect and weigh the agricultural waste.' },
  { icon: Wallet, title: 'Instant M-Pesa', description: 'The moment waste is weighed and confirmed, the system triggers an instant mobile-money transfer.' },
  { icon: Flame, title: 'Eco-Briquettes', description: 'Waste is compressed into clean, smokeless eco-briquettes sold to local schools — replacing firewood.' },
];

type LoopColor = 'green' | 'emerald';

const colorConfig: Record<LoopColor, { num: string; badge: string; text: string; connector: string }> = {
  green: { num: 'bg-green-600', badge: 'bg-green-500/10 border-green-500/20', text: 'text-green-400', connector: 'bg-green-600/25' },
  emerald: { num: 'bg-emerald-600', badge: 'bg-emerald-500/10 border-emerald-500/20', text: 'text-emerald-400', connector: 'bg-emerald-600/25' },
};

function StepItem({ step, index, isLast, color }: { step: Step; index: number; isLast: boolean; color: LoopColor }) {
  const Icon = step.icon;
  const c = colorConfig[color];
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center shrink-0">
        <div className={`w-9 h-9 ${c.num} rounded-lg flex items-center justify-center text-white text-sm font-bold`}>
          {index + 1}
        </div>
        {!isLast && <div className={`w-0.5 flex-1 ${c.connector} mt-1.5`} />}
      </div>
      <div className={`${isLast ? 'pb-0' : 'pb-7'}`}>
        <div className={`inline-flex items-center gap-2 border ${c.badge} rounded-lg px-3 py-1.5 mb-2`}>
          <Icon className={`w-4 h-4 ${c.text}`} />
          <span className={`text-sm font-semibold ${c.text}`}>{step.title}</span>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
      </div>
    </div>
  );
}

interface LoopCardProps {
  label: string;
  title: string;
  headerIcon: LucideIcon;
  steps: Step[];
  color: LoopColor;
}

function LoopCard({ label, title, headerIcon: HeaderIcon, steps, color }: LoopCardProps) {
  const c = colorConfig[color];
  return (
    <div className="bg-slate-900 rounded-2xl p-8 border border-slate-800 flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <div className={`w-10 h-10 ${c.num} rounded-xl flex items-center justify-center shrink-0`}>
          <HeaderIcon className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className={`${c.text} text-xs font-semibold uppercase tracking-widest`}>{label}</p>
          <h3 className="text-white font-bold text-lg leading-tight">{title}</h3>
        </div>
      </div>
      <div className="flex-1">
        {steps.map((step, i) => (
          <StepItem key={step.title} step={step} index={i} isLast={i === steps.length - 1} color={color} />
        ))}
      </div>
    </div>
  );
}

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-16">
          <span className="text-green-400 text-sm font-semibold uppercase tracking-widest">The ZaoCycle Method</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4">
            Two Loops. One System. Total Impact.
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            The only way to solve the agrochemical crisis is to <span className="text-white font-medium">pay the farmer to comply</span>. We achieve this by tapping into the inherent value of their waste.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <LoopCard label="Loop 1" title="Health & Certification Engine" headerIcon={QrCode} steps={loop1Steps} color="green" />
          <LoopCard label="Loop 2" title="Climate & Monetization Engine" headerIcon={Flame} steps={loop2Steps} color="emerald" />
        </div>

        <div className="bg-gradient-to-r from-green-900/20 via-slate-900 to-emerald-900/20 border border-green-500/20 rounded-2xl p-6 text-center">
          <p className="text-slate-300 text-base leading-relaxed">
            <span className="text-green-400 font-semibold">The key insight:</span> Loop 2&apos;s waste-buyback is the enforcement mechanism for Loop 1.
            Logging your chemicals is your <span className="text-white font-medium">ticket into the waste-monetization program.</span>
          </p>
        </div>

      </div>
    </section>
  );
}
