import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface SidebarContextType {
    isCollapsed: boolean;
    toggle: () => void;
    collapse: () => void;
    expand: () => void;
}

const SidebarContext = createContext<SidebarContextType>({
    isCollapsed: false,
    toggle: () => {},
    collapse: () => {},
    expand: () => {},
});

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const location = useLocation();

    const [isCollapsed, setIsCollapsed] = useState<boolean>(() => {
        // Default: collapsed on module pages, else use saved preference
        const saved = localStorage.getItem('zenSidebarCollapsed');
        if (saved !== null) return saved === 'true';
        return location.pathname.startsWith('/module/');
    });

    // Auto-collapse when entering a module page
    useEffect(() => {
        if (location.pathname.startsWith('/module/')) {
            setIsCollapsed(true);
        }
    }, [location.pathname]);

    const toggle = useCallback(() => {
        setIsCollapsed((prev) => {
            const next = !prev;
            localStorage.setItem('zenSidebarCollapsed', String(next));
            return next;
        });
    }, []);

    const collapse = useCallback(() => {
        setIsCollapsed(true);
        localStorage.setItem('zenSidebarCollapsed', 'true');
    }, []);

    const expand = useCallback(() => {
        setIsCollapsed(false);
        localStorage.setItem('zenSidebarCollapsed', 'false');
    }, []);

    return (
        <SidebarContext.Provider value={{ isCollapsed, toggle, collapse, expand }}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => useContext(SidebarContext);
