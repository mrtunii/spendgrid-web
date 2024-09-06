import React, { useState } from "react";
import { Header } from "./Header";
import { Statistics } from "./Statistics";
import { ServicesList } from "./ServicesList";
import { useTheme } from "./ThemeProvider";
import { Cloud, CreditCard, Globe } from "lucide-react";
import { Outlet } from "react-router-dom";

// Mock data for projects and services
const projects = [
  { id: 1, name: "Project A" },
  { id: 2, name: "Project B" },
  { id: 3, name: "Project C" },
];


export function Layout({ children }) {
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const { theme } = useTheme();

  return (
    <div
      className={`flex flex-col min-h-screen ${theme === "dark" ? "dark" : ""}`}
    >
      <Header
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject}
        projects={projects}
      />
      {children || <Outlet />}
    </div>
  );
}
