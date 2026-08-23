import { auth } from "@/auth";
import { TasksClient } from "./tasks-client";
import { redirect } from "next/navigation";

export default async function TasksPage() {
  const session = await auth();
  
  if (!session?.user?.id) {
    redirect("/login");
  }

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-8 mt-4">
        <h1 className="text-3xl font-bold tracking-tight">Your Tasks</h1>
        <p className="text-muted-foreground mt-2">Manage your playful todo list.</p>
      </div>

      <TasksClient />
    </div>
  );
}
