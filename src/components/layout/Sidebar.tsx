
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  QrCode, 
  Calendar, 
  ListFilter, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

type NavItemProps = {
  to: string;
  icon: React.ReactNode;
  label: string;
  isSidebarOpen: boolean;
};

const NavItem = ({ to, icon, label, isSidebarOpen }: NavItemProps) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
          isActive
            ? "bg-sidebar-accent text-sidebar-accent-foreground"
            : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
        )
      }
    >
      {icon}
      {isSidebarOpen && <span>{label}</span>}
    </NavLink>
  );
};

export function Sidebar() {
  const [isSidebarOpen, setSidebarOpen] = React.useState(true);
  const isMobile = useIsMobile();

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  // Auto-collapse on mobile
  React.useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [isMobile]);

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-sidebar fixed h-full z-40 top-0 left-0 flex flex-col border-r border-sidebar-border transition-all duration-300",
          isSidebarOpen ? (isMobile ? "w-64" : "w-64") : "w-16",
          isMobile && !isSidebarOpen && "-translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          {isSidebarOpen ? (
            <h1 className="text-lg font-semibold text-white">Access Control</h1>
          ) : (
            <span className="mx-auto text-lg font-bold text-white">AC</span>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-1 p-3">
          <NavItem
            to="/"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            isSidebarOpen={isSidebarOpen}
          />
          <NavItem
            to="/people"
            icon={<Users size={20} />}
            label="Personas"
            isSidebarOpen={isSidebarOpen}
          />
          <NavItem
            to="/qrcodes"
            icon={<QrCode size={20} />}
            label="Códigos QR"
            isSidebarOpen={isSidebarOpen}
          />
          <NavItem
            to="/schedules"
            icon={<Calendar size={20} />}
            label="Horarios"
            isSidebarOpen={isSidebarOpen}
          />
          <NavItem
            to="/access-logs"
            icon={<ListFilter size={20} />}
            label="Registros de acceso"
            isSidebarOpen={isSidebarOpen}
          />
          <NavItem
            to="/settings"
            icon={<Settings size={20} />}
            label="Configuración"
            isSidebarOpen={isSidebarOpen}
          />
        </nav>

        {/* Footer */}
        <div className="mt-auto p-3 border-t border-sidebar-border">
          {isSidebarOpen && (
            <div className="text-xs text-sidebar-foreground/70">
              <p>Sistema de control de acceso</p>
              <p>v1.0.0</p>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile toggle button */}
      {isMobile && !isSidebarOpen && (
        <Button
          variant="default"
          size="icon"
          onClick={toggleSidebar}
          className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg"
        >
          <Menu />
        </Button>
      )}
    </>
  );
}
