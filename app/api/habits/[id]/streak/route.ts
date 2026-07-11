//Streak Calculation based on Daily, Weekly, Monthly

import { prisma } from "@/lib/prisma";
import { notFound } from "@/lib/responses";
import { RouteParams } from "@/lib/types";

export async function GET(
  request: Request,
  { params }: RouteParams<{ id: string }>,
) {
  const { id } = await params;

  const habit = await prisma.habit.findUnique({
    where: {
      id: id,
    },
    include: {
      habitLogs: {
        orderBy: {
          completedAt: "desc",
        },
      },
    },
  });
  if (!habit) {
    return notFound("Streak cannot be calculated for non existing habit.");
  }
  // TODO: Add streak calculation logic
  // 1. Get today's date
  // 2. Normalize dates to calendar days
  // 3. Remove duplicate days
  // 4. Decide starting day (today or yesterday)
  // 5. Compare consecutive days
  // 6. Stop at first gap
  // 7. Return streak
  const logs = habit.habitLogs;
  const uniqueDates = new Set<string>();
  const uniqueDays: string[] = [];
  for (const log of logs) {
    const day = log.completedAt.toISOString().split("T")[0];
    if (!uniqueDates.has(day)) {
      uniqueDates.add(day);
      uniqueDays.push(day);
    }
  }

let streak = 0;

const expected = new Date();
expected.setHours(0, 0, 0, 0);

const today = expected.toISOString().split("T")[0];

// If today's habit isn't completed, start checking from yesterday.
if (uniqueDays[0] !== today) {
  //This is daily streak implementation , later on we add weekly and monthly streak.
  expected.setDate(expected.getDate() - 1);
}

for (const day of uniqueDays) {
  const expectedDay = expected.toISOString().split("T")[0];

  if (day === expectedDay) {
    streak++;
    expected.setDate(expected.getDate() - 1);
  } else {
    break;
  }
}

return Response.json({
  streak,
  frequency: habit.frequency,
  totalLogs: uniqueDays.length,
});

}
