import React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface TemplateProps {
  children: React.ReactNode;
  title: string;
  description?: string;
}

export function Template({ children, title, description }: TemplateProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground p-4 shadow">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">{title}</h1>
          {description && <p className="text-sm mt-1">{description}</p>}
        </div>
      </header>
      <main className="flex-1 container mx-auto p-6">
        <Card className="p-4">{children}</Card>
      </main>
      <footer className="bg-secondary text-secondary-foreground p-4">
        <div className="container mx-auto text-center">
          <p className="text-sm">&copy; 2024 Your Company. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
