
import { Avatar, Card, Button, CloseButton } from "@heroui/react";

const DashBoardPage = () => {
  return (
    <div className="mx-20 m-auto">
      <Card className="w-full items-stretch md:flex-row">
             <div className="relative h-[140px] w-full shrink-0 overflow-hidden rounded-2xl sm:h-[120px] sm:w-[120px]">
                  <Avatar className="size-[56px] rounded-xl">
                    <Avatar.Image
                      alt="Demo 1"
                      src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg"
                    />
                    <Avatar.Fallback>JK</Avatar.Fallback>
                  </Avatar>
      </div>
      <div className="flex flex-1 flex-col gap-3">
        <Card.Header className="gap-1">
          <Card.Title className="pr-8">Hello World!</Card.Title>
          <Card.Description>
This is our project Vimars.
          </Card.Description>
        </Card.Header>
        <Card.Footer className="mt-auto flex w-full flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col">
            <span className="text-sm font-medium text-foreground">Only 10 spots</span>
          </div>
          <Button className="w-full sm:w-auto">Use Vimars Now</Button>
        </Card.Footer>
      </div>

      </Card>
    </div>
  )
}

export default DashBoardPage