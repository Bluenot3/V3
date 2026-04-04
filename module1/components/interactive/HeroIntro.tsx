
import React, { useEffect, useRef } from 'react';
import type { InteractiveComponentProps } from '../../types';

const HeroIntro: React.FC<InteractiveComponentProps> = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = canvas.width = canvas.offsetWidth;
        let height = canvas.height = canvas.offsetHeight;
        let particles: {x: number, y: number, vx: number, vy: number}[] = [];

        const initParticles = () => {
            particles = [];
            const count = Math.min(50, Math.floor(width / 20));
            for (let i = 0; i < count; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = '#A78BFA'; // brand-primary-light
            ctx.strokeStyle = 'rgba(167, 139, 250, 0.2)';

            particles.forEach((p, i) => {
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > width) p.vx *= -1;
                if (p.y < 0 || p.y > height) p.vy *= -1;

                ctx.beginPath();
                ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
                ctx.fill();

                // Connect nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            });
            requestAnimationFrame(draw);
        };

        initParticles();
        draw();

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = canvas.offsetWidth;
            height = canvas.height = canvas.offsetHeight;
            initParticles();
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="relative w-full min-h-[500px] rounded-3xl overflow-hidden shadow-2xl bg-slate-900 mb-12 group flex items-center justify-center">
            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-40"></canvas>
            
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-slate-900/80"></div>
            
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
                <div className="inline-block px-4 py-1.5 rounded-full bg-brand-primary/20 border border-brand-primary/50 text-brand-primary-light text-xs font-mono mb-6 animate-fade-in tracking-widest uppercase">
                    Pioneer Program x Web3 Homeschool Kit
                </div>
                
                <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-6 drop-shadow-2xl">
                    ZEN <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-blue">VANGUARD</span>
                </h1>

                <h2 className="text-xl md:text-2xl font-bold text-brand-secondary mb-6 tracking-wide uppercase">
                    Module 1: Intelligence Architect
                </h2>
                
                <p className="text-slate-300 text-lg md:text-2xl max-w-2xl leading-relaxed animate-slide-in-up font-medium" style={{animationDelay: '200ms'}}>
                    Master the mechanics of the machine mind. <br className="hidden md:block" /> 
                    From neural weights and transformer attention to the future of agentic decentralized workflows.
                </p>

                <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 animate-slide-in-up" style={{animationDelay: '400ms'}}>
                    <div className="flex flex-col items-center bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 min-w-[140px]">
                        <span className="text-3xl font-black text-white">40+</span>
                        <span className="text-[10px] text-brand-secondary font-bold uppercase tracking-widest mt-1 text-center">Interactive Labs</span>
                    </div>
                    <div className="flex flex-col items-center bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 min-w-[140px]">
                        <span className="text-3xl font-black text-white">100%</span>
                        <span className="text-[10px] text-brand-secondary font-bold uppercase tracking-widest mt-1 text-center">Project Driven</span>
                    </div>
                    <div className="flex flex-col items-center bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 min-w-[140px]">
                        <span className="text-3xl font-black text-white">AI-1ST</span>
                        <span className="text-[10px] text-brand-secondary font-bold uppercase tracking-widest mt-1 text-center">Curriculum</span>
                    </div>
                    <div className="flex flex-col items-center bg-white/5 backdrop-blur-sm p-4 rounded-2xl border border-white/10 min-w-[140px]">
                        <span className="text-3xl font-black text-white">WEB3</span>
                        <span className="text-[10px] text-brand-secondary font-bold uppercase tracking-widest mt-1 text-center">Integration</span>
                    </div>
                </div>
                
                <div className="mt-10 animate-bounce text-slate-500">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7-7-7m14-8l-7 7-7-7"></path></svg>
                </div>
            </div>
        </div>
    );
};

export default HeroIntro;
