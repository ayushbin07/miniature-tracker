
import { z } from "zod";
import { HabitType, Frequency } from "@prisma/client";



export const createHabitSchema = z.object({
    title: z.string().min(1, "Title is required.").max(100,"Title is too long, This is not a competetion."),
    type: z.enum(HabitType),
    frequency: z.enum(Frequency),
})