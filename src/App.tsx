
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Layout from "./components/Layout";
import Index from "./pages/Index";
import PomodoroPage from "./pages/PomodoroPage";
import TodoPage from "./pages/TodoPage";
import ChatPage from "./pages/ChatPage";
import NotesPage from "./pages/NotesPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import StudySourcesPage from "./pages/StudySourcesPage";
import SelfStudyPage from "./pages/SelfStudyPage";
import ClassroomPage from "./pages/ClassroomPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // Initialize theme based on localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/pomodoro" element={<PomodoroPage />} />
              <Route path="/todo" element={<TodoPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/notes" element={<NotesPage />} />
              <Route path="/announcements" element={<AnnouncementsPage />} />
              <Route path="/study-sources" element={<StudySourcesPage />} />
              <Route path="/self-study" element={<SelfStudyPage />} />
              <Route path="/classroom" element={<ClassroomPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
