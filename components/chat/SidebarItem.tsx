"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import {
  ReactNode,
  useState,
  MouseEvent,
  ChangeEvent,
  KeyboardEvent,
  useRef,
  useEffect,
} from "react";
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
import toast from "react-hot-toast";
import { updateConversation } from "@/actions/conversation";

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
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(item.label);

  const inputRef = useRef<HTMLInputElement>(null);

  const setOpen = useSheetStore((state) => state.setOpen);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      await handleBlur();
    }
  };

  const handleBlur = async () => {
    setIsEditMode(false);
    if (value !== label) {
      try {
        await updateConversation(id, value);
      } catch (error) {
        console.error(error);
        toast.error("이름 수정을 실패했습니다.");
      }
    }
  };

  const clickEdit = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsEditMode(true);
    setIsMenuOpen(false);
  };

  const clickMenu = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isEditMode && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditMode]);

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
          {icon}{" "}
          {isEditMode ? (
            <input
              ref={inputRef}
              value={value}
              onChange={handleChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              onClick={(event) => event.preventDefault()}
              className="bg-transparent border border-zinc-400 rounded-lg px-2 py-1 "
            />
          ) : (
            <div className="w-[180px] truncate">{label}</div>
          )}
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
              <DropdownMenuItem className="gap-2" onClick={clickEdit}>
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
