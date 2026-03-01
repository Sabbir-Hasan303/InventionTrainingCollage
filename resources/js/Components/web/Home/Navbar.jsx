import { useState, useEffect } from "react";
import { Link, usePage } from "@inertiajs/react";
import { IconButton } from "@mui/material";
import { Menu, Close } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", path: "/" },
  {
    label: "Courses",
    path: "/courses",
    children: [
      { label: "All Courses", path: "/courses" },
      { label: "Community & Care", path: "/category/community-care" },
      { label: "Education & Childcare", path: "/category/education-childcare" },
      { label: "Security", path: "/category/security" },
    ],
  },
  { label: "Students", path: "/students" },
  { label: "About", path: "/about" },
  { label: "FAQs", path: "/faqs" },
  { label: "Contact", path: "/contact" },
];

export default function Navbar() {
  const { url } = usePage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(null);
  const [mobileOpenItem, setMobileOpenItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  const showBackground = isScrolled || hoveredItem !== null || desktopDropdownOpen !== null || isMobileMenuOpen;
  const currentPathRaw = (url || "/").split("?")[0] || "/";
  const currentPath = currentPathRaw.startsWith("/") ? currentPathRaw : `/${currentPathRaw}`;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled((window.scrollY || window.pageYOffset || 0) > 0);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setDesktopDropdownOpen(null);
    setMobileOpenItem(null);
    setHoveredItem(null);
  }, [url]);

  const isNavItemActive = (item) => {
    if (item.children?.length) {
      if (currentPath === item.path || currentPath.startsWith(`${item.path}/`)) return true;
      return item.children.some((child) => currentPath === child.path || currentPath.startsWith(`${child.path}/`));
    }
    if (item.path === "/") return currentPath === "/";
    return currentPath === item.path || currentPath.startsWith(`${item.path}/`);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setMobileOpenItem(null);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          showBackground ? "bg-[#161719]/95 backdrop-blur-md shadow-2xl border-b border-white/10" : "bg-transparent"
        }`}
        onMouseLeave={() => {
          setDesktopDropdownOpen(null);
          setHoveredItem(null);
        }}
      >
        <div className="mx-auto px-3 lg:px-8 h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <img src="/assets/images/ITC-logo3.png" alt="Invention Training" className="h-16 w-auto object-contain" />
          </Link>

          <div className="hidden xl:flex items-center gap-10">
            {navItems.map((item) => {
              const isActiveItem = isNavItemActive(item);
              const isDropdownOpen = desktopDropdownOpen === item.label;

              return (
                <div
                  key={item.label}
                  className="relative group"
                  onMouseEnter={() => {
                    setHoveredItem(item.label);
                    setDesktopDropdownOpen(item.children?.length ? item.label : null);
                  }}
                >
                  <Link
                    href={item.path}
                    className={`relative text-sm font-light tracking-[0.15em] uppercase transition-colors flex items-center gap-2 pb-2 ${
                      isActiveItem ? "text-white" : "text-white/80 hover:text-white"
                    }`}
                  >
                    {item.label}
                    {item.children?.length > 0 && (
                      <svg
                        className={`w-3 h-3 transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <span
                      className={`absolute left-0 -bottom-[6px] h-px w-full origin-left bg-[#d7b55a] transition-transform duration-300 ${
                        hoveredItem === item.label || isActiveItem || isDropdownOpen ? "scale-x-100" : "scale-x-0"
                      }`}
                    />
                  </Link>

                  <AnimatePresence>
                    {item.children?.length > 0 && isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                        className="absolute left-0 top-full mt-4 w-[320px] rounded-2xl border border-white/10 bg-[#161719] p-2 shadow-[0_24px_50px_rgba(0,0,0,0.45)]"
                      >
                        {item.children.map((child) => {
                          const childActive = currentPath === child.path || currentPath.startsWith(`${child.path}/`);
                          return (
                            <Link
                              key={child.path}
                              href={child.path}
                              className={`block rounded-xl px-4 py-3 text-sm tracking-[0.06em] uppercase transition-colors ${
                                childActive ? "bg-white/10 text-[#f7e4af]" : "text-white/75 hover:bg-white/[0.06] hover:text-white"
                              }`}
                            >
                              {child.label}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden xl:block">
              <Link
                href="/contact"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl border border-[#d7b55a]/50 bg-[#131519]/92 py-1.5 pl-5 pr-1.5 text-[12px] font-semibold tracking-[0.16em] text-[#fff2c8] shadow-[0_10px_24px_rgba(0,0,0,0.34)] backdrop-blur-md transition-all duration-300 hover:-translate-y-[1px] hover:border-[#e6c777] hover:shadow-[0_14px_30px_rgba(0,0,0,0.4)]"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-[#d7b55a]/10 via-transparent to-[#d7b55a]/5 opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                <span className="relative z-10">ENQUIRE NOW</span>
                <span className="relative z-10 inline-flex h-8 w-8 items-center justify-center rounded-xl bg-[#d7b55a] text-[#1b1d20] shadow-[inset_0_-1px_0_rgba(0,0,0,0.22)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:scale-105">
                  <img src="/assets/images/arrow-right.png" alt="" className="h-3.5 w-3.5 object-contain" aria-hidden="true" />
                </span>
              </Link>
            </div>

            <IconButton className="xl:!hidden" onClick={() => setIsMobileMenuOpen(true)}>
              <Menu className="text-white" />
            </IconButton>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
              onClick={closeMobileMenu}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#161719] p-6 overflow-y-auto"
            >
              <div className="mb-6 flex items-center justify-between">
                <span className="text-white text-2xl font-light tracking-[0.14em] leading-none">MENU</span>
                <IconButton onClick={closeMobileMenu}>
                  <Close className="text-white" />
                </IconButton>
              </div>

              <div className="space-y-0">
                {navItems.map((item) => {
                  const isActiveItem = isNavItemActive(item);
                  const hasChildren = item.children?.length > 0;
                  const isOpen = mobileOpenItem === item.label;

                  return (
                    <div key={item.label} className="border-b border-white/10">
                      <div className="flex items-center justify-between py-[1.125rem]">
                        <Link
                          href={item.path}
                          className={`text-[1.35rem] font-light tracking-[0.06em] leading-none ${
                            isActiveItem ? "text-[#f7e4af]" : "text-white"
                          }`}
                          onClick={closeMobileMenu}
                        >
                          {item.label}
                        </Link>
                        {hasChildren && (
                          <button
                            type="button"
                            onClick={() => setMobileOpenItem(isOpen ? null : item.label)}
                            className="p-1 text-white/70"
                            aria-label={`Toggle ${item.label} submenu`}
                          >
                            <svg className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} fill="currentColor" viewBox="0 0 20 20">
                              <path
                                fillRule="evenodd"
                                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </button>
                        )}
                      </div>

                      <AnimatePresence>
                        {hasChildren && isOpen && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden pb-3"
                          >
                            <div className="space-y-1">
                              {item.children.map((child) => {
                                const isChildActive = currentPath === child.path || currentPath.startsWith(`${child.path}/`);
                                return (
                                  <Link
                                    key={child.path}
                                    href={child.path}
                                    onClick={closeMobileMenu}
                                    className={`block rounded-lg px-3 py-2 text-sm tracking-[0.07em] uppercase ${
                                      isChildActive
                                        ? "bg-white/10 text-[#f7e4af]"
                                        : "text-white/70 hover:bg-white/[0.06] hover:text-white"
                                    }`}
                                  >
                                    {child.label}
                                  </Link>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              <div className="pt-6 mt-6 border-t border-white/10">
                <Link
                  href="/contact"
                  onClick={closeMobileMenu}
                  className="inline-flex h-11 w-full items-center justify-center rounded-full border border-[#4ECDC4]/50 bg-[#4ECDC4]/12 px-3 text-center text-[0.72rem] font-medium tracking-[0.16em] text-[#7DE5DD] transition-all duration-300 hover:border-[#7DE5DD] hover:bg-[#4ECDC4]/20 hover:text-white"
                >
                  ENQUIRE NOW
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
