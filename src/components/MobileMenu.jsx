import React from 'react'
import { Menu, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet"

export function MobileMenu({ selectedProject, setSelectedProject, projects }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
          <SheetDescription>
            <a href="/" className="text-2xl font-bold cursor-pointer">SpendGrid</a>
          </SheetDescription>
        </SheetHeader>
        <div className="py-4">
          <h3 className="mb-2 text-lg font-semibold">Projects</h3>
          {projects.map((project) => (
            <SheetClose asChild key={project.id}>
              <Button
                variant="ghost"
                className="w-full justify-start cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {project.name}
              </Button>
            </SheetClose>
          ))}
          <SheetClose asChild>
            <Button
              variant="ghost"
              className="w-full justify-start cursor-pointer"
              onClick={() => {/* Open Create Project Modal */}}
            >
              <Plus className="mr-2 h-4 w-4" />
              Create New Project
            </Button>
          </SheetClose>
        </div>
        <div className="py-4">
          <h3 className="mb-2 text-lg font-semibold">Navigation</h3>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-start cursor-pointer">Dashboard</Button>
          </SheetClose>
          <SheetClose asChild>
            <Button variant="ghost" className="w-full justify-start cursor-pointer">Services</Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  )
}