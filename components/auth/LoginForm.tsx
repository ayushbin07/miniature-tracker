"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { loginSchema } from "@/lib/validators/auth";
import {
  Button,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
  Link,
  FieldError,
} from "@heroui/react";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const result = loginSchema.safeParse(formData);
    
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        newErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(newErrors);
    } else {
      setErrors({});
      setIsLoading(true);

      try {
        const response = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (response?.error) {
          toast.error("Invalid credentials.");
        } else {
          toast.success("Signed in successfully!");
          router.push("/dashboard");
        }
      } catch (error) {
        toast.error("Something went wrong.");
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <Form className="flex flex-col gap-4" onSubmit={onSubmit}>
      <TextField
        name="email"
        type="email"
        isRequired
        isInvalid={!!errors.email}
        onChange={(val) => setFormData({ ...formData, email: val })}
        value={formData.email}
      >
        <Label>Email</Label>
        <Input variant="secondary" placeholder="you@example.com" />
        {errors.email && <FieldError>{errors.email}</FieldError>}
      </TextField>

      <TextField
        name="password"
        isRequired
        isInvalid={!!errors.password}
        onChange={(val) => setFormData({ ...formData, password: val })}
        value={formData.password}
      >
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
        {errors.password && <FieldError>{errors.password}</FieldError>}
      </TextField>

      <Button
        className="w-full bg-accent"
        type="submit"
        isPending={isLoading}
        isDisabled={isLoading}
      >
        Sign In
      </Button>



      <div className="flex flex-col items-center gap-2 mt-2">
        <div className="flex items-center gap-3">
          <Link className="text-sm" href="#">
            Forgot password?
          </Link>
          <div className="h-3 w-px bg-border/50" />
          <Link className="text-sm text-primary font-medium" href="/register">
            Create account
          </Link>
        </div>

        <span className="text-xs text-muted-foreground">
          Made with ❤️ by Ayush
        </span>
      </div>
    </Form>
  );
}
