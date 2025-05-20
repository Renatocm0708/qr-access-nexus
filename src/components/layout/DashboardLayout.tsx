
import React from 'react';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type DashboardLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export function DashboardLayout({ children, title }: DashboardLayoutProps) {
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = React.useState(!isMobile);

  // Update sidebar state when device type changes
  React.useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const toggleSidebar = () => {
    setSidebarOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      <div 
        className={cn(
          "transition-all duration-300", 
          sidebarOpen && !isMobile ? "ml-64" : "ml-0",
          // Add padding bottom on mobile for floating action buttons
          isMobile && "pb-16"
        )}
      >
        <Header title={title} onMenuClick={toggleSidebar} />
        <main className="p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
