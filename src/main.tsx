import { router } from "@/router";
import { ThemeProvider } from "@/theme-provider";
import { RouterProvider } from "@tanstack/react-router";
import { createRoot } from "react-dom/client";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <ThemeProvider
    attribute="class"
    defaultTheme="light"
    enableSystem
    disableTransitionOnChange
  >
    <div vaul-drawer-wrapper="">
      <div className="relative flex min-h-screen 6flex-col bg-background">
        <RouterProvider router={router} />
      </div>
    </div>
  </ThemeProvider>
);
