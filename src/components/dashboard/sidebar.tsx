import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ThemeToggle } from '@/components/theme-toggle';
import { useState } from 'react';
import {
  ChevronLeft,
  FileText,
  PenSquare,
  Bot,
  Link2,
  Link,
  PanelLeft,
  BarChart3,
  Share2,
  CreditCard,
  HelpCircle,
  Bell,
  MessageSquare,
  User,
  Menu,
} from 'lucide-react';

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex h-screen flex-col border-r bg-background transition-transform duration-300 md:relative md:translate-x-0',
          collapsed ? 'w-16' : 'w-64',
          mobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0',
          className
        )}
      >
        <div className="flex h-16 items-center border-b px-4">
          {!collapsed && (
            <div className="flex items-center">
              <span className="font-bold text-2xl text-primary">abun</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto"
            onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronLeft
              className={cn(
                'h-5 w-5 transition-transform',
                collapsed && 'rotate-180'
              )}
            />
          </Button>
        </div>

        <div className="flex flex-col flex-1 overflow-hidden">
          {!collapsed && (
            <div className="px-4 py-2">
              <div className="flex items-center space-x-2 rounded-md border bg-card px-3 py-2">
                <span className="h-7 w-7 rounded-full bg-rose-500"></span>
                <div className="flex-1 text-sm text-card-foreground">
                  amazon.com
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4 -rotate-90" />
                </Button>
              </div>
            </div>
          )}

          <ScrollArea className="flex-1 px-2">
            <div className="space-y-1 p-2">
              <NavItem
                icon={FileText}
                label="Articles"
                active
                collapsed={collapsed}
              />
              <NavItem icon={PenSquare} label="Create Article" collapsed={collapsed} />
              <NavItem icon={Bot} label="Generated Articles" collapsed={collapsed} />
              <NavItem icon={FileText} label="Keyword Projects" collapsed={collapsed} />
              <NavItem icon={Bot} label="AI Keyword to Article" collapsed={collapsed} />
              <NavItem icon={FileText} label="Steal Competitor Keyword" collapsed={collapsed} />
              <NavItem icon={FileText} label="Import Keyword from GSC" collapsed={collapsed} />
              <NavItem icon={FileText} label="Manual Keyword to Article" collapsed={collapsed} />
              <NavItem icon={FileText} label="Bulk Keyword to Article" collapsed={collapsed} />
              <NavItem icon={FileText} label="Longtail Keyword to Article" collapsed={collapsed} />
              <NavItem icon={FileText} label="Article Settings" collapsed={collapsed} />
              
              <div className="my-2 border-t" />
              
              <NavItem icon={PanelLeft} label="Auto Blog" collapsed={collapsed} />
              <NavItem icon={Link2} label="Internal Links" collapsed={collapsed} />
              <NavItem icon={Link} label="Free Backlinks" collapsed={collapsed} />
              <NavItem icon={BarChart3} label="Integrations" collapsed={collapsed} />
              <NavItem icon={CreditCard} label="Subscription" collapsed={collapsed} />
              <NavItem icon={Share2} label="Affiliate Program" collapsed={collapsed} />
              <NavItem icon={HelpCircle} label="Help Center" collapsed={collapsed} />
              <NavItem icon={Bell} label="Updates" collapsed={collapsed} />
              <NavItem icon={MessageSquare} label="Live Chat Support" collapsed={collapsed} />
              <NavItem icon={User} label="Profile" collapsed={collapsed} />
            </div>
          </ScrollArea>

          <div className="border-t p-4">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </>
  );
}

interface NavItemProps {
  icon: React.FC<{ className?: string }>;
  label: string;
  active?: boolean;
  collapsed?: boolean;
}

function NavItem({ icon: Icon, label, active, collapsed }: NavItemProps) {
  return (
    <Button
      variant={active ? "secondary" : "ghost"}
      className={cn(
        "w-full justify-start",
        collapsed ? "px-2" : "px-3",
        active && "bg-primary/10"
      )}
    >
      <Icon className={cn("h-5 w-5", active && "text-primary")} />
      {!collapsed && <span className="ml-2">{label}</span>}
    </Button>
  );
}