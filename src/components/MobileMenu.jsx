import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
        </SheetHeader>
        <div className="py-4">
          <h3 className="mb-2 text-lg font-semibold">Projects</h3>
          {projects.map((project) => (
            <Button
              key={project.id}
              variant="ghost"
              className="w-full justify-start"
              onClick={() => setSelectedProject(project)}
            >
              {project.name}
            </Button>
          ))}
        </div>
        <div className="py-4">
          <h3 className="mb-2 text-lg font-semibold">Navigation</h3>
          <Button variant="ghost" className="w-full justify-start">
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Services
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
