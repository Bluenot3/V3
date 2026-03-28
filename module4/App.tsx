import React, { useState, useEffect, useRef, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import { curriculumData } from './data/curriculumData';
import type { Section } from './types';
import GeminiChat from './components/GeminiChat';
import { useAuth } from './hooks/useAuth';

const App: React.FC = () => {
    const [activeSection, setActiveSection] = useState<string>('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
    const { user, updateProgress } = useAuth();
    
    const userRef = useRef(user);
    useEffect(() => {
        userRef.current = user;
    }, [user]);

    const allSections = useMemo(() => {
        const sections: Section[] = [];
        const flatten = (s: Section) => {
            sections.push(s);
            if (s.subSections) {
                s.subSections.forEach(flatten);
            }
        };
        curriculumData.sections.forEach(flatten);
        return sections;
    }, []);

    useEffect(() => {
        allSections.forEach(section => {
            sectionRefs.current[section.id] = document.getElementById(section.id);
        });

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                        const currentUser = userRef.current;
                        if(currentUser && !currentUser.progress.completedSections.includes(entry.target.id)) {
                           updateProgress(entry.target.id, 'section');
                        }
                    }
                });
            },
            {
                rootMargin: '-20% 0px -60% 0px',
                threshold: 0.1,
            }
        );
        
        const refs = sectionRefs.current;
        Object.keys(refs).forEach(key => {
            const element = refs[key];
            if (element) observer.observe(element);
        });

        return () => {
            observer.disconnect();
        };
    }, [allSections, updateProgress]);

    return (
        <div className="bg-brand-bg min-h-screen font-sans text-brand-text relative selection:bg-brand-primary/20 selection:text-brand-primary-dark">
            {/* Ambient Background Effects */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
                 {/* Subtle Grain Texture */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }}></div>
                
                {/* Animated Blobs */}
                <div className="absolute top-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-100/50 rounded-full mix-blend-multiply filter blur-[100px] animate-blob"></div>
                <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-purple-100/50 rounded-full mix-blend-multiply filter blur-[80px] animate-blob animation-delay-2000"></div>
                <div className="absolute bottom-[-20%] left-[20%] w-[700px] h-[700px] bg-cyan-100/40 rounded-full mix-blend-multiply filter blur-[100px] animate-blob animation-delay-4000"></div>
            </div>

            <Header onMenuClick={() => setIsSidebarOpen(true)} />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 mt-8 relative">
                <Sidebar 
                    sections={curriculumData.sections} 
                    activeSection={activeSection} 
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />
                <MainContent sections={curriculumData.sections} />
            </div>
            <Footer />
            <GeminiChat />
        </div>
    );
};

export default App;