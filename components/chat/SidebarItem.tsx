"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode, useState, MouseEvent } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { usePathname } from "next/navigation";
import { useModelStore } from "@/stores/model";
import { useSheetStore } from "@/stores/sheet";

type Props = {
  item: {
    id: string;
    href: string;
    icon: ReactNode;
    label: string;
  };
};

export function SidebarItem({ item }: Props) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const setOpen = useSheetStore((state) => state.setOpen);

  const clickMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    setIsMenuOpen((prev) => !prev);
  };

  const { id, href, icon, label } = item;
  return (
    <Link href={href} scroll={false}>
      <div
        className={cn(
          "flex items-center justify-between p-3 text-sm group hover:text-white hover:bg-white/10 rounded-lg",
          isMenuOpen || pathname === href
            ? "text-white bg-white/10"
            : "text-zinc-400"
        )}
        onClick={() => setOpen(false)}
      >
        {/* 아이콘 label 영역 */}
        <div className="flex items-center gap-2">
          {icon} <div className="w-[180px] truncate">{label}</div>
        </div>
        {/* 드롭다운메뉴 영역 */}
        {id !== "new" && (
          <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <DropdownMenuTrigger asChild>
              <div onClick={clickMenu}>
                <Ellipsis
                  className={cn(
                    "group-hover:block text-gray-400 hover:text-white",
                    isMenuOpen ? "block" : "md:hidden"
                  )}
                />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem className="gap-2">
                <Pencil size={18} />
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-2">
                <Trash size={18} />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
    </Link>
  );
}
