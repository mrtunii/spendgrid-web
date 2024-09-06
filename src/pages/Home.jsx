import React, { useState } from "react";
import { Plus, Cloud, Globe, CreditCard } from "lucide-react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const services = [
  {
    id: 1,
    name: "AWS",
    icon: Cloud,
    price: 150,
    nextPayment: "2023-06-25",
    description: "Cloud computing services for scalable infrastructure.",
    tags: ["Cloud", "Hosting", "Storage"],
    alternatives: [
      {
        name: "Google Cloud",
        icon: Cloud,
        description: "Google's suite of cloud computing services",
        website: "https://cloud.google.com",
      },
      {
        name: "Microsoft Azure",
        icon: Cloud,
        description: "Microsoft's cloud computing platform",
        website: "https://azure.microsoft.com",
      },
      {
        name: "DigitalOcean",
        icon: Cloud,
        description: "Cloud infrastructure provider for developers",
        website: "https://www.digitalocean.com",
      },
    ],
  },
  {
    id: 2,
    name: "Google Cloud",
    icon: Cloud,
    price: 200,
    nextPayment: "2023-07-05",
    description: "Comprehensive cloud platform for various applications.",
    tags: ["Cloud", "AI", "Analytics"],
    alternatives: [
      {
        name: "AWS",
        icon: Cloud,
        description: "Amazon's cloud computing platform",
        website: "https://aws.amazon.com",
      },
      {
        name: "Microsoft Azure",
        icon: Cloud,
        description: "Microsoft's cloud computing platform",
        website: "https://azure.microsoft.com",
      },
      {
        name: "IBM Cloud",
        icon: Cloud,
        description: "IBM's cloud computing services",
        website: "https://www.ibm.com/cloud",
      },
    ],
  },
  {
    id: 3,
    name: "Vercel",
    icon: Globe,
    price: 50,
    nextPayment: "2023-07-10",
    description: "Frontend deployment and hosting for modern web projects.",
    tags: ["Hosting", "Frontend", "Serverless"],
    alternatives: [
      {
        name: "Netlify",
        icon: Globe,
        description: "All-in-one platform for automating modern web projects",
        website: "https://www.netlify.com",
      },
      {
        name: "Heroku",
        icon: Globe,
        description: "Cloud platform for deploying and running modern apps",
        website: "https://www.heroku.com",
      },
      {
        name: "GitHub Pages",
        icon: Globe,
        description: "Hosting for static websites directly from GitHub",
        website: "https://pages.github.com",
      },
    ],
  },
  {
    id: 4,
    name: "Stripe",
    icon: CreditCard,
    price: 100,
    nextPayment: "2023-06-30",
    description: "Payment processing platform for online businesses.",
    tags: ["Payments", "Finance", "API"],
    alternatives: [
      {
        name: "PayPal",
        icon: CreditCard,
        description: "Online payment system for businesses and individuals",
        website: "https://www.paypal.com",
      },
      {
        name: "Square",
        icon: CreditCard,
        description: "Financial services and digital payments company",
        website: "https://squareup.com",
      },
      {
        name: "Braintree",
        icon: CreditCard,
        description: "Full-stack payments platform for online businesses",
        website: "https://www.braintreepayments.com",
      },
    ],
  },
];

const statistics = [
  { label: "Total Services", value: "15" },
  { label: "Monthly Spend", value: "$2,500" },
  { label: "Projected Annual", value: "$30,000" },
];

function AlternativeServiceModal({ alternative }) {
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

export default function HomePage() {
  const [selectedMonth, setSelectedMonth] = useState("current");

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

  return (
    <main className="flex-grow bg-background">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Services Overview</h1>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

        {/* Month filter and Add Service button */}
        <div className="flex justify-between items-center mb-6">
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

        {/* Services list */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service) => (
            <Card
              key={service.id}
              className="hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => console.log(`Clicked on ${service.name}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <service.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-semibold">{service.name}</h2>
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
                    <Badge
                      variant={
                        isPaymentSoon(service.nextPayment)
                          ? "destructive"
                          : "outline"
                      }
                      className="mt-2"
                    >
                      Next: {service.nextPayment}
                    </Badge>
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
                            <alt.icon className="w-4 h-4" />
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
      </div>
    </main>
  );
}
