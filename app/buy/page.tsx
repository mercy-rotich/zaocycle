import Link from 'next/link';
import {
  Leaf, Flame, ShieldCheck, Truck, Recycle,
  TrendingDown, Users, Star, CheckCircle2, ArrowRight,
} from 'lucide-react';
import ProductCard from '@/components/buy/ProductCard';
import { mockProducts } from '@/lib/school-mock-data';

export const metadata = {
  title: 'Buy Eco-Briquettes — ZaoCycle',
  description:
    'Order sustainable eco-briquettes made from Kirinyaga farm waste. Clean, affordable cooking fuel for school kitchens.',
};

function HowStep({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <div className="flex gap-4">
      <div className="shrink-0 w-8 h-8 bg-green-600/20 border border-green-600/30 rounded-full flex items-center justify-center text-green-400 text-xs font-bold mt-0.5">
        {num}
      </div>
      <div>
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
      {/* ── Hero ── */}
      <section className="relative overflow-hidden border-b border-slate-800/60">
        <div className="absolute -top-40 right-0 w-[500px] h-[500px] bg-green-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-600/6 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-2 gap-12 xl:gap-20 items-center">

            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                <Flame className="w-3.5 h-3.5" />
                100% farm-waste · no trees harmed
              </div>

              <h1 className="text-white text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight leading-none mb-5">
                Clean Fuel for<br />
                <span className="text-green-400">School Kitchens</span>
              </h1>

              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Eco-briquettes made from verified Kirinyaga farm waste. Up to 45% cheaper
                than firewood, zero deforestation, and every bag pays a local farmer.
              </p>

              <div className="flex flex-wrap gap-3 mb-10">
                <Link
                  href="#products"
                  className="bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-xl flex items-center gap-2 transition-colors hover:shadow-lg hover:shadow-green-500/20"
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

              {/* Stats inline */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { icon: Users,       value: '47+',    label: 'Schools served' },
                  { icon: Recycle,     value: '18.4 T', label: 'Waste diverted' },
                  { icon: TrendingDown,value: '45%',    label: 'vs. firewood' },
                  { icon: ShieldCheck, value: '100%',   label: 'Certified source' },
                ].map(({ icon: Icon, value, label }) => (
                  <div key={label} className="bg-slate-800/60 border border-slate-700/60 rounded-xl px-3 py-2.5 text-center">
                    <Icon className="w-3.5 h-3.5 text-green-400 mx-auto mb-1" />
                    <p className="text-white font-extrabold text-base tabular-nums leading-tight">{value}</p>
                    <p className="text-slate-500 text-xs mt-0.5">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — product preview card */}
            <div className="hidden lg:block">
              <div className="bg-slate-900 border border-slate-700/60 rounded-2xl overflow-hidden shadow-2xl shadow-black/40">

                {/* Header */}
                <div className="px-5 py-3.5 border-b border-slate-800 bg-slate-800/40 flex items-center justify-between">
                  <span className="text-white text-sm font-bold">Available Sack Sizes</span>
                  <span className="text-green-400 text-xs font-semibold">Free delivery in Kirinyaga</span>
                </div>

                {/* Product rows */}
                <div className="divide-y divide-slate-800">
                  {mockProducts.map((p, i) => {
                    const bagColors = ['from-green-600 to-green-800', 'from-emerald-600 to-emerald-800', 'from-teal-600 to-teal-800'];
                    const bagSizes  = ['h-14 w-16', 'h-11 w-14', 'h-9 w-12'];
                    return (
                      <div key={p.id} className="flex items-center gap-4 px-5 py-4">
                        {/* Mini bag visual */}
                        <div className={`bg-gradient-to-br ${bagColors[i]} rounded-xl flex items-center justify-center shrink-0 ${bagSizes[i]}`}>
                          <Flame className="w-4 h-4 text-white/80" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-bold">{p.name}</p>
                          <p className="text-slate-500 text-xs truncate">{p.description.split('.')[0]}.</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-white font-extrabold">KES {p.priceKES.toLocaleString()}</p>
                          <p className="text-green-400 text-xs">{p.stockBags} in stock</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Savings callout */}
                <div className="mx-5 my-4 bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 flex items-center gap-3">
                  <TrendingDown className="w-5 h-5 text-green-400 shrink-0" />
                  <div>
                    <p className="text-green-300 text-xs font-bold">Save up to 45% vs. firewood</p>
                    <p className="text-slate-400 text-xs">A school of 200 saves ~KES 3,200/month</p>
                  </div>
                </div>

                {/* CTA */}
                <div className="px-5 pb-5">
                  <Link
                    href="#products"
                    className="flex items-center justify-between w-full bg-green-600 hover:bg-green-500 text-white font-bold py-2.5 px-4 rounded-xl text-sm transition-colors"
                  >
                    <span>Browse & Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Products ── */}
      <section id="products" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="mb-8">
          <h2 className="text-white text-2xl font-extrabold tracking-tight">Choose Your Sack Size</h2>
          <p className="text-slate-400 text-sm mt-1">
            Free delivery anywhere in Kirinyaga County · M-Pesa payment
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <ProductCard product={featured} featured />
          {others.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* ── Why + How (2-column) ── */}
      <section className="border-t border-slate-800/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">

            {/* Why eco-briquettes */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 bg-green-600/15 border border-green-600/20 rounded-lg flex items-center justify-center">
                  <Leaf className="w-4 h-4 text-green-400" />
                </div>
                <h2 className="text-white font-bold text-xl">Why eco-briquettes?</h2>
              </div>
              <div className="space-y-3">
                {[
                  { icon: Flame,        text: 'Burns hotter & longer than firewood',          sub: 'Higher calorific value means less fuel per meal' },
                  { icon: ShieldCheck,  text: 'No smoke — better air quality',                sub: 'WHO-documented risk from indoor smoke eliminated' },
                  { icon: Recycle,      text: 'Zero deforestation footprint',                 sub: '100% farm waste — no trees cut for fuel' },
                  { icon: Users,        text: 'Supports 248+ farming households',             sub: 'Every purchase triggers an M-Pesa payment to a farmer' },
                  { icon: Truck,        text: 'Free delivery in Kirinyaga County',            sub: 'Direct to your school, no transport cost' },
                ].map(({ icon: Icon, text, sub }) => (
                  <div key={text} className="flex items-start gap-3 bg-slate-900 border border-slate-800 rounded-xl p-4">
                    <div className="w-8 h-8 bg-green-500/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-green-400" />
                    </div>
                    <div>
                      <p className="text-white text-sm font-semibold">{text}</p>
                      <p className="text-slate-500 text-xs mt-0.5">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* How ordering works */}
            <div>
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 bg-green-600/15 border border-green-600/20 rounded-lg flex items-center justify-center">
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
                <h2 className="text-white font-bold text-xl">Ordering is simple</h2>
              </div>
              <div className="space-y-5 mb-8">
                <HowStep num="1" title="Pick your sack size"      body="Choose 10 kg, 25 kg, or 50 kg — whatever fits your kitchen's monthly needs." />
                <HowStep num="2" title="Enter delivery details"   body="Tell us your school name, ward, and a landmark near you for delivery." />
                <HowStep num="3" title="Pay via M-Pesa"           body="We send an STK push to your phone. Enter your PIN — done. No cash needed." />
                <HowStep num="4" title="We deliver within 2 days" body="Our rider drops off your order. Track it live from your order page." />
              </div>

              {/* Mini CTA card */}
              <div className="bg-gradient-to-br from-green-800 via-green-900 to-slate-900 rounded-2xl border border-green-700/30 p-5 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-28 h-28 bg-green-400/10 rounded-full blur-2xl pointer-events-none" />
                <div className="relative">
                  <p className="text-white font-bold mb-1">Ready to switch?</p>
                  <p className="text-green-200/70 text-sm mb-4">
                    Join 47 schools already saving money and protecting forests.
                  </p>
                  <Link
                    href="#products"
                    className="inline-flex items-center gap-2 bg-white hover:bg-green-50 text-green-800 font-bold px-5 py-2.5 rounded-xl text-sm transition-colors"
                  >
                    <Flame className="w-4 h-4" />
                    Order Now
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
