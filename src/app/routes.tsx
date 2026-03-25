import { BrowserRouter, Route, Routes } from "react-router";
import Page from "@/pages/page.tsx";

export default function WebsiteRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Page />} />
      </Routes>
    </BrowserRouter>
  );
}
