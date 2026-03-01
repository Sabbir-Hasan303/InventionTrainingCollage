import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, Check } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextField } from '@mui/material';
import WebLayout from '@/Layouts/WebLayout';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const fieldSx = {
        '& .MuiOutlinedInput-root': {
            minHeight: 58,
            borderRadius: '0.9rem',
            backgroundColor: 'rgba(255,255,255,0.82)',
            color: '#1A1A1A',
            boxShadow: 'inset 0 1px 1px rgba(10,10,10,0.04)',
            '& fieldset': { borderColor: 'rgba(20,20,20,0.14)' },
            '&:hover fieldset': { borderColor: 'rgba(47,168,157,0.65)' },
            '&.Mui-focused fieldset': { borderColor: '#2FA89D', borderWidth: '1px' },
        },
        '& .MuiInputBase-input': {
            fontSize: '0.98rem',
        },
        '& .MuiInputLabel-root': { color: 'rgba(26,26,26,0.7)', fontSize: '0.96rem' },
        '& .MuiInputLabel-root.Mui-focused': { color: '#2FA89D' },
    };

    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const heroRef = useRef(null);
    const bgRef = useRef(null);

    useEffect(() => {
        let heroTween;

        if (heroRef.current && bgRef.current) {
            heroTween = gsap.to(bgRef.current, {
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                },
                yPercent: 30
            });
        }

        return () => {
            heroTween?.scrollTrigger?.kill();
            heroTween?.kill();
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            message: ''
        });
    };

    const contactInfo = [
        {
            icon: MapPin,
            title: 'Office Address',
            content: 'Dhaka, Bangladesh',
            link: 'https://maps.google.com/?q=Dhaka,Bangladesh'
        },
        {
            icon: Phone,
            title: 'Phone',
            content: '+880 1742 122765',
            link: 'tel:+8801742122765'
        },
        {
            icon: Mail,
            title: 'Email',
            content: 'nexthomeproperties2030@gmail.com',
            link: 'mailto:nexthomeproperties2030@gmail.com'
        },
        {
            icon: Clock,
            title: 'Working Hours',
            content: 'Saturday - Thursday',
            subtitle: '9:00 AM - 6:00 PM'
        },
    ];

    return (
        <WebLayout>
            {/* Hero Section with Parallax */}
            <section ref={heroRef} className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div ref={bgRef} className="absolute inset-0 w-full h-[120%]">
                    <img
                        src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80"
                        alt="Contact"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-[#0A0A0A]" />
                </div>

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="inline-block text-[#4ECDC4] text-sm tracking-[0.4em] uppercase mb-6 font-light">
                            GET IN TOUCH
                        </span>
                        <h1 className="text-5xl md:text-7xl font-light text-white mb-6 leading-tight">
                            Let's Start Your<br />Investment Journey
                        </h1>
                        <p className="text-xl text-white/70 max-w-2xl mx-auto">
                            Our team is ready to guide you toward smart property decisions
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form + Map */}
            <section className="py-24 bg-light">
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <span className="text-[#2FA89D] text-sm tracking-[0.3em] uppercase font-light">
                            SEND US A MESSAGE
                        </span>
                        <h2 className="text-4xl md:text-5xl font-light text-[#1A1A1A] mt-6 mb-4">
                            We're Here to Help
                        </h2>
                        <p className="text-[#1A1A1A]/70 text-lg max-w-2xl mx-auto">
                            Fill out the form below and our team will get back to you within 24 hours
                        </p>
                    </motion.div>

                    <div className="grid xl:grid-cols-2 gap-8">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-[linear-gradient(180deg,#ffffff_0%,#f7f5ef_100%)] rounded-[28px] p-8 md:p-10 border border-[#0A0A0A]/10 shadow-[0_18px_48px_rgba(17,24,39,0.08)]"
                        >
                            {isSubmitted ? (
                                <div className="text-center py-16">
                                    <div className="w-24 h-24 mx-auto bg-[#4ECDC4]/10 rounded-full flex items-center justify-center mb-8">
                                        <Check className="w-12 h-12 text-[#2FA89D]" />
                                    </div>
                                    <h3 className="text-3xl font-light text-[#1A1A1A] mb-4">Message Sent!</h3>
                                    <p className="text-[#1A1A1A]/70 text-lg mb-10">
                                        Thank you for reaching out. We'll get back to you within 24 hours.
                                    </p>
                                    <button
                                        onClick={() => setIsSubmitted(false)}
                                        className="px-8 py-4 bg-[#4ECDC4] text-black rounded-full hover:bg-[#3db8ad] transition-all font-medium"
                                    >
                                        Send Another Message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-8">
                                        <p className="text-[11px] tracking-[0.25em] uppercase text-[#2FA89D] mb-2">Contact Form</p>
                                        <p className="text-[#1A1A1A]/70 text-sm">Share a few details and our team will reach out shortly.</p>
                                    </div>

                                    <div className="grid md:grid-cols-2 gap-5 mb-5">
                                        <div>
                                            <TextField
                                                id="first_name"
                                                label="First Name"
                                                fullWidth
                                                value={formData.first_name}
                                                onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                                placeholder="John"
                                                required
                                                sx={fieldSx}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                id="last_name"
                                                label="Last Name"
                                                fullWidth
                                                value={formData.last_name}
                                                onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                                placeholder="Doe"
                                                required
                                                sx={fieldSx}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                id="email"
                                                label="Email Address"
                                                type="email"
                                                fullWidth
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                placeholder="john@example.com"
                                                required
                                                sx={fieldSx}
                                            />
                                        </div>
                                        <div>
                                            <TextField
                                                id="phone"
                                                label="Phone Number"
                                                fullWidth
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                placeholder="+880 1234 567890"
                                                sx={fieldSx}
                                            />
                                        </div>
                                    </div>

                                    <div className="mb-8 w-full">
                                        <TextField
                                            id="message"
                                            label="Message"
                                            fullWidth
                                            multiline
                                            rows={6}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            placeholder="Tell us about your requirements..."
                                            required
                                            sx={fieldSx}
                                        />
                                    </div>

                                    <div className="flex items-center justify-between gap-4 flex-wrap">
                                        <p className="text-xs text-[#1A1A1A]/55">Usually replies within 24 hours.</p>
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="min-w-[210px] px-8 py-3.5 bg-[#1A1A1A] text-white rounded-full hover:bg-[#000000] transition-all font-medium text-base flex items-center justify-center gap-3 disabled:opacity-50 shadow-[0_10px_26px_rgba(0,0,0,0.16)]"
                                        >
                                            {isSubmitting ? 'Sending...' : 'Send Message'}
                                            <span className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center">
                                                <Send className="w-4 h-4" />
                                            </span>
                                        </button>
                                    </div>
                                </form>
                            )}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-3xl border border-[#0A0A0A]/10 p-3 shadow-sm"
                        >
                            <iframe
                                src="https://www.google.com/maps?q=Dhaka,Bangladesh&output=embed"
                                className="w-full h-full min-h-[450px] rounded-2xl"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact Cards */}
            <section className="relative overflow-hidden py-32 bg-light">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-fixed"
                    style={{
                        backgroundImage: "url('https://images.pexels.com/photos/5324853/pexels-photo-5324853.jpeg')"
                    }}
                />
                <div className="absolute inset-0 bg-[#0A0A0A]/35" />

                <div className="relative z-10 max-w-7xl mx-auto px-6">
                    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                        {contactInfo.map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="relative overflow-hidden rounded-[10px] border border-white/25 bg-[linear-gradient(145deg,rgba(18,18,18,0.46)_0%,rgba(12,12,12,0.56)_50%,rgba(8,8,8,0.5)_100%)] backdrop-blur-xl p-8 shadow-[0_14px_40px_rgba(0,0,0,0.32)] min-h-[280px] group"
                            >
                                <div className="absolute inset-[1px] rounded-[9px] bg-[linear-gradient(180deg,rgba(255,255,255,0.1)_0%,rgba(255,255,255,0.02)_35%,rgba(255,255,255,0.01)_100%)] pointer-events-none" />
                                <div className="absolute -right-24 -top-24 w-72 h-72 rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.15)_0%,_rgba(255,255,255,0.05)_45%,_transparent_72%)] blur-2xl pointer-events-none" />
                                <div className="absolute -left-28 -bottom-28 w-[280px] h-[280px] rounded-full bg-[radial-gradient(circle,_rgba(255,255,255,0.1)_0%,_rgba(255,255,255,0.03)_50%,_transparent_76%)] blur-2xl pointer-events-none" />
                                <div className="absolute inset-0 bg-black/18 group-hover:bg-black/10 transition-colors" />

                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-xl border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center mb-6">
                                        <item.icon className="w-6 h-6 text-[#F2EEE3]" />
                                    </div>
                                    <h4 className="text-[#C4CED8] text-sm uppercase tracking-wider mb-3 font-semibold">{item.title}</h4>
                                    {item.link ? (
                                        <a
                                            href={item.link}
                                            className={`block max-w-full text-[#F2EEE3] text-lg leading-8 font-light hover:text-[#9DDFD8] transition-colors ${item.title === 'Email' ? 'break-all' : 'break-words'}`}
                                        >
                                            {item.content}
                                        </a>
                                    ) : (
                                        <>
                                            <p className="text-[#F2EEE3] text-lg leading-8 font-light break-words">{item.content}</p>
                                            {item.subtitle && <p className="text-[#C4CED8] text-sm mt-2">{item.subtitle}</p>}
                                        </>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </WebLayout>
    );
}
