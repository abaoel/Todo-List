import { getSession } from "@/lib/auth/auth";
import { redirect } from "next/navigation";
import TodoList from "@/components/todo-list";
import { Suspense } from "react";

export default async function TodosPage() {
  const session = await getSession();

  if (!session?.user) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="container mx-auto p-6 max-w-3xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black">{session.user.name}&apos;s Todos</h1>
          <p className="text-gray-600">Manage your tasks</p>
        </div>
        <Suspense fallback={<p>Loading todos...</p>}>
          <TodoList />
        </Suspense>
      </div>
    </div>
  );
}
