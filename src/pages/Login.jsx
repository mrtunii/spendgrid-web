import React from "react";
import { useUser } from "../contexts/UserContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, Mail } from "lucide-react";

export function Login() {
  const { login } = useUser();

  const handleLogin = async (provider) => {
    try {
      await login(provider);
    } catch (error) {
      console.error("Error logging in:", error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login to SpendGrid</CardTitle>
          <CardDescription>
            Choose a method to log in to your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Button onClick={() => handleLogin("google")} variant="outline">
            <Mail className="mr-2 h-4 w-4" />
            Login with Google
          </Button>
          <Button onClick={() => handleLogin("github")} variant="outline">
            <Github className="mr-2 h-4 w-4" />
            Login with GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
