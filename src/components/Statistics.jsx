import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export function Statistics({ statistics }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {statistics.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-muted-foreground mb-2">
              {stat.label}
            </h3>
            <p className="text-3xl font-bold">{stat.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
