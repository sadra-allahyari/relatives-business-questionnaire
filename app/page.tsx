"use client";

import StepForm from "@/components/step-form";
import ThemeToggle from "@/components/theme-toggle";

/**
 * Home page component.
 *
 * Renders the main layout for the home page, including:
 * - A theme toggle button positioned at the top-left corner.
 * - A centered multi-step form component.
 *
 * @returns The home page React element.
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Top-left theme toggle */}
      <div className="absolute top-4 left-4">
        <ThemeToggle />
      </div>

      {/* Centered form */}
      <div className="flex items-center justify-center min-h-screen">
        <StepForm />
      </div>
    </div>
  );
}
