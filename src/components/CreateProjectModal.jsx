import React from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SaveIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function CreateProjectModal({ setIsOpen }) {
  const { toast } = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    setIsOpen(false);
    toast({
      title: "Project created",
      description: "Your new project has been successfully created.",
    });
  };

  return (
    <DialogContent className="sm:max-w-[550px]">
      <DialogHeader>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogDescription>
          Enter the details for your new project. Click save when you&apos;re
          done.
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="project-title">Title</Label>
            <Input id="project-title" placeholder="Enter project title" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="project-description">Description</Label>
            <Textarea
              id="project-description"
              placeholder="Enter project description"
              rows={4}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">
            <SaveIcon className="mr-2 h-4 w-4" />
            Save Project
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
