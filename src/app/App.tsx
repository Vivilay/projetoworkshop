import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { RouteFallback } from "@/components/RouteFallback";
import { AppProviders } from "@/providers/AppProviders";
import SitePage from "@/pages/site/SitePage";

const DashboardLayout = lazy(() =>
  import("@/layouts/DashboardLayout").then((m) => ({ default: m.DashboardLayout }))
);
const DashboardOverview = lazy(() => import("@/pages/dashboard/DashboardOverview"));
const DashboardPlaceholder = lazy(() =>
  import("@/pages/dashboard/DashboardPlaceholder").then((m) => ({
    default: m.DashboardPlaceholder
  }))
);

export default function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SitePage />} />
          <Route
            path="/dashboard"
            element={
              <Suspense fallback={<RouteFallback />}>
                <DashboardLayout />
              </Suspense>
            }
          >
            <Route
              index
              element={
                <Suspense fallback={<RouteFallback />}>
                  <DashboardOverview />
                </Suspense>
              }
            />
            <Route
              path="membros"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <DashboardPlaceholder
                    title="Membros"
                    description="Cadastro, planos e status dos alunos — módulo em desenvolvimento."
                  />
                </Suspense>
              }
            />
            <Route
              path="agenda"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <DashboardPlaceholder
                    title="Agenda"
                    description="Aulas, personal e reservas — módulo em desenvolvimento."
                  />
                </Suspense>
              }
            />
            <Route
              path="configuracoes"
              element={
                <Suspense fallback={<RouteFallback />}>
                  <DashboardPlaceholder
                    title="Configurações"
                    description="Perfil da academia, equipe e integrações — módulo em desenvolvimento."
                  />
                </Suspense>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}
