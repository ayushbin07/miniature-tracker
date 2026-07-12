"use client";
import { registerSchema } from "@/lib/validators/auth";
import { api } from "@/lib/axios";
import {
  Button,
  Form,
  Input,
  InputGroup,
  TextField,
  Link,
  FieldError,
  Label,
} from "@heroui/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { isAxiosError } from "axios";
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/animate-ui/components/animate/tabs";
import { Checkbox } from "@/components/animate-ui/components/headless/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";

import { useState } from "react";
import { serverError } from "@/lib/responses";

export default function RegisterForm() {
  const [activeTab, setActiveTab] = useState("account");
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleNext = () => {
    const accountSchema = registerSchema.pick({ name: true, email: true, username: true });
    const result = accountSchema.safeParse(formData);
    
    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        newErrors[issue.path[0] as string] = issue.message;
      });
      setErrors(newErrors);
    } else {
      setErrors({});
      setActiveTab("password");
    }
  };

  const onSubmit = async () => {
    const result = registerSchema.safeParse(formData);
    const newErrors: Record<string, string> = {};

    if (!result.success) {
      result.error.issues.forEach((issue) => {
        newErrors[issue.path[0] as string] = issue.message;
      });
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      if (newErrors.name || newErrors.email || newErrors.username) {
        setActiveTab("account");
      }
      return; // Stop execution if validation fails
    }

    // Remove confirmPassword before sending request
    const { confirmPassword, ...dataToSend } = formData;
    
    setIsLoading(true);

    try {
      await api.post("/auth/register", dataToSend);
      toast.success("Account created successfully!");
      router.push("/login");
    } catch (error: unknown) {
      let message = "Something went wrong.";
      if (isAxiosError(error) && error.response?.data?.message) {
        message = error.response.data.message;
      }
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-full flex-col">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <Card className="shadow-none ring-0 py-0 bg-transparent border-0">
          <TabsContents className="py-6">
            <TabsContent value="account" className="flex flex-col gap-6">
              <CardHeader>
                <CardTitle>Account Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <TextField
                  name="name"
                  type="text"
                  isRequired
                  isInvalid={!!errors.name}
                  onChange={(val) => setFormData({ ...formData, name: val })}
                  value={formData.name}
                >
                  <Label>Name</Label>
                  <Input variant="secondary" placeholder="Ayush Bin" />
                  {errors.name && <FieldError>{errors.name}</FieldError>}
                </TextField>
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
                  name="username"
                  type="text"
                  isRequired
                  isInvalid={!!errors.username}
                  onChange={(val) =>
                    setFormData({ ...formData, username: val })
                  }
                  value={formData.username}
                >
                  <Label>Username</Label>
                  <Input variant="secondary" placeholder="username" />
                  {errors.username && <FieldError>{errors.username}</FieldError>}
                </TextField>
                <Button
                  className="w-full bg-primary text-primary-foreground"
                  onPress={handleNext}
                >
                  Next
                </Button>
              </CardContent>
            </TabsContent>
            <TabsContent value="password" className="flex flex-col gap-6">
              <CardHeader>
                <CardTitle>Password</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-6">
                <TextField
                  name="password"
                  isRequired
                  isInvalid={!!errors.password}
                  onChange={(val) =>
                    setFormData({ ...formData, password: val })
                  }
                  value={formData.password}
                >
                  <Label>Create Password</Label>
                  <InputGroup variant="secondary">
                    <InputGroup.Input
                      placeholder="Enter a password"
                      type={isCreateVisible ? "text" : "password"}
                    />
                    <InputGroup.Suffix className="pr-0">
                      <Button
                        isIconOnly
                        className="rounded-l-none text-default-400"
                        size="sm"
                        variant="ghost"
                        onPress={() => setIsCreateVisible(!isCreateVisible)}
                      >
                        {isCreateVisible ? (
                          <Eye className="size-4" />
                        ) : (
                          <EyeOff className="size-4" />
                        )}
                      </Button>
                    </InputGroup.Suffix>
                  </InputGroup>
                  {errors.password && <FieldError>{errors.password}</FieldError>}
                </TextField>
                <TextField
                  name="new_password"
                  isRequired
                  isInvalid={!!errors.confirmPassword}
                  onChange={(val) =>
                    setFormData({ ...formData, confirmPassword: val })
                  }
                  value={formData.confirmPassword}
                >
                  <Label>Confirm Password</Label>
                  <InputGroup variant="secondary">
                    <InputGroup.Input
                      placeholder="Re-enter password"
                      type={isConfirmVisible ? "text" : "password"}
                    />
                    <InputGroup.Suffix className="pr-0">
                      <Button
                        isIconOnly
                        className="rounded-l-none text-default-400"
                        size="sm"
                        variant="ghost"
                        onPress={() => setIsConfirmVisible(!isConfirmVisible)}
                      >
                        {isConfirmVisible ? (
                          <Eye className="size-4" />
                        ) : (
                          <EyeOff className="size-4" />
                        )}
                      </Button>
                    </InputGroup.Suffix>
                  </InputGroup>
                  {errors.confirmPassword && <FieldError>{errors.confirmPassword}</FieldError>}
                </TextField>

                <div className="flex items-center gap-2">
                  <Checkbox id="terms" defaultChecked />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>

                <Button
                  className="w-full bg-primary text-primary-foreground"
                  type="button"
                  onPress={onSubmit}
                  isPending={isLoading}
                  isDisabled={isLoading}
                >
                  Create Account
                </Button>
              </CardContent>
            </TabsContent>
          </TabsContents>
        </Card>
      </Tabs>

      <div className="flex flex-col items-center gap-2 mt-2">
        <Link className="text-sm" href="/login">
          Already have an account?{" "}
          <span className="text-primary ml-1 font-medium">Login</span>
        </Link>

        <span className="text-xs text-muted-foreground">
          Made with ❤️ by Ayush
        </span>
      </div>
    </div>
  );
}
