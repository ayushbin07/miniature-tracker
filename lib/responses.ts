import { error } from "console";
import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function notAuthorized(message :string){
  return Response.json(
    {
      message: {message}
    },
    {
      status: 401
    }
  )
}

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

export function conflict(message: string){
  return NextResponse.json({
    error: {message}
  },{
    status: 409
  })
}