import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import z from "zod";

const updateTaskSchema = z.object({
    title: z.string().min(3).optional(),
    description: z.string().optional(),
    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),
    status: z.enum(["TODO", "IN_PROGRESS", "COMPLETED"]).optional(),
    dueDate: z.iso.datetime().nullable().optional(),
    categoryId: z.string().nullable().optional(),
})

export async function PATCH(
    request: Request,
    { params }: { params: Promise<{id: string}>},

){
    try {
        //Check Auth
        const session = await auth();

        if (!session?.user?.id){
            return Response.json({
                error: "Unauthorized"
            },{
                status: 401
            })
        }

        //Get task ID
        const {id} = await params;

        //Get request body
        const body = await request.json();

        //Validate
        const result = updateTaskSchema.safeParse(body);
        console.log(result);

        if (!result.success){
            return Response.json({
                error: "Invalid Task data",
                details: result.error.flatten()
            },{
                status: 400
            })
        }

        //Check if it belongs to the user
        const existingTask = await prisma.task.findFirst({
            where: {
                id,
                userId: session.user.id,
            }
        });

        if (!existingTask){
            return Response.json({
                error: "Task not found"
            },{
                status: 404
            });
        }

        //Finally Update
        const { categoryId, dueDate, ...taskData } = result.data;

        const task = await prisma.task.update({
            where: {
                id,
            },
            data: {
                ...taskData,
                ...(dueDate !== undefined && {
                    dueDate: dueDate ? new Date(dueDate) : null,
                }),
                ...(categoryId !== undefined && {
                    category: categoryId
                        ? { connect: { id: categoryId } }
                        : { disconnect: true },
                }),
            },
        })

        //return updated
        return Response.json(task)
        
    } catch (error) {
            console.error("PATCH /api/tasks/[id] error:", error);

    return Response.json(
      { error: "Failed to update task" },
      { status: 500 },
    );
  }
}

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        const task = await prisma.task.findFirst({
            where: {
                id,
                userId: session.user.id,
            },
        });

        if (!task) {
            return Response.json({ error: "Task not found" }, { status: 404 });
        }

        return Response.json(task);
    } catch (error) {
        console.error("GET /api/tasks/[id] error:", error);
        return Response.json({ error: "Failed to get task" }, { status: 500 });
    }
}

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const session = await auth();
        if (!session?.user?.id) {
            return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await params;

        const existingTask = await prisma.task.findFirst({
            where: {
                id,
                userId: session.user.id,
            },
        });

        if (!existingTask) {
            return Response.json({ error: "Task not found" }, { status: 404 });
        }

        await prisma.task.delete({
            where: { id },
        });

        return new Response(null, { status: 204 });
    } catch (error) {
        console.error("DELETE /api/tasks/[id] error:", error);
        return Response.json({ error: "Failed to delete task" }, { status: 500 });
    }
}