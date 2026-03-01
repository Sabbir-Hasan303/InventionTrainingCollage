import React, { useEffect } from "react"
// import Navbar from "@/Pages/Web/Navbar"
// import Footer from "@/Pages/Web/Footer"
import '../../css/web.css'
import { Toaster, toast } from "react-hot-toast"
import { usePage } from '@inertiajs/react'
import CursorFollower from "@/Components/gsap_animation/CursorFollower"
import Footer from '@/Components/web/Footer';
import GoToTopButton from '@/Components/web/GoToTopButton';
import WhatsAppButton from '@/Components/web/WhatsAppButton';
import Navbar from "@/Components/web/Home/Navbar"
import ITCFooter from "@/Components/web/ITCFooter";

export default function WebLayout({ children }) {
    const { flash } = usePage().props

    useEffect(() => {
        if (flash?.success) {
            toast.success(flash.success)
        }
        if (flash?.error) {
            toast.error(flash.error)
        }
    }, [flash])

    return (
        <div className='bg-dark' style={{ fontFamily: 'Brown, sans-serif' }}>
            {/* <Navbar /> */}
            <Navbar />
            {/* <CursorFollower /> */}
            {children}
            {/* <Footer /> */}
            <ITCFooter />
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
