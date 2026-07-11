import { prisma } from "@/lib/prisma";
import { notFound } from "@/lib/responses";
import { RouteParams } from "@/lib/types";

export async function POST(
  request: Request,
  { params }: RouteParams<{ id: string }>,
) {
  const { id } = await params;

  // Check if the habit exists
  const habit = await prisma.habit.findUnique({
    where: {
      id,
    },
  });

  if (!habit) {
    return notFound("Habit not found.");
  }

  // Get today's date range
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  // Check if today's completion already exists
  const existingLog = await prisma.habitLog.findFirst({
    where: {
      habitId: id,
      completedAt: {
        gte: today,
        lt: tomorrow,
      },
    },
  });

  // Toggle completion
  if (existingLog) {
    await prisma.habitLog.delete({
      where: {
        id: existingLog.id,
      },
    });

    return Response.json({
      completedToday: false,
      message: "Habit marked as incomplete.",
    });
  }

  await prisma.habitLog.create({
    data: {
      habitId: id,
      completedAt: new Date(),
    },
  });

  return Response.json({
    completedToday: true,
    message: "Habit completed successfully.",
  });
}
