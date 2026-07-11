import { Card } from "@heroui/react";
import { Hexagon } from "lucide-react";
import { ReactNode } from "react";

interface AuthCardProps {
  title: string;
  description?: string;
  children: ReactNode;
}

export default function AuthCard({
  title,
  description,
  children,
}: AuthCardProps) {
  return (
    <Card className="w-full max-w-md p-6">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">{title}</h1>

          {description && (
            <p className="mt-2 text-sm text-default-500">
              {description}
            </p>
          )}
        </div>
      </div>

      {children}
    </Card>
  );
}