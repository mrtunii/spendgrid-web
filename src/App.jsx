import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { Layout } from "./components/Layout";
import Home from "./pages/Home";
import { ProjectSettings } from "./pages/ProjectSettings";
import { Login } from "./pages/Login";
import { AuthCallback } from "@/components/AuthCallback.jsx";
import { UserProvider, useUser } from "./contexts/UserContext";

// Mock data for projects
const projects = [
  { id: 1, name: "Project A" },
  { id: 2, name: "Project B" },
  { id: 3, name: "Project C" },
];

function ProtectedRoute({ children }) {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function LayoutWrapper() {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <Layout
      selectedProject={selectedProject}
      setSelectedProject={setSelectedProject}
      projects={projects}
    >
      <Outlet />
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
            <Route element={<LayoutWrapper />}>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/settings"
                element={
                  <ProtectedRoute>
                    <ProjectSettings />
                  </ProtectedRoute>
                }
              />
            </Route>
          </Routes>
          <Toaster />
        </Router>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
