
import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useIsMobile } from '@/hooks/use-mobile';

type HeaderProps = {
  title: string;
  onMenuClick?: () => void;
};

export function Header({ title, onMenuClick }: HeaderProps) {
  const isMobile = useIsMobile();
  
  return (
    <header className="bg-background border-b h-16 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-2">
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onMenuClick} className="mr-2">
            <Menu className="h-5 w-5" />
          </Button>
        )}
        <h1 className="text-xl font-semibold truncate">{title}</h1>
      </div>

      <div className="flex items-center gap-2 md:gap-4">
        {!isMobile && (
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar..."
              className="w-64 pl-8"
            />
          </div>
        )}

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-destructive" />
        </Button>

        <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground">
          <span className="font-semibold text-sm">JD</span>
        </div>
      </div>
    </header>
  );
}
