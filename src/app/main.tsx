import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import WebsiteRoutes from "./routes.tsx";
import "./global.sass";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <WebsiteRoutes />
  </StrictMode>,
);
