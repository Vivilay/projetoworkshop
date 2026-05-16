import { Link, NavLink, Outlet, useLocation } from "react-router";
import { routes } from "@/config/routes";
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  Settings,
  ExternalLink,
  Dumbbell
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarRail,
  SidebarTrigger
} from "@/app/components/ui/sidebar";
import { Separator } from "@/app/components/ui/separator";
import { PageTransition } from "@/components/motion";

const navItems: {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  end?: boolean;
}[] = [
  { to: routes.dashboard.root, label: "Visão geral", icon: LayoutDashboard, end: true },
  { to: routes.dashboard.members, label: "Membros", icon: Users },
  { to: routes.dashboard.schedule, label: "Agenda", icon: CalendarDays },
  { to: routes.dashboard.settings, label: "Configurações", icon: Settings }
];

export function DashboardLayout() {
  const location = useLocation();

  return (
    <SidebarProvider>
      <Sidebar variant="inset" collapsible="icon">
        <SidebarHeader className="border-b border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild>
                <Link to={routes.dashboard.root}>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                    <Dumbbell className="size-4" />
                  </div>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
          <p className="px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground group-data-[collapsible=icon]:hidden">
            FORGEE · Painel
          </p>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navItems.map(({ to, label, icon: Icon, end }) => (
                  <SidebarMenuItem key={to}>
                    <SidebarMenuButton
                      asChild
                      isActive={end ? location.pathname === to : location.pathname.startsWith(to)}
                    >
                      <NavLink to={to} end={end}>
                        <Icon />
                        <span>{label}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="border-t border-sidebar-border">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link to={routes.home} className="text-muted-foreground">
                  <ExternalLink />
                  <span>Ver site público</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset className="bg-background">
        <header className="flex h-14 shrink-0 items-center gap-2 border-b border-border px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <h1 className="font-['Oswald'] text-sm font-bold uppercase tracking-wide text-foreground">
            Dashboard
          </h1>
        </header>

        <main className="flex flex-1 flex-col p-4 md:p-6">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
