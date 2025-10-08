import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <main className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Welcome to Next.js + Tailwind + shadcn/ui
          </h1>
          <p className="text-muted-foreground text-lg">
            Your project is set up and ready to go!
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Next.js</CardTitle>
              <CardDescription>
                The React Framework for Production
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Built with App Router, TypeScript, and ESLint for modern web development.
              </p>
              <Button asChild>
                <a href="https://nextjs.org/docs" target="_blank" rel="noopener noreferrer">
                  Read Docs
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tailwind CSS</CardTitle>
              <CardDescription>
                A utility-first CSS framework
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Rapidly build modern websites with utility classes and custom design systems.
              </p>
              <Button variant="outline" asChild>
                <a href="https://tailwindcss.com/docs" target="_blank" rel="noopener noreferrer">
                  Learn More
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>shadcn/ui</CardTitle>
              <CardDescription>
                Beautifully designed components
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Accessible and customizable components built with Radix UI and Tailwind CSS.
              </p>
              <Button variant="secondary" asChild>
                <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer">
                  Browse Components
                </a>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Get Started</CardTitle>
              <CardDescription>
                Begin building your application
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Edit <code className="bg-muted px-1 py-0.5 rounded text-sm">src/app/page.tsx</code> to start building.
              </p>
              <Button variant="default">
                Start Building
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-center gap-4 pt-8">
          <Button size="lg">
            Get Started
          </Button>
          <Button size="lg" variant="outline">
            View on GitHub
          </Button>
        </div>
      </main>
    </div>
  );
}
