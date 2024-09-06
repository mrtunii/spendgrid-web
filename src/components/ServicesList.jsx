import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { AlternativeServiceModal } from "./AlternativeServiceModal";

export function ServicesList({ services }) {
  const [selectedMonth, setSelectedMonth] = useState("current");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const monthOptions = [
    { value: "current", label: "This Month" },
    { value: "previous", label: "Previous Month" },
    { value: "2023-06", label: "June 2023" },
    { value: "2023-05", label: "May 2023" },
    { value: "2023-04", label: "April 2023" },
  ];

  const isPaymentSoon = (date) => {
    const paymentDate = new Date(date);
    const today = new Date();
    const diffTime = paymentDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 10;
  };

  const allCategories = [
    ...new Set(services.flatMap((service) => service.categories)),
  ];

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const filteredServices =
    selectedCategories.length > 0
      ? services.filter((service) =>
          service.categories.some((category) =>
            selectedCategories.includes(category)
          )
        )
      : services;

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-semibold">Services</h2>
          <Button variant="outline" size="sm" className="h-9">
            <Plus className="mr-2 h-4 w-4" />
            Add Service
          </Button>
        </div>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select month" />
          </SelectTrigger>
          <SelectContent>
            {monthOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="mb-6">
        <h3 className="text-sm font-semibold mb-2">Filter by Category:</h3>
        <div className="flex flex-wrap gap-2">
          {allCategories.map((category) => (
            <Badge
              key={category}
              variant={
                selectedCategories.includes(category) ? "default" : "outline"
              }
              className="cursor-pointer"
              onClick={() => toggleCategory(category)}
            >
              {category}
              {selectedCategories.includes(category) && (
                <X
                  className="ml-1 h-3 w-3"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleCategory(category);
                  }}
                />
              )}
            </Badge>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredServices.map((service) => (
          <Card
            key={service.id}
            className="hover:shadow-md transition-shadow duration-200 cursor-pointer"
            onClick={() => console.log(`Clicked on ${service.name}`)}
          >
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row items-start justify-between space-y-4 sm:space-y-0">
                <div className="flex items-start space-x-4">
                  <div className="bg-primary/10 p-2 rounded-full">
                    <service.icon className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h2 className="text-xl font-semibold">{service.name}</h2>
                      <Badge
                        variant={
                          isPaymentSoon(service.nextPayment)
                            ? "destructive"
                            : "secondary"
                        }
                        className="text-[10px] px-1 py-0"
                      >
                        {service.nextPayment}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {service.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {service.tags.map((tag, index) => (
                        <Badge key={index} variant="outline">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">${service.price}</p>
                  <p className="text-sm text-muted-foreground">per month</p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-2">
                  Alternatives:
                </p>
                <div className="flex space-x-2">
                  {service.alternatives.map((alt, index) => (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-full p-0 w-8 h-8"
                        >
                          <alt.icon className="w-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <AlternativeServiceModal alternative={alt} />
                    </Dialog>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
