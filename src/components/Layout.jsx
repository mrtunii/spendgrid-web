import React, { useState } from "react";
import { Header } from "./Header";
import { Statistics } from "./Statistics";
import { ServicesList } from "./ServicesList";
import { useTheme } from "./ThemeProvider";
import { Cloud, CreditCard, Globe } from "lucide-react";

// Mock data for projects and services
const projects = [
  { id: 1, name: "Project A" },
  { id: 2, name: "Project B" },
  { id: 3, name: "Project C" },
];

const services = [
  {
    id: 1,
    name: "AWS",
    icon: Cloud,
    price: 150,
    nextPayment: "2023-07-01",
    description: "Cloud computing services for scalable infrastructure.",
    tags: ["Cloud", "Hosting", "Storage"],
    categories: ["Infrastructure", "Cloud Computing"],
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
    categories: ["Infrastructure", "Cloud Computing", "AI"],
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
    categories: ["Hosting", "Development"],
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
    nextPayment: "2023-06-25",
    description: "Payment processing platform for online businesses.",
    tags: ["Payments", "Finance", "API"],
    categories: ["Finance", "API"],
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

// Mock statistics data
const statistics = [
  { label: "Total Services", value: 15 },
  { label: "Monthly Spend", value: "$2,500" },
  { label: "Projected Annual", value: "$30,000" },
];

export function Layout() {
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
      <main className="flex-grow bg-background">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Services Overview</h1>
          <Statistics statistics={statistics} />
          <ServicesList services={services} />
        </div>
      </main>
    </div>
  );
}
