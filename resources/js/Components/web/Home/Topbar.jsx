import { useEffect, useState } from "react";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FmdGoodOutlinedIcon from "@mui/icons-material/FmdGoodOutlined";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

export default function Topbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const textTone = isScrolled ? "text-[#20242a]" : "text-white/80";
    const labelTone = isScrolled ? "text-[#1b2026]" : "text-[#f2e2b2]";
    const dividerTone = isScrolled ? "bg-[#1f242b]/20" : "bg-white/20";
    const socialBtnTone = isScrolled
        ? "border-[#1f242b]/20 bg-white/70 text-[#2a3138] hover:border-[#d7b55a]/55 hover:bg-[#d7b55a]/12 hover:text-[#171a1f]"
        : "border-[#d7b55a]/35 bg-black/20 text-[#f7e4af] hover:border-[#e6c777] hover:bg-[#d7b55a]/15 hover:text-white";
    const chipTone = isScrolled
        ? "border-[#1f242b]/15 bg-white/72 text-[#2a3138] hover:border-[#d7b55a]/55 hover:text-[#1c2127]"
        : "border-white/10 bg-black/20 text-white/85 hover:border-[#d7b55a]/45 hover:text-[#f7e4af]";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled((window.scrollY || window.pageYOffset || 0) > 0);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <div
            className={`fixed top-0 left-0 right-0 z-40 h-11 transition-all duration-500 ${isScrolled ? "bg-light backdrop-blur-md shadow-2xl" : "bg-transparent"
                }`}
        >
            <div className="flex h-full web-giant-container items-center justify-between px-3 lg:px-8">
                <div className={`flex items-center gap-3 text-[11px] tracking-[0.12em] ${textTone}`}>
                    <span className={`hidden font-semibold uppercase sm:inline ${labelTone}`}>Follow Us</span>
                    <div className={`hidden sm:inline h-4 w-px ${dividerTone}`} />
                    <div className="flex items-center gap-1.5">
                        <a
                            href="https://facebook.com"
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-px sm:h-6 sm:w-6 ${socialBtnTone}`}
                            aria-label="Facebook"
                        >
                            <FacebookRoundedIcon sx={{ fontSize: 14 }} />
                        </a>
                        <a
                            href="https://instagram.com"
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-px sm:h-6 sm:w-6 ${socialBtnTone}`}
                            aria-label="Instagram"
                        >
                            <InstagramIcon sx={{ fontSize: 14 }} />
                        </a>
                        <a
                            href="https://linkedin.com"
                            target="_blank"
                            rel="noreferrer"
                            className={`inline-flex h-5 w-5 items-center justify-center rounded-full border transition-all duration-300 hover:-translate-y-px sm:h-6 sm:w-6 ${socialBtnTone}`}
                            aria-label="LinkedIn"
                        >
                            <LinkedInIcon sx={{ fontSize: 14 }} />
                        </a>
                    </div>
                </div>

                <div className={`flex items-center gap-1.5 lg:hidden ${textTone}`}>
                    <a
                        href="mailto:info@inventiontraining.com.au"
                        className={`inline-flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${chipTone}`}
                        aria-label="Email"
                    >
                        <MailOutlineIcon sx={{ fontSize: 13 }} className="text-[#d7b55a]" />
                    </a>
                    <a
                        href="tel:+61390000000"
                        className={`inline-flex h-6 w-6 items-center justify-center rounded-full border transition-colors ${chipTone}`}
                        aria-label="Phone"
                    >
                        <LocalPhoneOutlinedIcon sx={{ fontSize: 13 }} className="text-[#d7b55a]" />
                    </a>
                </div>

                <div className={`hidden lg:flex items-center gap-2 text-[11px] tracking-[0.08em] ${textTone}`}>
                    <a
                        href="#"
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 transition-colors ${chipTone}`}
                    >
                        <FmdGoodOutlinedIcon sx={{ fontSize: 13 }} className="text-[#d7b55a]" />
                        <span>Level 2, 123 Collins St, Melbourne</span>
                    </a>
                    <a
                        href="mailto:info@inventiontraining.com.au"
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 transition-colors ${chipTone}`}
                    >
                        <MailOutlineIcon sx={{ fontSize: 13 }} className="text-[#d7b55a]" />
                        <span>info@inventiontraining.com.au</span>
                    </a>
                    <a
                        href="tel:+61390000000"
                        className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 transition-colors ${chipTone}`}
                    >
                        <LocalPhoneOutlinedIcon sx={{ fontSize: 13 }} className="text-[#d7b55a]" />
                        <span>+61 3 9000 0000</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
