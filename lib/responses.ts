import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function validationError(error: ZodError) {
  return NextResponse.json(
    {
      message: "Validation failed.",
      errors: error.issues,
    },
    {
      status: 400,
    },
  );
}

export function serverError(error: unknown) {
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

export function notFound(message: string){
  return NextResponse.json(
    {
      message: {message}
    },
    {
      status: 404
    }
  )
}