import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { CookieBanner } from "@/components/site/CookieBanner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl text-primary">404</h1>
        <h2 className="mt-4 font-display text-2xl text-primary">Página no encontrada</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          La página que buscas no existe o ha sido movida.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-2xl text-primary">Esta página no se cargó</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Algo no funcionó. Puedes intentarlo de nuevo o volver al inicio.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Reintentar
          </button>
          <a href="/" className="rounded-full border border-border bg-background px-5 py-2 text-sm font-medium text-primary hover:bg-secondary">
            Inicio
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#FAF8F4" },
      { property: "og:site_name", content: "Horizonte Legal" },
      { property: "og:locale", content: "es_ES" },
      { title: "Ley Segunda Oportunidad" },
      { property: "og:title", content: "Ley Segunda Oportunidad" },
      { name: "twitter:title", content: "Ley Segunda Oportunidad" },
      { name: "description", content: "Horizonte Legal offers a debt cancellation solution for individuals and autónomos in Barcelona." },
      { property: "og:description", content: "Horizonte Legal offers a debt cancellation solution for individuals and autónomos in Barcelona." },
      { name: "twitter:description", content: "Horizonte Legal offers a debt cancellation solution for individuals and autónomos in Barcelona." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/69d4191a-0500-45f3-b394-e0dba18b8bce/id-preview-0bf2c418--5bb7d30b-6a3c-43d1-9bb2-5d18317907c8.lovable.app-1780332332930.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/69d4191a-0500-45f3-b394-e0dba18b8bce/id-preview-0bf2c418--5bb7d30b-6a3c-43d1-9bb2-5d18317907c8.lovable.app-1780332332930.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <CookieBanner />
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </QueryClientProvider>
  );
}
