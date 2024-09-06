import  { useState } from "react";
import { Bell, ChevronDown, Moon, Plus, Sun, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "./ThemeProvider";
import { MobileMenu } from "./MobileMenu";
import { Dialog } from "@/components/ui/dialog";
import { CreateProjectModal } from "./CreateProjectModal";

export function Header({ selectedProject, setSelectedProject, projects }) {
  const { theme, setTheme } = useTheme();
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] =
    useState(false);

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-6">
            <div className="text-2xl font-bold">SpendGrid</div>
            <MobileMenu
              selectedProject={selectedProject}
              setSelectedProject={setSelectedProject}
              projects={projects}
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[200px] justify-between hidden md:flex"
                >
                  {selectedProject.name}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]">
                <DropdownMenuLabel>Switch Project</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {projects.map((project) => (
                  <DropdownMenuItem
                    key={project.id}
                    onSelect={() => setSelectedProject(project)}
                  >
                    {project.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => setIsCreateProjectModalOpen(true)}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost">Dashboard</Button>
            <Button variant="ghost">Services</Button>
          </nav>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              {theme === "light" ? (
                <Moon className="h-5 w-5" />
              ) : (
                <Sun className="h-5 w-5" />
              )}
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>John Doe</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <Dialog
        open={isCreateProjectModalOpen}
        onOpenChange={setIsCreateProjectModalOpen}
      >
        <CreateProjectModal setIsOpen={setIsCreateProjectModalOpen} />
      </Dialog>
    </header>
  );
}
