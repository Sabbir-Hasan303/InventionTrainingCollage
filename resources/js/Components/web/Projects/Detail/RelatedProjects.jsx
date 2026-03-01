import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from '@inertiajs/react';
import { ArrowLeft, ArrowRight, MapPin } from 'lucide-react';

const getPositionClass = (offset) => {
    if (offset === 0) {
        return '[transform:translate3d(0,0,0)_rotateY(0deg)] sm:[transform:translate3d(0,0,240px)_rotateY(0deg)] z-10 opacity-100 shadow-[0_40px_80px_rgba(0,0,0,0.8)]';
    }

    if (offset === -1) {
        return '[transform:translate3d(-63%,0,-120px)_rotateY(18deg)_scale(0.86)] sm:[transform:translate3d(-34vw,0,-150px)_rotateY(35deg)_scale(0.86)] xl:[transform:translate3d(-30vw,0,-140px)_rotateY(32deg)_scale(0.88)] z-[5] opacity-45 sm:opacity-55';
    }

    if (offset === 1) {
        return '[transform:translate3d(63%,0,-120px)_rotateY(-18deg)_scale(0.86)] sm:[transform:translate3d(34vw,0,-150px)_rotateY(-35deg)_scale(0.86)] xl:[transform:translate3d(30vw,0,-140px)_rotateY(-32deg)_scale(0.88)] z-[5] opacity-45 sm:opacity-55';
    }

    if (offset < -1) {
        return '[transform:translate3d(-140%,0,0)] sm:[transform:translate3d(-59vw,0,-500px)_rotateY(44deg)_scale(0.62)] xl:[transform:translate3d(-54vw,0,-500px)_rotateY(42deg)_scale(0.62)] z-[1] opacity-0 sm:opacity-20';
    }

    if (offset > 1) {
        return '[transform:translate3d(140%,0,0)] sm:[transform:translate3d(59vw,0,-500px)_rotateY(-44deg)_scale(0.62)] xl:[transform:translate3d(54vw,0,-500px)_rotateY(-42deg)_scale(0.62)] z-[1] opacity-0 sm:opacity-20';
    }

    return '[transform:translate3d(0,0,-1000px)_scale(0.1)] opacity-0';
};

export default function RelatedProjects({ relatedProjects, statusClass, statusLabels, transactionLabels }) {
    const projects = Array.isArray(relatedProjects) ? relatedProjects : [];
    const total = projects.length;
    const hasMultipleCards = total > 1;
    const [activeIndex, setActiveIndex] = useState(0);
    const touchStartXRef = useRef(null);

    useEffect(() => {
        setActiveIndex(0);
    }, [total]);

    const next = useCallback(() => {
        if (!hasMultipleCards) return;
        setActiveIndex((prev) => (prev + 1) % total);
    }, [hasMultipleCards, total]);

    const prev = useCallback(() => {
        if (!hasMultipleCards) return;
        setActiveIndex((prev) => (prev - 1 + total) % total);
    }, [hasMultipleCards, total]);

    useEffect(() => {
        if (!hasMultipleCards) return undefined;

        const onKeyDown = (event) => {
            const target = event.target;
            const isTypingTarget =
                target instanceof HTMLElement &&
                (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable);

            if (isTypingTarget) return;

            if (event.key === 'ArrowRight') next();
            if (event.key === 'ArrowLeft') prev();
        };

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [hasMultipleCards, next, prev]);

    const handleTouchStart = (event) => {
        if (!hasMultipleCards) return;
        touchStartXRef.current = event.changedTouches?.[0]?.clientX ?? null;
    };

    const handleTouchEnd = (event) => {
        if (!hasMultipleCards || touchStartXRef.current == null) return;
        const endX = event.changedTouches?.[0]?.clientX;
        if (typeof endX !== 'number') return;

        const deltaX = endX - touchStartXRef.current;
        touchStartXRef.current = null;

        if (Math.abs(deltaX) < 45) return;
        if (deltaX < 0) next();
        if (deltaX > 0) prev();
    };

    if (!projects.length) return null;

    return (
        <section className="relative my-16 overflow-hidden bg-black py-14 sm:my-20 sm:py-20">
            <div className="pointer-events-none absolute -left-20 top-14 h-64 w-64 rounded-full bg-cyan-400/10 blur-[120px]" />
            <div className="pointer-events-none absolute -right-20 bottom-16 h-64 w-64 rounded-full bg-sky-400/10 blur-[120px]" />

            <div className="web-medium-container relative z-10">
                <div className="mx-auto max-w-[1100px] text-center">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-white/55">Related Projects</p>
                    <h2 className="mt-3 text-3xl font-light text-white sm:text-4xl">Explore Similar Properties</h2>
                </div>

                <div
                    className="relative mt-10 flex h-[520px] w-full items-center justify-center overflow-hidden [perspective:2000px] sm:h-[560px]"
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                >
                    {projects.map((project, index) => {
                        let offset = index - activeIndex;
                        if (offset > Math.floor(total / 2)) offset -= total;
                        if (offset < -Math.floor(total / 2)) offset += total;

                        const currentStatusClass = statusClass?.[project.status] || 'bg-white/20 text-white';
                        const statusLabel = statusLabels?.[project.status] || project.status;
                        const transactionLabel = transactionLabels?.[project.transaction] || project.transaction;
                        const isActive = index === activeIndex;

                        return (
                            <article
                                key={project.id}
                                className={`absolute h-[455px] w-[76vw] overflow-hidden rounded-[32px] border border-white/20 bg-white/10 backdrop-blur-[20px] transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] sm:h-[clamp(400px,60vh,510px)] sm:w-[clamp(290px,27vw,420px)] ${getPositionClass(
                                    offset
                                )}`}
                            >
                                <Link
                                    href={`/projects/${project.slug}`}
                                    onClick={(event) => {
                                        if (!isActive) {
                                            event.preventDefault();
                                            setActiveIndex(index);
                                        }
                                    }}
                                    className="group block h-full"
                                >
                                    <div className="relative h-[62%] overflow-hidden">
                                        <img
                                            src={project.heroImage}
                                            alt={project.title}
                                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.03)_35%,rgba(0,0,0,0.3)_100%)]" />

                                        <span
                                            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] ${currentStatusClass}`}
                                        >
                                            {statusLabel}
                                        </span>
                                    </div>

                                    <div className="flex h-[38%] flex-col bg-gradient-to-b from-black/40 to-black/75 p-4 sm:p-5">
                                        <div className="mb-1 flex items-center justify-between gap-3">
                                            <h3 className="line-clamp-1 text-lg font-light text-white">{project.title}</h3>
                                            <span className="rounded-md bg-white/10 px-2.5 py-1 text-[10px] uppercase tracking-[0.12em] text-white/95">
                                                {transactionLabel}
                                            </span>
                                        </div>

                                        <p className="line-clamp-2 text-xs italic text-white/80 sm:text-[13px]">{project.description}</p>

                                        <p className="mt-auto inline-flex items-center gap-1.5 text-xs text-white/80">
                                            <MapPin className="h-3.5 w-3.5 text-white/70" />
                                            <span className="line-clamp-1">{project.location}</span>
                                        </p>
                                    </div>
                                </Link>
                            </article>
                        );
                    })}
                </div>

                {/* <div className="mt-2 flex justify-center sm:mt-4">
                    <div className="flex max-w-[92vw] min-w-fit items-center gap-4 rounded-full border border-white/20 bg-white/10 px-3 py-2 backdrop-blur-[20px] sm:gap-5 sm:px-4">
                        <button
                            type="button"
                            onClick={prev}
                            disabled={!hasMultipleCards}
                            aria-label="Previous related project"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/10 hover:text-white/80 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <ArrowLeft className="h-4 w-4" />
                        </button>

                        <div className="flex items-center gap-1.5 border-x border-white/20 px-3 sm:px-4">
                            {projects.map((project, index) => {
                                const isActive = index === activeIndex;
                                return (
                                    <button
                                        key={project.id}
                                        type="button"
                                        onClick={() => setActiveIndex(index)}
                                        aria-label={`Go to related project ${index + 1}`}
                                        aria-current={isActive ? 'true' : 'false'}
                                        className={`h-1.5 w-1.5 rounded-full transition-all duration-300 ${
                                            isActive
                                                ? 'w-4 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]'
                                                : 'bg-white/35 hover:scale-110 hover:bg-white/65'
                                        }`}
                                    />
                                );
                            })}
                        </div>

                        <button
                            type="button"
                            onClick={next}
                            disabled={!hasMultipleCards}
                            aria-label="Next related project"
                            className="inline-flex h-8 w-8 items-center justify-center rounded-full text-white transition hover:bg-white/10 hover:text-white/80 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            <ArrowRight className="h-4 w-4" />
                        </button>
                    </div>
                </div> */}
            </div>
        </section>
    );
}
