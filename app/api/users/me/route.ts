import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { notAuthorized, notFound } from "@/lib/responses";

export async function GET() {
    const session = await auth();

    if (!session) {
        return notAuthorized("User is not authorized.");
    }

    const user = await prisma.user.findUnique({
        where: {
            id: session.user.id,
        },
    });

    if (!user) {
        return notFound("User not found.");
    }

    const { hashedPassword, ...safeUser } = user;

    return Response.json(safeUser);
}