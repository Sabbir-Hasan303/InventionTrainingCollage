import React, { useEffect, useRef } from "react"
// import Navbar from "@/Pages/Web/Navbar"
// import Footer from "@/Pages/Web/Footer"
import '../../css/web.css'
import { Toaster, toast } from "react-hot-toast"
import { usePage } from '@inertiajs/react'
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import GoToTopButton from '@/Components/web/GoToTopButton';
import WhatsAppButton from '@/Components/web/WhatsAppButton';
import Navbar from "@/Components/web/Home/Navbar"
import Topbar from "@/Components/web/Home/Topbar";
import ITCFooter from "@/Components/web/ITCFooter";

export default function WebLayout({ children }) {
    const page = usePage()
    const { flash } = page.props
    const { url } = page
    const smoothWrapperRef = useRef(null)
    const smoothContentRef = useRef(null)

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success)
        }
        if (flash?.error) {
            toast.error(flash.error)
        }
    }, [flash])

    useEffect(() => {
        if (!smoothWrapperRef.current || !smoothContentRef.current) return

        gsap.registerPlugin(ScrollTrigger, ScrollSmoother)
        const existingSmoother = ScrollSmoother.get()
        if (existingSmoother) existingSmoother.kill()

        const smoother = ScrollSmoother.create({
            wrapper: smoothWrapperRef.current,
            content: smoothContentRef.current,
            smooth: 1.8,
            smoothTouch: 0,
            effects: true,
            normalizeScroll: false,
            speed: 1,
            ignoreMobileResize: true,
        })

        return () => {
            smoother.kill()
        }
    }, [])

    useEffect(() => {
        requestAnimationFrame(() => {
            ScrollTrigger.refresh()
        })
    }, [url])

    return (
        <div className='bg-dark' style={{ fontFamily: 'Brown, sans-serif' }}>
            {/* <Navbar /> */}
            <Topbar />
            <Navbar />
            {/* <CursorFollower /> */}
            <div id="smooth-wrapper" ref={smoothWrapperRef}>
                <div id="smooth-content" ref={smoothContentRef}>
                    {children}
                    {/* <Footer /> */}
                    <ITCFooter />
                </div>
            </div>
            <GoToTopButton />
            <WhatsAppButton />

            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 4000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: '#4ade80',
                            secondary: '#fff',
                        },
                    },
                    error: {
                        duration: 5000,
                        iconTheme: {
                            primary: '#ef4444',
                            secondary: '#fff',
                        },
                    },
                }}
            />
        </div>
    )
}
