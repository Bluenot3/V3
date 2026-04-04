import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import ScrollProgressBar from './ScrollProgressBar';
import { GraduationCapIcon } from './icons/GraduationCapIcon';
import { LabIcon } from './icons/LabIcon';
import MagicZIcon from './icons/MagicZIcon'; // Updated import
import { getAiClient } from '../services/aiService';
import { curriculumData } from '../data/curriculumData';
import { Type } from '@google/genai';

interface HeaderProps {
    onMenuClick?: () => void;
}

interface SearchResult {
    answer: string;
    relevantSections: {
        id: string;
        title: string;
        reason: string;
    }[];
}

// --- Slot Machine Animation Components ---

const SlotDigit: React.FC<{ value: string }> = ({ value }) => {
    const isNumber = !isNaN(parseInt(value));
    if (!isNumber) return <span className="font-mono text-inherit font-bold">{value}</span>;

    const digit = parseInt(value);

    return (
        <div className="relative h-[1em] w-[0.6em] overflow-hidden inline-block align-bottom -mb-[0.05em]">
            <div 
                className="absolute top-0 left-0 flex flex-col transition-transform duration-[800ms] cubic-bezier(0.2, 1, 0.3, 1)"
                style={{ transform: `translateY(-${digit * 10}%)` }}
            >
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                    <div key={num} className="h-[1em] flex items-center justify-center font-mono text-inherit tabular-nums font-bold">
                        {num}
                    </div>
                ))}
            </div>
        </div>
    );
};

const SlotCounter: React.FC<{ value: number | string; minDigits?: number }> = ({ value, minDigits = 1 }) => {
    const valueStr = value.toString().padStart(minDigits, '0');
    const digits = valueStr.split('');

    return (
        <div className="flex items-center overflow-hidden leading-none relative">
            {digits.map((digit, index) => (
                <SlotDigit key={index} value={digit} />
            ))}
        </div>
    );
};

// --- Main Header Component ---

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const { user, resetProgress } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [showSearch, setShowSearch] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isResetConfirm, setIsResetConfirm] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const totalSubSections = curriculumData.sections.reduce((acc, section) => acc + (section.subSections?.length || 0), 0);
  const completedSubSections = user?.progress.completedSections.filter(id => /^\d+-\d+$/.test(id)).length || 0;

  const handleSearch = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!searchQuery.trim()) return;
      
      setIsSearching(true);
      setSearchResults(null);
      setShowSearch(true);

      try {
          const ai = await getAiClient();
          const context = curriculumData.sections.map(s => 
              `SECTION [${s.id}]: ${s.title}\n` + 
              (s.content.filter(c => c.type === 'paragraph').map(c => c.content).join(' ').substring(0, 300) + '...')
          ).join('\n\n');

          const prompt = `You are "Gemma 3", an advanced AI tutor for the ZEN VANGUARD Module 4 curriculum.
          Curriculum Context: ${context}
          User Question: "${searchQuery}"
          Output strictly JSON.`;

          const response = await ai.models.generateContent({
              model: 'gemini-2.5-flash',
              contents: prompt,
              config: {
                  responseMimeType: 'application/json',
                  responseSchema: {
                      type: Type.OBJECT,
                      properties: {
                          answer: { type: Type.STRING },
                          relevantSections: {
                              type: Type.ARRAY,
                              items: {
                                  type: Type.OBJECT,
                                  properties: {
                                      id: { type: Type.STRING },
                                      title: { type: Type.STRING },
                                      reason: { type: Type.STRING }
                                  }
                              }
                          }
                      },
                      required: ['answer', 'relevantSections']
                  }
              }
          });
          
          const result = JSON.parse(response.text);
          setSearchResults(result);

      } catch (error) {
          console.error("Search failed", error);
          setSearchResults({
              answer: "Gemma 3 is momentarily unavailable.",
              relevantSections: []
          });
      } finally {
          setIsSearching(false);
      }
  };

  useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
          if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
              setShowSearch(false);
          }
          if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
            setIsProfileOpen(false);
            setIsResetConfirm(false);
          }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLinkClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 100; 
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        setShowSearch(false);
    }
  };

  const handleResetClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isResetConfirm) {
        resetProgress();
        setIsProfileOpen(false);
        setIsResetConfirm(false);
        window.scrollTo({ top: 0, behavior: 'auto' });
    } else {
        setIsResetConfirm(true);
    }
  };

  return (
    <header className="sticky top-0 z-50 glass-panel transition-all duration-300 border-b border-white/20 shadow-sm backdrop-blur-xl bg-white/80 supports-[backdrop-filter]:bg-white/60">
        <ScrollProgressBar />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20 gap-4">
                
                {/* LEFT: Logo Area */}
                <div className="flex items-center gap-4 flex-shrink-0">
                    <button 
                        onClick={onMenuClick}
                        className="lg:hidden p-2 -ml-2 text-brand-text hover:text-brand-primary transition-colors rounded-lg hover:bg-slate-100/50"
                        aria-label="Open Menu"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div className="relative group cursor-pointer flex items-center gap-4 select-none">
                        <MagicZIcon className="w-10 h-10 drop-shadow-md" />
                         <div className="flex flex-col justify-center hidden sm:flex">
                            <h1 className="text-lg font-extrabold tracking-tight text-slate-900 leading-none font-sans">
                                ZEN <span className="font-light text-slate-500">VANGUARD</span>
                            </h1>
                            <div className="flex items-center gap-2 mt-0.5">
                                <span className="h-px w-4 bg-gradient-to-r from-brand-primary to-brand-secondary"></span>
                                <span className="text-[10px] font-bold tracking-[0.2em] text-brand-primary uppercase">Module 4</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CENTER: Search Bar */}
                <div className="flex-1 max-w-xl hidden md:block relative" ref={searchRef}>
                    <form onSubmit={handleSearch} className="relative group">
                         <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-slate-400 group-focus-within:text-brand-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                        <input 
                            type="text" 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="block w-full pl-10 pr-12 py-2.5 border border-slate-200 rounded-full leading-5 bg-slate-50/50 text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-brand-primary/20 focus:border-brand-primary/30 sm:text-sm transition-all duration-300 hover:bg-white shadow-sm hover:shadow-md"
                            placeholder="Ask Gemma 3..."
                        />
                         <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                             {isSearching ? (
                                 <div className="w-4 h-4 border-2 border-brand-primary border-t-transparent rounded-full animate-spin"></div>
                             ) : (
                                 <span className="text-[10px] text-slate-400 font-medium border border-slate-200 px-1.5 py-0.5 rounded bg-white">/</span>
                             )}
                         </div>
                    </form>
                    
                    {/* Dropdown logic remains similar but with refined styles if needed... */}
                    {showSearch && (searchResults || isSearching) && (
                        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-2xl shadow-xl border border-slate-100 p-5 animate-fade-in-up origin-top z-50 ring-1 ring-black/5">
                             {isSearching ? (
                                <div className="flex items-center justify-center py-8 text-slate-400 text-sm gap-2">
                                    <span className="w-2 h-2 bg-brand-primary rounded-full animate-bounce"></span>
                                    <span className="w-2 h-2 bg-brand-primary rounded-full animate-bounce delay-100"></span>
                                    <span className="w-2 h-2 bg-brand-primary rounded-full animate-bounce delay-200"></span>
                                    Thinking...
                                </div>
                            ) : (
                                searchResults && (
                                    <div className="space-y-4">
                                        <div className="prose prose-sm max-w-none">
                                            <p className="text-slate-700">{searchResults.answer}</p>
                                        </div>
                                        {searchResults.relevantSections.length > 0 && (
                                            <div className="space-y-2">
                                                <h4 className="text-xs font-bold text-slate-400 uppercase">References</h4>
                                                {searchResults.relevantSections.map(s => (
                                                     <button key={s.id} onClick={() => handleLinkClick(s.id)} className="block w-full text-left text-xs p-2 hover:bg-slate-50 rounded text-brand-primary font-medium truncate transition-colors">
                                                         → {s.title}
                                                     </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
                
                {/* RIGHT: User HUD */}
                {user && (
                    <div className="flex items-center gap-4">
                        
                        {/* XP Pill */}
                        <div className="hidden lg:flex items-center bg-slate-50/80 border border-slate-200/60 rounded-full px-3 py-1.5 gap-3 shadow-sm hover:shadow-md transition-all group">
                            <div className="text-brand-primary">
                                <GraduationCapIcon />
                            </div>
                            <div className="flex flex-col items-start">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none group-hover:text-brand-primary transition-colors">XP</span>
                                <div className="text-sm font-bold text-slate-800 leading-none mt-0.5">
                                    <SlotCounter value={user.points} />
                                </div>
                            </div>
                        </div>

                        {/* Labs Pill */}
                         <div className="hidden lg:flex items-center bg-slate-50/80 border border-slate-200/60 rounded-full px-3 py-1.5 gap-3 shadow-sm hover:shadow-md transition-all group">
                             <div className="text-pale-yellow">
                                 <LabIcon />
                             </div>
                            <div className="flex flex-col items-start">
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none group-hover:text-pale-yellow transition-colors">Labs</span>
                                <div className="text-sm font-bold text-slate-800 leading-none mt-0.5 flex items-center gap-0.5">
                                    <SlotCounter value={completedSubSections} />
                                    <span className="text-slate-400 font-light">/</span>
                                    <span className="text-slate-400 text-xs">{totalSubSections}</span>
                                </div>
                            </div>
                        </div>

                        <div className="w-px h-8 bg-slate-200 hidden sm:block mx-1"></div>

                        {/* User Avatar */}
                        <div className="relative" ref={profileRef}>
                            <button 
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="relative group cursor-pointer focus:outline-none"
                            >
                                <div className="absolute -inset-0.5 bg-gradient-to-tr from-brand-primary to-brand-secondary rounded-full opacity-0 group-hover:opacity-100 transition duration-500 blur-sm"></div>
                                <img className="relative h-10 w-10 rounded-full border-2 border-white shadow-sm object-cover" src={user.picture || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.name)}`} alt="User" />
                                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full z-10"></div>
                            </button>

                            {isProfileOpen && (
                                <div className="absolute top-full right-0 mt-3 w-60 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fade-in ring-1 ring-black/5 overflow-hidden transform origin-top-right">
                                    <div className="px-5 py-4 border-b border-slate-50 bg-gradient-to-b from-slate-50/50 to-transparent">
                                        <p className="font-bold text-sm text-slate-800">{user.name}</p>
                                        <p className="text-xs text-slate-500 truncate font-mono mt-0.5">{user.email}</p>
                                    </div>
                                    <div className="p-2">
                                         <button 
                                            onClick={handleResetClick}
                                            className={`w-full text-left px-4 py-2.5 text-xs font-medium rounded-xl transition-all duration-200 flex items-center gap-3
                                                ${isResetConfirm 
                                                    ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                                                    : 'text-slate-600 hover:bg-slate-50 hover:text-brand-primary'
                                                }`}
                                        >
                                            {isResetConfirm ? 'Confirm Reset?' : 'Reset Progress'}
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    </header>
  );
};

export default Header;