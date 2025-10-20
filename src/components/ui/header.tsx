import * as React from "react";

import { cn } from "@/lib/utils";

type HeaderProps = React.ComponentProps<"header"> & {
  className?: string;
};

function Header({ className, ...props }: HeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between w-full h-16 px-4 mb-8 bg-neutral-200",
        className
      )}
      {...props}
    >
      <h1 className="text-gradient-warm heading-md font-bold">
        I&apos;m Easy, but...
      </h1>
    </header>
  );
}

export default Header;
