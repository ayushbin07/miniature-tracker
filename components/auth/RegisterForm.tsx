"use client";
import {
  Button,
  Form,
  Input,
  InputGroup,
  Label,
  TextField,
  Link,
} from "@heroui/react";
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

export default function RegisterForm() {
  const [activeTab, setActiveTab] = useState("account");
  const [isCreateVisible, setIsCreateVisible] = useState(false);
  const [isConfirmVisible, setIsConfirmVisible] = useState(false);

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
                <TextField name="name" type="text" isRequired>
                  <Label>Name</Label>
                  <Input variant="secondary" placeholder="Ayush Bin" />
                </TextField>
                <TextField name="email" type="email" isRequired>
                  <Label>Email</Label>
                  <Input variant="secondary" placeholder="you@example.com" />
                </TextField>
                <TextField name="username" type="text" isRequired>
                  <Label>Username</Label>
                  <Input variant="secondary" placeholder="username" />
                </TextField>
                <Button
                  className="w-full bg-accent"
                  onPress={() => setActiveTab("password")}
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
                <TextField name="password" isRequired>
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
                        variant="light"
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
                </TextField>
                <TextField name="new_password" isRequired>
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
                        variant="light"
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
                </TextField>

                <div className="flex items-center gap-2">
                  <Checkbox id="terms" defaultChecked />
                  <Label htmlFor="terms">Accept terms and conditions</Label>
                </div>

                <Button className="w-full bg-accent" type="submit">
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
