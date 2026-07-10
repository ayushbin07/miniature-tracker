import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    // 1. Check if today's log already exists
    const existingLog = await prisma.habitLog.findFirst({
      where: {
        habitId: id,
        completedAt: {
          gte: new Date(new Date().setHours(0, 0, 0, 0)),
          lt: new Date(new Date().setHours(24, 0, 0, 0)),
        },
      },
    });

    // 2. If it exists, remove it (toggle OFF)
    if (existingLog) {
      await prisma.habitLog.delete({
        where: {
          id: existingLog.id,
        },
      });

      return NextResponse.json({
        completed: false,
      });
    }

    // 3. Otherwise create today's log (toggle ON)
    await prisma.habitLog.create({
      data: {
        habitId: id,
        completedAt: new Date(),
      },
    });

    return NextResponse.json({
      completed: true,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        message: "Something went wrong.",
      },
      {
        status: 500,
      },
    );
  }
}