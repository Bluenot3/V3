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
    const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
    const { user, updateProgress } = useAuth();
    
    // Flatten sections for easier iteration
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
                        if(user && !user.progress.completedSections.includes(entry.target.id)) {
                           updateProgress(entry.target.id, 'section');
                        }
                    }
                });
            },
            {
                rootMargin: '-50% 0px -50% 0px', // Trigger when section is in the middle of the viewport
                threshold: 0,
            }
        );
        
        // FIX: Iterate over object keys to ensure proper type inference for refs,
        // preventing `ref` from being typed as `unknown`.
        const refs = sectionRefs.current;
        Object.keys(refs).forEach(key => {
            const element = refs[key];
            if (element) observer.observe(element);
        });

        return () => {
            // FIX: Use the same robust iteration method for cleanup.
            const currentRefs = sectionRefs.current;
            Object.keys(currentRefs).forEach(key => {
                const element = currentRefs[key];
                if (element) observer.unobserve(element);
            });
        };
    }, [allSections, updateProgress, user]);

    return (
        <div className="bg-brand-bg min-h-screen font-sans text-brand-text isolate">
            <Header />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8 mt-8">
                <Sidebar sections={curriculumData.sections} activeSection={activeSection} />
                <MainContent sections={curriculumData.sections} />
            </div>
            <Footer />
            <GeminiChat />
        </div>
    );
};

export default App;