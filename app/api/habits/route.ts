import { prisma } from "@/lib/prisma";
import { createHabitSchema } from "@/lib/schemas/habit";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { validationError, serverError } from "@/lib/responses";

export async function GET() {
  const habits = await prisma.habit.findMany({
    where: {
      userId: "123",
    },
    include: {
      habitLogs: {
        where: {
          completedAt: {
            gte: new Date(new Date().setHours(0, 0, 0, 0)),
            lt: new Date(new Date().setHours(24, 0, 0, 0)),
          },
        },
      },
    },
  });

  const response = habits.map(({ habitLogs, ...habit }) => ({
    ...habit,
    completedToday: habitLogs.length > 0,
  }));

  return NextResponse.json(response);
}

export async function POST(request: Request) {
  try {
    const body = createHabitSchema.parse(await request.json());

    const habit = await prisma.habit.create({
      data: {
        title: body.title,
        type: body.type,
        frequency: body.frequency,
        userId: "123",
      },
    });

    return NextResponse.json(habit, {
      status: 201,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return validationError(error);
    }
    return serverError(error);
  }
}