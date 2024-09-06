import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bell, ChevronDown, Moon, Plus, Sun, User, Menu, Settings, Home } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useTheme } from './ThemeProvider'
import { MobileMenu } from './MobileMenu'

export function Header({ selectedProject, setSelectedProject, projects }) {
  const { theme, setTheme } = useTheme()
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false)
  const location = useLocation()

  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-2xl font-bold cursor-pointer">SpendGrid</Link>
            <MobileMenu selectedProject={selectedProject} setSelectedProject={setSelectedProject} projects={projects} />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-[200px] justify-between hidden md:flex">
                  {selectedProject.name}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-[200px]">
                <DropdownMenuLabel>Switch Project</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {projects.map((project) => (
                  <DropdownMenuItem key={project.id} onSelect={() => setSelectedProject(project)} className="cursor-pointer">
                    {project.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem onSelect={() => setIsCreateProjectModalOpen(true)} className="cursor-pointer">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Project
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <nav className="hidden md:flex items-center space-x-4">
            <Link to="/">
              <Button variant={location.pathname === '/' ? "default" : "ghost"}>
                <Home className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <Link to="/settings">
              <Button variant={location.pathname === '/settings' ? "default" : "ghost"}>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Button>
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              {theme === 'light' ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
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
                <DropdownMenuItem className="cursor-pointer">Profile</DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  )
}