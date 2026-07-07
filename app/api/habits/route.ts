
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
    const habits = await prisma.habit.findMany();

    return NextResponse.json(habits);
}

export async function POST(request: Request) {
    const body = await request.json();
    console.log(body);

    return NextResponse.json({
        message: "POST works!",
    });
}