import React, { useState, useEffect, useRef, Suspense, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import ScrollProgressBar from './components/ScrollProgressBar';
import Footer from './components/Footer';
import { curriculumData } from './data/curriculumData';
import { useAuth } from './hooks/useAuth';
import type { Section } from './types';
import CommandPalette from './components/CommandPalette';
import CompletionCelebration from './components/CompletionCelebration';


const GeminiChat = React.lazy(() => import('./components/GeminiChat'));

const App: React.FC = () => {
    const { user, updateProgress, addPoints, updateLastViewedSection } = useAuth();
    const [activeSection, setActiveSection] = useState<string>('overview');
    const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set(['overview']));
    const sectionRefs = useRef<Record<string, HTMLElement | null>>({});
    const isInitialIntersection = useRef(true);
    const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false);
    const initialScrollDone = useRef(false);
    const [isModuleComplete, setIsModuleComplete] = useState(false);
    const [scrollY, setScrollY] = useState(0);


    const flattenedSections = useMemo(() => {
        const allSections: (Section & { parentTitle?: string })[] = [];
        const recurse = (sections: Section[], parentTitle?: string) => {
            sections.forEach(section => {
                allSections.push({ ...section, parentTitle });
                if (section.subSections) {
                    recurse(section.subSections, section.title);
                }
            });
        };
        recurse(curriculumData.sections);
        return allSections;
    }, []);

    const totalSections = useMemo(() => flattenedSections.length, [flattenedSections]);

    useEffect(() => {
        if (user && !isModuleComplete && user.progress.completedSections.length >= totalSections) {
            setIsModuleComplete(true);
        }
    }, [user, isModuleComplete, totalSections]);

    // Mouse Spotlight Effect
    useEffect(() => {
        const spotlight = document.querySelector('.mouse-spotlight') as HTMLElement;
        if (!spotlight) return;

        const handleMouseMove = (e: MouseEvent) => {
            spotlight.style.transform = `translate(${e.clientX - spotlight.offsetWidth / 2}px, ${e.clientY - spotlight.offsetHeight / 2}px)`;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Parallax Scroll Effect Listener
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);


    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsCommandPaletteOpen(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    useEffect(() => {
        // Only scroll on the initial load when the user object becomes available
        if (user && user.lastViewedSection && user.lastViewedSection !== 'overview' && !initialScrollDone.current) {
            const element = document.getElementById(user.lastViewedSection);
            if (element) {
                const headerOffset = 80; // height of sticky header
                const elementPosition = element.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                setTimeout(() => {
                     window.scrollTo({
                         top: offsetPosition,
                         behavior: 'auto'
                    });
                }, 150); // Small delay to ensure layout is stable
            }
            initialScrollDone.current = true;
        }
    }, [user]);

    useEffect(() => {
        if (!user) return;

        const observer = new IntersectionObserver(
        (entries) => {
            if (isInitialIntersection.current) {
                isInitialIntersection.current = false;
                const activeEntry = entries.find(entry => entry.target.id === activeSection);
                if (activeEntry && activeEntry.isIntersecting) {
                     const id = activeEntry.target.id;
                    setVisibleSections(prev => {
                        if (prev.has(id)) return prev;
                        const newSet = new Set(prev);
                        newSet.add(id);
                        return newSet;
                    });
                    
                    if (user && !user.progress.completedSections.includes(id)) {
                        updateProgress(id, 'section');
                        addPoints(10);
                    }
                }
            } else {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const id = entry.target.id;
                        setActiveSection(id);
                        updateLastViewedSection(id);
                        setVisibleSections(prev => {
                            if (prev.has(id)) return prev;
                            const newSet = new Set(prev);
                            newSet.add(id);
                            return newSet;
                        });
                        
                        if (user && !user.progress.completedSections.includes(id)) {
                            updateProgress(id, 'section');
                            addPoints(10);
                        }
                    }
                });
            }
        },
        { rootMargin: '-20% 0px -80% 0px', threshold: 0 }
        );

        const allRefs = flattenedSections.map(s => sectionRefs.current[s.id]).filter(Boolean) as HTMLElement[];
        
        allRefs.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => {
             allRefs.forEach((ref) => {
                if (ref) observer.unobserve(ref);
            });
        };
    }, [user, activeSection, addPoints, updateProgress, flattenedSections, updateLastViewedSection]);

  if (!user) {
    // This will briefly show a blank screen while the mock user is being loaded from localStorage
    return null;
  }

  return (
    <div className="min-h-screen font-sans text-brand-text flex flex-col">
      <ScrollProgressBar />
      <Header 
        onCommandPaletteToggle={() => setIsCommandPaletteOpen(true)} 
        completedSections={user.progress.completedSections.length}
        totalSections={totalSections}
      />
       <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow">
        <div className="lg:flex lg:gap-8">
          <Sidebar sections={curriculumData.sections} activeSection={activeSection} />
          <div className="flex-1 min-w-0 flex flex-col">
            <main className="flex-grow">
              <MainContent
                  title={curriculumData.title}
                  sections={curriculumData.sections}
                  sectionRefs={sectionRefs}
                  visibleSections={visibleSections}
                  scrollY={scrollY}
              />
            </main>
            <Footer />
          </div>
        </div>
      </div>
      <Suspense fallback={null}>
        <GeminiChat 
            curriculumSummary={curriculumData.summaryForAI} 
            sections={flattenedSections}
        />
      </Suspense>
      <CommandPalette 
        isOpen={isCommandPaletteOpen}
        onClose={() => setIsCommandPaletteOpen(false)}
        sections={flattenedSections}
      />
      {isModuleComplete && <CompletionCelebration />}
    </div>
  );
};

export default App;