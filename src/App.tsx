import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Home } from "./pages/Home";
import { Discover } from "./pages/Discover";
import { PerfumeDetail } from "./pages/PerfumeDetail";
import News from "./pages/News";
import NotFound from "./pages/NotFound";
import { FilterProvider } from "./contexts/FilterContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter>
        <FilterProvider>
          <Header />
          <Routes>
            <Route path="/" element={<Discover />} />
            <Route path="/home" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/perfume/:slug" element={<PerfumeDetail />} />
            <Route path="/news" element={<News />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </FilterProvider>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
