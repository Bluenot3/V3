import React from 'react';
import type { Section } from '../types';
import { useAuth } from '../hooks/useAuth';
import { CheckIcon } from './icons/CheckIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { CubeTransparentIcon } from './icons/CubeTransparentIcon';
import { SparklesIcon } from './icons/SparklesIcon';

const iconMap: { [key: string]: React.FC<any> } = {
  BookOpen: BookOpenIcon,
  CubeTransparent: CubeTransparentIcon,
  Sparkles: SparklesIcon,
  default: CubeTransparentIcon,
};


interface SidebarProps {
  sections: Section[];
  activeSection: string;
}

const Sidebar: React.FC<SidebarProps> = ({ sections, activeSection }) => {
  const { user } = useAuth();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
        const headerOffset = 80; // height of sticky header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
             top: offsetPosition,
             behavior: 'smooth'
        });
        // This is a bit of a hack to update the URL without causing a page jump,
        // letting the smooth scroll finish first.
        setTimeout(() => {
            // In sandboxed environments (like blob URLs), constructing a path with
            // window.location.pathname can resolve to an incorrect origin and cause a SecurityError.
            // Simply updating the hash is a safe, cross-origin-compliant way to update the URL
            // without triggering a page jump.
            window.history.pushState(null, '', '#' + id);
        }, 800);
    }
  };

  const NavLink: React.FC<{ section: Section, level?: number }> = ({ section, level = 0 }) => {
    const isActive = activeSection === section.id;
    const isCompleted = user?.progress.completedSections.includes(section.id);
    const paddingLeft = `${1 + level * 1.5}rem`;
    const IconComponent = section.icon ? (iconMap[section.icon] || iconMap.default) : iconMap.default;
    
    return (
      <li className="mb-1 relative">
        <a
          href={`#${section.id}`}
          onClick={(e) => handleLinkClick(e, section.id)}
          className={`sidebar-link group flex items-center justify-between py-2.5 pr-4 rounded-lg text-base transition-all duration-200 relative overflow-hidden transform hover:-translate-y-px ${
            isActive
              ? 'font-semibold text-brand-primary'
              : `text-brand-text-light hover:text-brand-text ${isCompleted ? 'text-brand-primary/80' : ''}`
          }`}
          style={{ paddingLeft }}
        >
          <div className="absolute inset-y-0 left-0 w-full bg-white/80 rounded-lg scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-300 ease-out -z-10"></div>
          <div className="flex items-center gap-3">
            <IconComponent className={`w-5 h-5 transition-colors ${isActive ? 'text-brand-primary' : 'text-brand-text-light/70 group-hover:text-brand-text'}`} />
            <span>{section.title}</span>
          </div>
          {isCompleted && !isActive && <CheckIcon />}
        </a>
        {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 h-3/4 w-1 bg-brand-primary rounded-r-full transition-all duration-300" />}
       
        {section.subSections && (
          <ul className="mt-1 pl-4 border-l border-brand-primary/10">
            {section.subSections.map((subSection) => (
              <NavLink key={subSection.id} section={subSection} level={level + 1} />
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <aside className="lg:w-80 lg:flex-shrink-0 lg:sticky top-20 lg:h-[calc(100vh-5rem)] py-8 lg:overflow-y-auto liquid-scrollbar">
      <nav>
        <ul>
          {sections.map((section) => (
            <NavLink key={section.id} section={section} />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;