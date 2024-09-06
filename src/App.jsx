import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import { ProjectSettings } from "./pages/ProjectSettings";

// Mock data for projects
const projects = [
  { id: 1, name: "Project A" },
  { id: 2, name: "Project B" },
  { id: 3, name: "Project C" },
];

function App() {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Router>
        <Layout
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          projects={projects}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<ProjectSettings />} />
          </Routes>
        </Layout>
      </Router>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
