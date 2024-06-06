"use client";

import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Sidebar } from "./Sidebar";
import { useSheetStore } from "@/stores/sheet";
import { ReactNode } from "react";

export function MobileMenu({ children }: { children: ReactNode }) {
  const { open, setOpen } = useSheetStore((state) => ({
    open: state.open,
    setOpen: state.setOpen,
  }));

  return (
    <div className="md:hidden">
      <Sheet open={open} onOpenChange={(open) => setOpen(open)}>
        <SheetTrigger asChild>
          <Menu />
        </SheetTrigger>
        <SheetContent side="left" className="p-0">
          {children}
        </SheetContent>
      </Sheet>
    </div>
  );
}
