import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { cn } from '@/lib/utils';

interface MainAppLayoutProps {
  children: React.ReactNode;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  // Close sidebar on route changes or larger screens if it was open on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsSidebarOpen(false); // Close if window resized to desktop while mobile menu was open
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Backdrop for mobile sidebar */} 
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
      
      <Header onToggleSidebar={toggleSidebar} />
      
      <main
        className={cn(
          'pt-16 min-h-[calc(100vh-4rem)] min-w-0 overflow-y-auto',
          'transition-all duration-300 ease-in-out',
          'md:ml-60' // Adjust for fixed sidebar width on medium screens and up
        )}
      >
        {/* Main content container with padding and gap as per requirements */}
        <div className={cn(
          "p-6", // mainContent.layout: p-6
          "flex flex-col gap-8" // mainContent.container: flex flex-col gap-8
        )}>
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainAppLayout;
