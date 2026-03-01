import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

const CONTACT_ITEMS = [
    {
        label: 'Call Us',
        value: '(555) 214-7780',
        icon: Phone,
    },
    {
        label: 'Email',
        value: 'hello@nexthomeproperties.com',
        icon: Mail,
    },
    {
        label: 'Visit Us',
        value: '2420 Heritage Park Dr, Suite 120, Austin, TX',
        icon: MapPin,
    },
];

export default function AboutContactSection() {
    return (
        <section className="relative w-full overflow-hidden">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('/assets/images/unnamed.jpg')" }}
            />
            <div
                className="absolute inset-0"
                style={{ backgroundImage: 'linear-gradient(to bottom right, rgb(179 179 179 / 80%), rgb(54 61 79 / 75%))' }}
            />
            <div className="relative z-10 web-medium-container px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-14 lg:px-12 lg:py-20">
                <div className="grid gap-6 rounded-3xl p-5 shadow-[0_18px_50px_rgba(15,23,42,0.35)] sm:gap-8 sm:p-6 md:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-10 lg:p-12">
                    <div>
                        <p className="section-sub-title text-amber-300/90">Connect With Us</p>
                        <h2 className="mt-4 section-title text-white">
                            Let&apos;s Plan Your Next Move
                        </h2>
                        <p className="mt-5 card-description-big text-white/80">
                            Whether you&apos;re searching for your next home or exploring investment opportunities, our team is ready to help.
                            Share your goals and we&apos;ll respond with tailored guidance and local market insight.
                        </p>

                        <div className="mt-7 rounded-2xl border border-black/10 p-4 text-white shadow-[0_14px_30px_rgba(15,23,42,0.25)] sm:p-5 md:p-6 lg:mt-8 lg:p-8"
                            style={{ backgroundColor: 'rgba(255, 255, 255, 0.22)' }}>
                            <p className="text-[20px] leading-7 font-semibold tracking-[1.8451px] mb-5 uppercase text-white/70">Contact Details</p>
                            <div className="mt-4 space-y-4">
                                {CONTACT_ITEMS.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div key={item.label} className="flex items-start gap-4">
                                            <div className="mt-1 flex h-10 w-10 items-center justify-center rounded-xl bg-black/10">
                                                <Icon className="h-5 w-5 text-white" />
                                            </div>
                                            <div>
                                                <p className="text-sm uppercase tracking-[0.2em] text-white/70 m-0">{item.label}</p>
                                                <p className="mt-1 break-words text-base font-medium text-white">{item.value}</p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>

                    <div className="rounded-2xl border border-black/10 p-4 text-white shadow-[0_14px_30px_rgba(15,23,42,0.25)] sm:p-5 md:p-6 lg:p-8"
                        style={{ backgroundColor: 'rgba(255, 255, 255, 0.22)' }}>
                        {/* <p className="text-xs uppercase tracking-[0.32em] text-white/80">Send A Message</p> */}
                        <form className="mt-5 space-y-4">
                            <div>
                                <label className="text-xs uppercase tracking-[0.2em] text-white/70" htmlFor="about-contact-name">
                                    Full Name
                                </label>
                                <input
                                    id="about-contact-name"
                                    type="text"
                                    placeholder="Enter your name"
                                    className="mt-2 w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-500 focus:border-amber-300 focus:outline-none sm:px-4 sm:py-3"
                                />
                            </div>
                            <div>
                                <label className="text-xs uppercase tracking-[0.2em] text-white/70" htmlFor="about-contact-email">
                                    Email Address
                                </label>
                                <input
                                    id="about-contact-email"
                                    type="email"
                                    placeholder="you@email.com"
                                    className="mt-2 w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-500 focus:border-amber-300 focus:outline-none sm:px-4 sm:py-3"
                                />
                            </div>
                            <div>
                                <label className="text-xs uppercase tracking-[0.2em] text-white/70" htmlFor="about-contact-phone">
                                    Phone Number
                                </label>
                                <input
                                    id="about-contact-phone"
                                    type="tel"
                                    placeholder="(555) 555-5555"
                                    className="mt-2 w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-500 focus:border-amber-300 focus:outline-none sm:px-4 sm:py-3"
                                />
                            </div>
                            <div>
                                <label className="text-xs uppercase tracking-[0.2em] text-white/70" htmlFor="about-contact-interest">
                                    Interested In
                                </label>
                                <select
                                    id="about-contact-interest"
                                    className="mt-2 w-full rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-slate-800 focus:border-amber-300 focus:outline-none sm:px-4 sm:py-3"
                                    defaultValue=""
                                >
                                    <option value="" disabled className="text-slate-900">
                                        Select a topic
                                    </option>
                                    <option value="buying" className="text-slate-900">
                                        Buying a Home
                                    </option>
                                    <option value="selling" className="text-slate-900">
                                        Selling a Home
                                    </option>
                                    <option value="investment" className="text-slate-900">
                                        Investment Opportunities
                                    </option>
                                    <option value="development" className="text-slate-900">
                                        Community Development
                                    </option>
                                </select>
                            </div>
                            <div>
                                <label className="text-xs uppercase tracking-[0.2em] text-white/70" htmlFor="about-contact-message">
                                    Message
                                </label>
                                <textarea
                                    id="about-contact-message"
                                    rows="4"
                                    placeholder="Tell us what you need help with."
                                    className="mt-2 w-full resize-none rounded-xl border border-black/15 bg-white px-3.5 py-2.5 text-sm text-slate-800 placeholder:text-slate-500 focus:border-amber-300 focus:outline-none sm:px-4 sm:py-3"
                                />
                            </div>
                            <button
                                type="submit"
                                className="mt-2 inline-flex w-full items-center justify-center rounded-full bg-amber-300 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-900 transition hover:bg-amber-200 sm:py-3 sm:text-xs sm:tracking-[0.26em]"
                            >
                                Submit Your Request
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
