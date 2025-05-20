
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
  isOpen: boolean;
};

type SidebarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

const NavItem = ({ to, icon, label, isOpen }: NavItemProps) => {
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
      {isOpen && <span>{label}</span>}
    </NavLink>
  );
};

export function Sidebar({ isOpen, onToggle }: SidebarProps) {
  const isMobile = useIsMobile();

  return (
    <>
      {/* Mobile overlay */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-sidebar fixed h-full z-40 top-0 left-0 flex flex-col border-r border-sidebar-border transition-all duration-300",
          isOpen ? "w-64" : isMobile ? "-translate-x-full" : "w-16",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-sidebar-border">
          {isOpen ? (
            <div className="flex items-center">
              <img 
                src="/lovable-uploads/53ccbf5e-4d11-48e2-b48b-3af78acbb3f5.png" 
                alt="SafeLand Logo" 
                className="h-10 mr-2" 
              />
            </div>
          ) : (
            <div className="mx-auto">
              <img 
                src="/lovable-uploads/53ccbf5e-4d11-48e2-b48b-3af78acbb3f5.png" 
                alt="SafeLand Logo" 
                className="h-8" 
              />
            </div>
          )}

          <Button
            variant="ghost"
            size="icon"
            onClick={onToggle}
            className="text-sidebar-foreground hover:bg-sidebar-accent"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Nav Items */}
        <nav className="flex flex-col gap-1 p-3">
          <NavItem
            to="/"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            isOpen={isOpen}
          />
          <NavItem
            to="/people"
            icon={<Users size={20} />}
            label="Personas"
            isOpen={isOpen}
          />
          <NavItem
            to="/qrcodes"
            icon={<QrCode size={20} />}
            label="Códigos QR"
            isOpen={isOpen}
          />
          <NavItem
            to="/schedules"
            icon={<Calendar size={20} />}
            label="Horarios"
            isOpen={isOpen}
          />
          <NavItem
            to="/access-logs"
            icon={<ListFilter size={20} />}
            label="Registros de acceso"
            isOpen={isOpen}
          />
          <NavItem
            to="/settings"
            icon={<Settings size={20} />}
            label="Configuración"
            isOpen={isOpen}
          />
        </nav>

        {/* Footer */}
        <div className="mt-auto p-3 border-t border-sidebar-border">
          {isOpen && (
            <div className="text-xs text-sidebar-foreground/70">
              <p>Sistema de control de acceso</p>
              <p>v1.0.0</p>
            </div>
          )}
        </div>
      </aside>

      {/* Mobile floating button when sidebar is closed */}
      {isMobile && !isOpen && (
        <Button
          variant="default"
          size="icon"
          onClick={onToggle}
          className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg"
        >
          <Menu />
        </Button>
      )}
    </>
  );
}
