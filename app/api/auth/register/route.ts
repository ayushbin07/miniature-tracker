import { prisma } from "@/lib/prisma";
import { conflict, validationError } from "@/lib/responses";
import bcrypt from "bcrypt";
import { registerSchema } from "@/lib/validators/auth";
import { ZodError } from "zod";

export async function POST(request: Request) {
    let body;
  try {
    body = registerSchema.parse(await request.json());
  } catch (error) {
    return validationError(error as ZodError);
  }
  const { name, username, email, password } = body;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  const existingUsername = await prisma.user.findUnique({
  where: {
    username,
  },
});

if (existingUsername) {
  return conflict("Username already exists.");
}

  if (existingUser) {
    return conflict("Email already exists.");
  }
  if(existingUsername){
    return conflict("Username already exists.")
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      name,
      username,
      email,
      hashedPassword,
      avatarSeed: username.toLowerCase(),
    },
  });
  return Response.json(
    {
      message: "User created successfully.",
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        avatarSeed: user.avatarSeed,
        avatarType: user.avatarType,
      },
    },
    {
      status: 201,
    },
  );
}
