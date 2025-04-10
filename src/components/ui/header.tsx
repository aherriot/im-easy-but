import * as React from "react";

import { cn } from "@/lib/utils";

type HeaderProps = React.ComponentProps<"header"> & {
  className?: string;
};

function Header({ className, ...props }: HeaderProps) {
  return (
    <header
      className={cn(
        "flex items-center justify-between w-full h-16 px-4 bg-gray-800 text-white",
        className
      )}
      {...props}
    >
      Picky Picky
    </header>
  );
}

export default Header;
