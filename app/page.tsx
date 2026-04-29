import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckSquare, ListTodo, CheckCircle2 } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <main className="flex-1">
        <section className="container mx-auto px-4 py-32">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-black font-bold mb-6 text-6xl">A better way to track your tasks</h1>
            <p className="text-muted-foreground mb-10 text-xl">
              Capture, organize, and manage your daily todos in one place
            </p>
          
            <div className="flex flex-col items-center gap-4">
            <Link href="/sign-up">
                <Button size="lg" className="h-12 px-8 text-lg font-medium">
                  Start for free <ArrowRight className="ml-2" />
                </Button>
              </Link>
              <p className="text-sm text-muted-foreground">Free forever. No credit card require.</p>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="border-t bg-white py-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-12 md:grid-cols-3">
              <div className="flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <CheckSquare className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Manage Todos
                </h3>
                <p className="text-muted-foreground">
                  Create custom tasks and track your daily activities at every stage of the process.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <ListTodo className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Reorder Tasks
                </h3>
                <p className="text-muted-foreground">
                  Easily drag and drop your tasks to prioritize them the way you want.
                </p>
              </div>
              <div className="flex flex-col">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-3 text-2xl font-semibold text-black">
                  Stay Organized
                </h3>
                <p className="text-muted-foreground">
                  Never lose track of a task. Keep all your to-dos in one centralized place.
                </p>
              </div>
            </div>
          </div>
        </section>
        
      </main>
    </div>
  );
}
