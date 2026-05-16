/** Rotas centralizadas — use ao criar links e novas páginas da dashboard. */
export const routes = {
  home: "/",
  dashboard: {
    root: "/dashboard",
    members: "/dashboard/membros",
    schedule: "/dashboard/agenda",
    settings: "/dashboard/configuracoes"
  }
} as const;
