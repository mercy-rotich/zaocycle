import Link from 'next/link';
import {
  Leaf,
  Flame,
  ShieldCheck,
  Truck,
  Recycle,
  TrendingDown,
  Users,
  Star,
} from 'lucide-react';
import ProductCard from '@/components/buy/ProductCard';
import { mockProducts } from '@/lib/school-mock-data';

export const metadata = {
  title: 'Buy Eco-Briquettes — ZaoCycle',
  description:
    'Order sustainable eco-briquettes made from Kirinyaga farm waste. Clean, affordable cooking fuel for school kitchens.',
};

function StatChip({
  icon: Icon,
  value,
  label,
}: {
  icon: React.ElementType;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1 px-4 py-3 bg-slate-900 border border-slate-800 rounded-2xl text-center min-w-[120px]">
      <Icon className="w-4 h-4 text-green-400" />
      <p className="text-white font-extrabold text-lg tabular-nums leading-tight">{value}</p>
      <p className="text-slate-500 text-xs leading-tight">{label}</p>
    </div>
  );
}

function HowStep({
  num,
  title,
  body,
}: {
  num: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 w-8 h-8 bg-green-600/20 border border-green-600/30 rounded-full flex items-center justify-center text-green-400 text-xs font-bold">
        {num}
      </div>
      <div className="pt-0.5">
        <p className="text-white text-sm font-bold">{title}</p>
        <p className="text-slate-400 text-sm mt-0.5 leading-relaxed">{body}</p>
      </div>
    </div>
  );
}

export default function BuyPage() {
  const featured = mockProducts[0];
  const others = mockProducts.slice(1);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-800/60">
        {/* Ambient glows */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-green-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 right-0 w-72 h-72 bg-emerald-600/6 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-14">
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              <Flame className="w-3.5 h-3.5" />
              100% farm-waste · no trees harmed
            </div>

            <h1 className="text-white text-4xl sm:text-5xl font-extrabold tracking-tight leading-none mb-4">
              Clean Fuel for<br />
              <span className="text-green-400">School Kitchens</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-lg">
              Eco-briquettes made from verified Kirinyaga farm waste. Up to 45% cheaper than
              firewood, zero deforestation, and every bag pays a local farmer.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="#products"
                className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors"
              >
                <Flame className="w-4 h-4" />
                Order Briquettes
              </Link>
              <Link
                href="/buy/orders/ORD-2026-0042"
                className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold px-6 py-3 rounded-xl transition-colors"
              >
                Track My Order
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-b border-slate-800/60 bg-slate-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
            <StatChip icon={Users} value="47+" label="Schools served" />
            <StatChip icon={Recycle} value="18.4 T" label="Waste diverted" />
            <StatChip icon={TrendingDown} value="45%" label="Cheaper vs. firewood" />
            <StatChip icon={ShieldCheck} value="100%" label="Certified waste-source" />
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="mb-8">
          <h2 className="text-white text-2xl font-extrabold tracking-tight">
            Choose Your Sack Size
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            Free delivery anywhere in Kirinyaga County · M-Pesa payment
          </p>
        </div>

        {/* Equal 3-column product grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <ProductCard product={featured} featured />
          {others.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Why eco-briquettes — full-width benefits strip */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
          <div className="flex items-center gap-2 mb-5">
            <div className="w-7 h-7 bg-green-600/15 border border-green-600/20 rounded-lg flex items-center justify-center">
              <Leaf className="w-4 h-4 text-green-400" />
            </div>
            <h3 className="text-white font-bold">Why eco-briquettes?</h3>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: Star, text: 'Burns hotter & longer than firewood' },
              { icon: Star, text: 'No smoke — better air quality in kitchens' },
              { icon: Star, text: 'Zero deforestation footprint' },
              { icon: Star, text: 'Supports 248+ local farming households' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-start gap-2.5 bg-slate-800/50 rounded-xl p-3.5">
                <Icon className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                <p className="text-slate-300 text-sm leading-snug">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-slate-800/60 bg-slate-900/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-xl">
            <h2 className="text-white text-2xl font-extrabold tracking-tight mb-2">
              Ordering is Simple
            </h2>
            <p className="text-slate-400 text-sm mb-8">
              No accounts needed. Just pick your size, pay, and we deliver.
            </p>
            <div className="space-y-6">
              <HowStep
                num="1"
                title="Pick your sack size"
                body="Choose 10 kg, 25 kg, or 50 kg — whatever fits your kitchen's monthly needs."
              />
              <HowStep
                num="2"
                title="Enter delivery details"
                body="Tell us your school name, ward, and a landmark near you for delivery."
              />
              <HowStep
                num="3"
                title="Pay via M-Pesa"
                body="We send an STK push to your phone. Enter your PIN — done. No cash needed."
              />
              <HowStep
                num="4"
                title="We deliver within 2 days"
                body="Our riders drop off your order. Track it live on your order page."
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14 text-center">
        <div className="bg-gradient-to-br from-green-800 via-green-900 to-slate-900 rounded-3xl border border-green-700/30 p-10 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-48 h-48 bg-green-400/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <Flame className="w-10 h-10 text-green-400 mx-auto mb-4" />
            <h2 className="text-white text-2xl font-extrabold mb-2">
              Ready to switch your school kitchen?
            </h2>
            <p className="text-green-200/70 text-sm mb-6 max-w-md mx-auto">
              Join 47 Kirinyaga schools already saving money and protecting forests with
              ZaoCycle eco-briquettes.
            </p>
            <Link
              href="#products"
              className="inline-flex items-center gap-2 bg-white hover:bg-green-50 text-green-800 font-bold px-8 py-3 rounded-xl transition-colors"
            >
              <Flame className="w-4 h-4" />
              Order Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
