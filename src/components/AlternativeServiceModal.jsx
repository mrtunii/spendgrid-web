import React from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function AlternativeServiceModal({ alternative }) {
  const IconComponent = alternative.icon;

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
          <IconComponent className="w-6 h-6" />
          {alternative.name}
        </DialogTitle>
        <DialogDescription>{alternative.description}</DialogDescription>
      </DialogHeader>
      <div className="mt-4">
        <Button
          className="w-full"
          onClick={() => window.open(alternative.website, "_blank")}
        >
          Visit Website
        </Button>
      </div>
    </DialogContent>
  );
}
