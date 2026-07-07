import { Card, Button } from "@heroui/react";

export default function BottomNavigation() {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 w-full max-w-md -translate-x-1/2 px-4">
      <Card className="flex flex-row items-center justify-around py-2 px-1 shadow-lg bg-background/70 backdrop-blur-lg">
        <Button size="md" variant="primary" className="font-medium">
          Home
        </Button>
        <Button size="md" variant="ghost" className="font-medium">
          Habits
        </Button>
        <Button size="md" variant="ghost" className="font-medium">
          Tasks
        </Button>
        <Button size="md" variant="ghost" className="font-medium">
          Profile
        </Button>
      </Card>
    </div>
  );
}
