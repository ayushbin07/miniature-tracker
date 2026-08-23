import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { createTaskSchema } from "@/lib/validators/task";

export async function GET() {
  const session = await auth();

  if (!session?.user?.id) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const tasks = await prisma.task.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return Response.json(tasks);
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return Response.json(
        {
          error: "unauthorized",
        },
        {
          status: 401,
        },
      );
    }
    const body = await request.json();

    const result = createTaskSchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          error: "Invalid task data",
          details: result.error.flatten(),
        },
        {
          status: 400,
        },
      );
    }

    const task = await prisma.task.create({
      data: {
        title: result.data.title,
        description: result.data.description,
        priority: result.data.priority,
        status: result.data.status,
        dueDate: result.data.dueDate
          ? new Date(result.data.dueDate)
          : undefined,
        categoryId: result.data.categoryId,
        userId: session.user.id,
      },
    });

    return Response.json(task, { status: 201 });
  } catch (error) {
    console.error("POST /api/tasks error:", error);

    return Response.json(
      {
        error: "failed to create task",
      },
      {
        status: 500,
      },
    );
  }
}
