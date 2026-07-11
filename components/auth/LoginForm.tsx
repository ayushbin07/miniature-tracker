"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import {
  Button,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
  Link,
} from "@heroui/react";

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Connect Auth.js later
  }

  return (
    <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <TextField name="email" type="email" isRequired>
        <Label>Email</Label>
        <Input variant="secondary" placeholder="you@example.com" />
      </TextField>

      <TextField name="password" isRequired>
        <Label>Password</Label>
        <InputGroup variant="secondary">
          <InputGroup.Input
            placeholder="Enter your password"
            type={isVisible ? "text" : "password"}
          />
          <InputGroup.Suffix className="pr-0">
            <Button
              isIconOnly
              aria-label={isVisible ? "Hide password" : "Show password"}
              size="sm"
              variant="ghost"
              onPress={() => setIsVisible(!isVisible)}
            >
              {isVisible ? (
                <Eye className="size-4" />
              ) : (
                <EyeOff className="size-4" />
              )}
            </Button>
          </InputGroup.Suffix>
        </InputGroup>
      </TextField>

      <Button className="w-full bg-accent" type="submit">
        Sign In
      </Button>



      <Link className="self-center text-sm" href="#">
        Forgot password?
      </Link>

      <span className="text-xs text-muted-foreground self-center">
        Made with ❤️ by Ayush
      </span>
    </Form>
  );
}
