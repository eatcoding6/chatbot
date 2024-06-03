import { Sidebar } from "@/components/chat/Sidebar";
import { ReactNode } from "react";

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="md:flex h-full">
        {/* 사이드 바 영역 */}
        <div className="hidden md:block w-[300px]">
          <Sidebar />
        </div>
        {/* Header + chat 영역 */}
        <div></div>
      </div>
      {children}
    </>
  );
}
