import { prisma } from "@/lib/prisma";
import { Card } from "@heroui/react";

export default async function HabitsPage(){
const habits = await prisma.habit.findMany();
console.log(habits);
return (
    <div>
        <h1>
            Habits
        </h1>
        <p>
            {habits.length} habits
        </p>
        {habits.map((habit)=> (
            <Card key={habit.id}>
                <br />
                <h2>
                    {habit.title}
                </h2>
                <h3>
                    {habit.frequency}
                </h3>
                <h3>
                    {habit.type}
                </h3>

            </Card>

        ))}
    </div>
)


}

