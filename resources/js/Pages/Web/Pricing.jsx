
import React, { useMemo, useState } from 'react';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator, Check, TrendingUp, Wallet } from 'lucide-react';
import WebLayout from '@/Layouts/WebLayout';

const plans = [
    { title: 'Commercial Plot (Corner)', phase: 'Phase 1', rate: 2400000, popular: true, points: ['Blocks C, D, H', 'Development fee: 20,000 / katha', 'One-time or installment facility'] },
    { title: 'Commercial Plot (General)', phase: 'Phase 1', rate: 2200000, popular: false, points: ['General blocks', 'Development fee: 20,000 / katha', 'One-time or installment facility'] },
    { title: 'Commercial Plot (Phase 2)', phase: 'Phase 2', rate: 2000000, popular: false, points: ['All blocks', 'Development fee: 20,000 / katha', 'One-time or installment facility'] },
    { title: 'Residential Plot (South Facing)', phase: 'Phase 1', rate: 700000, popular: false, points: ['Premium south-facing lots', 'Development fee: 20,000 / katha', 'One-time or installment facility'] },
    { title: 'Commercial Plot (Other Corner)', phase: 'Phase 1', rate: 2200000, popular: true, points: ['Selected corner blocks', 'Development fee: 20,000 / katha', 'One-time or installment facility'] },
    { title: 'Commercial Plot (Other)', phase: 'Phase 1', rate: 2000000, popular: false, points: ['Additional blocks', 'Development fee: 20,000 / katha', 'One-time or installment facility'] },
];

const installmentOptions = [
    { id: '36', months: 36, years: 3, dpPercent: 25 },
    { id: '60', months: 60, years: 5, dpPercent: 20 },
    { id: '84', months: 84, years: 7, dpPercent: 15 },
];

const fmt = (value) =>
    `BDT ${new Intl.NumberFormat('en-BD', { maximumFractionDigits: 0 }).format(
        Math.max(0, Math.round(value || 0))
    )}`;

const num = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
};

export default function Pricing() {
    const [plotSize, setPlotSize] = useState(5);
    const [pricePerKatha, setPricePerKatha] = useState(2200000);
    const [developmentFee, setDevelopmentFee] = useState(20000);
    const [bookingMoney, setBookingMoney] = useState(20000);
    const [fixedDownPayment, setFixedDownPayment] = useState(100000);
    const [extraDownPayment, setExtraDownPayment] = useState(0);
    const [installmentId, setInstallmentId] = useState('60');
    const [growthRate, setGrowthRate] = useState(15);
    const [holdingYears, setHoldingYears] = useState(5);
    const [rentalYield, setRentalYield] = useState(2);

    const activeInstallment = useMemo(
        () => installmentOptions.find((item) => item.id === installmentId) || installmentOptions[0],
        [installmentId]
    );

    const calc = useMemo(() => {
        const size = Math.max(0, plotSize);
        const landRate = Math.max(0, pricePerKatha);
        const devRate = Math.max(0, developmentFee);
        const booking = Math.max(0, bookingMoney);
        const dp = Math.max(0, fixedDownPayment);
        const extra = Math.max(0, extraDownPayment);
        const years = Math.max(1, holdingYears);

        const base = size * landRate;
        const dev = size * devRate;
        const total = base + dev;
        const requiredDp = (total * activeInstallment.dpPercent) / 100;
        const upfront = booking + dp + extra + requiredDp;
        const due = Math.max(total - upfront, 0);
        const perInstallment = due / activeInstallment.months;

        const future = total * Math.pow(1 + Math.max(0, growthRate) / 100, years);
        const gain = future - total;
        const rent = total * (Math.max(0, rentalYield) / 100) * years;
        const roi = total > 0 ? ((gain + rent) / total) * 100 : 0;

        return { total, requiredDp, upfront, due, perInstallment, future, gain, rent, roi };
    }, [plotSize, pricePerKatha, developmentFee, bookingMoney, fixedDownPayment, extraDownPayment, holdingYears, growthRate, rentalYield, activeInstallment]);

    return (
        <WebLayout>
            <main className="pt-20">
                <section className="relative overflow-hidden bg-dark py-20 md:py-28">
                    <div className="pointer-events-none absolute -left-20 -top-24 h-64 w-64 rounded-full bg-[#4ECDC4]/20 blur-3xl" />
                    <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#d7b55a]/20 blur-3xl" />

                    <div className="web-giant-container">
                        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr] xl:items-end">
                            <motion.div initial={{ opacity: 0, y: 26 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <p className="mb-4 text-[11px] uppercase tracking-[0.3em] text-[#d7b55a]">Pricing & Payment Plan</p>
                                <h1 className="max-w-3xl text-4xl font-light leading-tight text-[#fffce1] md:text-6xl">
                                    Premium Land Packages For Smart Investors
                                </h1>
                                <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
                                    Redesigned pricing cards plus client-aligned EMI and ROI calculators.
                                </p>
                                <div className="mt-8 flex flex-wrap gap-3">
                                    <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[#d7b55a]/70 bg-[#d7b55a]/15 px-6 py-3 text-xs font-medium uppercase tracking-[0.16em] text-[#fff2c8] transition-all hover:border-[#d7b55a] hover:bg-[#d7b55a]/25">
                                        Book Site Visit <ArrowRight className="h-4 w-4" />
                                    </Link>
                                    <a href="#plans" className="inline-flex items-center rounded-full border border-white/25 px-6 py-3 text-xs uppercase tracking-[0.16em] text-white/75 transition-colors hover:border-white/60 hover:text-white">
                                        Explore Plans
                                    </a>
                                </div>
                            </motion.div>
                            <motion.div initial={{ opacity: 0, y: 32 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid gap-4 sm:grid-cols-2">
                                <article className="rounded-3xl border border-white/10 bg-white/5 p-6">
                                    <span className="text-[11px] uppercase tracking-[0.22em] text-white/60">Base Example</span>
                                    <p className="mt-3 text-2xl font-light text-white">{fmt(11000000)}</p>
                                    <p className="mt-2 text-sm text-white/65">5 Katha x 22 Lac per Katha</p>
                                </article>
                                <article className="rounded-3xl border border-[#4ECDC4]/25 bg-[#4ECDC4]/10 p-6">
                                    <span className="text-[11px] uppercase tracking-[0.22em] text-[#9df4ed]">Booking Amount</span>
                                    <p className="mt-3 text-2xl font-light text-[#d8fffa]">{fmt(20000)}</p>
                                    <p className="mt-2 text-sm text-[#b8efea]">Client brief default</p>
                                </article>
                                <article className="rounded-3xl border border-white/10 bg-white/5 p-6 sm:col-span-2">
                                    <span className="text-[11px] uppercase tracking-[0.22em] text-white/60">Installment Tracks</span>
                                    <div className="mt-3 flex flex-wrap gap-2 text-sm text-white">
                                        {installmentOptions.map((item) => (
                                            <span key={item.id} className="rounded-full border border-white/15 px-3 py-1">
                                                {item.months} months ({item.dpPercent}% DP)
                                            </span>
                                        ))}
                                    </div>
                                </article>
                            </motion.div>
                        </div>
                    </div>
                </section>

                <section id="plans" className="bg-light py-20 md:py-24">
                    <div className="web-giant-container">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mx-auto mb-14 max-w-3xl text-center">
                            <p className="section-sub-title text-[#6e5d2e]">Project Price Matrix</p>
                            <h2 className="section-title mt-3 text-[#1b1d1f]">Choose Your Plot Category</h2>
                        </motion.div>

                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {plans.map((plan, index) => (
                                <motion.article
                                    key={`${plan.title}-${index}`}
                                    initial={{ opacity: 0, y: 32 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.45, delay: index * 0.05 }}
                                    className="group relative overflow-hidden rounded-3xl border border-[#0b0e14]/10 bg-[linear-gradient(180deg,#ffffff_0%,#f4f2ec_100%)] p-7 shadow-[0_18px_48px_rgba(17,24,39,0.08)]"
                                >
                                    {plan.popular && (
                                        <div className="pointer-events-none absolute right-[-42px] top-[18px] z-20 rotate-45 bg-[#c99855] px-12 py-1 text-[10px] uppercase tracking-[0.24em] text-white">
                                            Popular
                                        </div>
                                    )}

                                    <p className="text-[11px] uppercase tracking-[0.22em] text-[#6e5d2e]">{plan.phase}</p>
                                    <h3 className="mt-3 text-[1.55rem] font-light leading-tight text-[#1d1f22]">{plan.title}</h3>
                                    <p className="mt-3 text-2xl font-light text-[#1d1f22]">{fmt(plan.rate)} <span className="text-sm text-[#1d1f22]/60">/ Katha</span></p>

                                    <ul className="mt-6 space-y-3">
                                        {plan.points.map((point) => (
                                            <li key={point} className="flex items-start gap-3 text-sm text-[#1d1f22]/80">
                                                <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#2FA89D]" />
                                                {point}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link href="/contact" className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1d1f22] px-5 py-3 text-xs font-medium uppercase tracking-[0.16em] text-white transition-all group-hover:bg-[#2b2f35]">
                                        Reserve This Plan <ArrowRight className="h-4 w-4" />
                                    </Link>
                                </motion.article>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="relative overflow-hidden bg-dark py-20 md:py-24">
                    <div className="web-giant-container">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-12 text-center">
                            <p className="section-sub-title text-[#9df4ed]">Finance Toolkit</p>
                            <h2 className="section-title mt-3 text-[#fffce1]">EMI & ROI Calculator</h2>
                        </motion.div>

                        <div className="grid gap-8 xl:grid-cols-2">
                            <motion.article initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-[30px] border border-white/10 bg-[linear-gradient(170deg,#ffffff_0%,#f5f2ea_100%)] p-6 text-[#1d1f22] md:p-8">
                                <div className="mb-6 flex items-center gap-3">
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#1d1f22] text-white">
                                        <Calculator className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <h3 className="text-2xl font-light text-[#1d1f22]">EMI Calculator</h3>
                                        <p className="text-sm text-[#1d1f22]/65">Based on your client-shared structure</p>
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="block text-sm">Plot Size (Katha)
                                        <input type="number" min="0" value={plotSize} onChange={(e) => setPlotSize(num(e.target.value))} className="mt-1 w-full rounded-xl border border-[#1d1f22]/15 bg-white px-3 py-2.5 text-sm" />
                                    </label>
                                    <label className="block text-sm">Price per Katha (BDT)
                                        <input type="number" min="0" value={pricePerKatha} onChange={(e) => setPricePerKatha(num(e.target.value))} className="mt-1 w-full rounded-xl border border-[#1d1f22]/15 bg-white px-3 py-2.5 text-sm" />
                                    </label>
                                    <label className="block text-sm">Development Fee / Katha
                                        <input type="number" min="0" value={developmentFee} onChange={(e) => setDevelopmentFee(num(e.target.value))} className="mt-1 w-full rounded-xl border border-[#1d1f22]/15 bg-white px-3 py-2.5 text-sm" />
                                    </label>
                                    <label className="block text-sm">Booking Money
                                        <input type="number" min="0" value={bookingMoney} onChange={(e) => setBookingMoney(num(e.target.value))} className="mt-1 w-full rounded-xl border border-[#1d1f22]/15 bg-white px-3 py-2.5 text-sm" />
                                    </label>
                                    <label className="block text-sm">Down Payment (Fixed)
                                        <input type="number" min="0" value={fixedDownPayment} onChange={(e) => setFixedDownPayment(num(e.target.value))} className="mt-1 w-full rounded-xl border border-[#1d1f22]/15 bg-white px-3 py-2.5 text-sm" />
                                    </label>
                                    <label className="block text-sm">Additional Down Payment
                                        <input type="number" min="0" value={extraDownPayment} onChange={(e) => setExtraDownPayment(num(e.target.value))} className="mt-1 w-full rounded-xl border border-[#1d1f22]/15 bg-white px-3 py-2.5 text-sm" />
                                    </label>
                                </div>

                                <div className="mt-6">
                                    <p className="text-xs uppercase tracking-[0.16em] text-[#1d1f22]/60">Installment Plan</p>
                                    <div className="mt-3 grid gap-2 sm:grid-cols-3">
                                        {installmentOptions.map((item) => {
                                            const active = item.id === installmentId;
                                            return (
                                                <button key={item.id} type="button" onClick={() => setInstallmentId(item.id)} className={`rounded-xl border px-3 py-2 text-left text-sm transition-all ${active ? 'border-[#1d1f22] bg-[#1d1f22] text-white' : 'border-[#1d1f22]/20 bg-white text-[#1d1f22] hover:border-[#1d1f22]/45'}`}>
                                                    <p className="font-medium">{item.months} months</p>
                                                    <p className={`text-xs ${active ? 'text-white/80' : 'text-[#1d1f22]/60'}`}>DP: {item.dpPercent}%</p>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div className="mt-7 rounded-2xl border border-[#1d1f22]/12 bg-white p-5">
                                    <div className="grid gap-3">
                                        <p className="flex items-center justify-between text-sm">
                                            <span className="inline-flex items-center gap-2 text-[#1d1f22]/70"><Wallet className="h-4 w-4" /> Total Property Cost</span>
                                            <strong>{fmt(calc.total)}</strong>
                                        </p>
                                        <p className="flex items-center justify-between text-sm"><span className="text-[#1d1f22]/70">Required DP ({activeInstallment.dpPercent}%)</span><strong>{fmt(calc.requiredDp)}</strong></p>
                                        <p className="flex items-center justify-between text-sm"><span className="text-[#1d1f22]/70">Total Upfront</span><strong>{fmt(calc.upfront)}</strong></p>
                                        <p className="flex items-center justify-between text-sm"><span className="text-[#1d1f22]/70">Total Dues</span><strong>{fmt(calc.due)}</strong></p>
                                        <p className="mt-1 flex items-center justify-between rounded-xl bg-[#1d1f22] px-4 py-3 text-sm text-white">
                                            <span>Per Installment ({activeInstallment.months} months)</span>
                                            <strong className="text-base">{fmt(calc.perInstallment)}</strong>
                                        </p>
                                    </div>
                                </div>
                            </motion.article>

                            <motion.article initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="rounded-[30px] border border-[#4ECDC4]/25 bg-[linear-gradient(165deg,#171a1d_0%,#0f1113_100%)] p-6 text-white md:p-8">
                                <div className="mb-6 flex items-center gap-3">
                                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#4ECDC4]/20 text-[#9df4ed]"><TrendingUp className="h-5 w-5" /></span>
                                    <div>
                                        <h3 className="text-2xl font-light text-[#fffce1]">ROI Calculator</h3>
                                        <p className="text-sm text-white/65">Growth and return projection</p>
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <label className="block text-sm">Expected Growth / Year (%)
                                        <input type="number" min="0" value={growthRate} onChange={(e) => setGrowthRate(num(e.target.value))} className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white" />
                                    </label>
                                    <label className="block text-sm">Holding Period (Years)
                                        <input type="number" min="1" value={holdingYears} onChange={(e) => setHoldingYears(num(e.target.value))} className="mt-1 w-full rounded-xl border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white" />
                                    </label>
                                    <label className="block text-sm sm:col-span-2">Annual Rental Yield (%)
                                        <input type="range" min="0" max="8" step="0.5" value={rentalYield} onChange={(e) => setRentalYield(num(e.target.value))} className="mt-3 w-full accent-[#4ECDC4]" />
                                        <span className="mt-2 inline-block text-xs text-white/70">{rentalYield}% yearly rental yield assumption</span>
                                    </label>
                                </div>

                                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                                    <article className="rounded-2xl border border-white/12 bg-white/[0.04] p-4"><p className="text-xs uppercase tracking-[0.14em] text-white/55">Projected Value</p><p className="mt-2 text-xl font-light text-[#fffce1]">{fmt(calc.future)}</p></article>
                                    <article className="rounded-2xl border border-white/12 bg-white/[0.04] p-4"><p className="text-xs uppercase tracking-[0.14em] text-white/55">Capital Gain</p><p className="mt-2 text-xl font-light text-[#7DE5DD]">{fmt(calc.gain)}</p></article>
                                    <article className="rounded-2xl border border-white/12 bg-white/[0.04] p-4"><p className="text-xs uppercase tracking-[0.14em] text-white/55">Rental Income</p><p className="mt-2 text-xl font-light text-[#9df4ed]">{fmt(calc.rent)}</p></article>
                                    <article className="rounded-2xl border border-[#4ECDC4]/40 bg-[#4ECDC4]/10 p-4"><p className="text-xs uppercase tracking-[0.14em] text-[#9df4ed]">Total ROI</p><p className="mt-2 text-xl font-semibold text-[#d8fffa]">{calc.roi.toFixed(2)}%</p></article>
                                </div>
                            </motion.article>
                        </div>
                    </div>
                </section>
            </main>
        </WebLayout>
    );
}
