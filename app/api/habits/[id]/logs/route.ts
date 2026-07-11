import { prisma } from "@/lib/prisma";
import { notFound, serverError, validationError } from "@/lib/responses";
import { RouteParams } from "@/lib/types";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export async function GET(
  request: Request,
  { params }: RouteParams<{id: string}> //Made a reuseable params type.
) {
  const { id } = await params;

  try {
    const habit = await prisma.habit.findUnique({
      where: {
        id,
      },
      include: {
        habitLogs: {
            orderBy:{
                completedAt: "desc",
            }
        }
      }
    });
    if (!habit) {
      return notFound("Habit not found.");
    }
    return NextResponse.json(habit.habitLogs);
  } catch (error) {
    if (error instanceof ZodError) {
      return validationError(error);
    }
    return serverError(error);
  }
}
