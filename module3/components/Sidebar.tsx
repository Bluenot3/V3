import React from 'react';
import type { Section } from '../types';
import { useAuth } from '../hooks/useAuth';
import { CheckIcon } from './icons/CheckIcon';

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
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
        window.history.pushState(null, '', `#${id}`);
    }
  };

  const NavLink: React.FC<{ section: Section, level?: number }> = ({ section, level = 0 }) => {
    const isActive = activeSection === section.id;
    const isCompleted = user?.progress.completedSections.includes(section.id);
    const paddingLeft = `${1.5 + level * 1}rem`;
    
    return (
      <li className="mb-2">
        <a
          href={`#${section.id}`}
          onClick={(e) => handleLinkClick(e, section.id)}
          className={`flex items-center justify-between py-2.5 pr-4 rounded-lg text-base transition-all duration-300 transform group ${
            isActive
              ? 'shadow-neumorphic-in font-semibold bg-brand-bg'
              : `shadow-neumorphic-out text-brand-text-light hover:text-brand-primary bg-brand-bg hover:shadow-neumorphic-out-lg hover:scale-[1.02] ${isCompleted ? 'text-brand-primary/80' : ''}`
          }`}
          style={{ paddingLeft }}
        >
          <span className={`${isActive ? 'bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent' : ''}`}>{section.title}</span>
          {isCompleted && !isActive && <CheckIcon />}
        </a>
       
        {section.subSections && (
          <ul className="mt-2">
            {section.subSections.map((subSection) => (
              <NavLink key={subSection.id} section={subSection} level={level + 1} />
            ))}
          </ul>
        )}
      </li>
    );
  };

  return (
    <aside className="lg:w-96 lg:flex-shrink-0 lg:sticky top-20 lg:h-[calc(100vh-5rem)] py-4 lg:overflow-y-auto liquid-scrollbar">
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