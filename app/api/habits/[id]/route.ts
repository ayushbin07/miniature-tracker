import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const habit = await prisma.habit.findUnique({
    where: { id },
  });
  if (!habit) {
    return NextResponse.json(
      {
        message: "Habit not found",
      },
      {
        status: 404,
      },
    );
  }

  return NextResponse.json(habit);
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const body = await request.json();
  const { id } = await params;
  try {
    const habit = await prisma.habit.update({
      where: { id },
      data: {
        title: body.title,
        type: body.type,
        frequency: body.frequency,
      },
    });
    return NextResponse.json(habit);
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

export async function DELETE(request: Request, 
  {params}: {params: Promise<{id: string}>}
){
const {id} = await params;
try {
await prisma.habit.delete({
    where: {
      id
    }
  })
} catch (error) {
  console.error(error);
  return NextResponse.json(
    {
      message: "Something Went Wrong."
    },{
      status: 500
    }
  )
}
return NextResponse.json(
  {
    message: "Habit deleted successfully."
  },{
    status: 200
  }
)
}
