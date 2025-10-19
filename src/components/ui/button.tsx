import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ComponentProps<"button">;

function Button({ className, ...props }: ButtonProps) {
  return <button className={cn("", className)} {...props} />;
}

export { Button };
