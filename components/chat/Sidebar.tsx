import { MessageSquare, Plus } from "lucide-react";
import { Logo } from "./Logo";
import { BASE_URL, CHAT_ROUTES } from "@/constants/routes";
import { SidebarItem } from "./SidebarItem";
import { LogoutButton } from "./LogoutButton";

const DUMMY_ITEMS = [
  {
    id: "new",
    label: "새로운 대화",
    icon: <Plus />,
    href: BASE_URL,
  },
  {
    id: "1",
    label:
      "ㅇ라우라ㅜㅇ ㅑ뭉라 문앨 ㅜ암ㄴ루 ;ㅣ망눌 ㅣㅁㄴㅇ; ㅜ림ㄴ아ㅜㄹ ㅁ",
    icon: <MessageSquare />,
    href: `${CHAT_ROUTES.CONVERSATIONS}/1`,
  },
  {
    id: "2",
    label: "대화2",
    icon: <MessageSquare />,
    href: `${CHAT_ROUTES.CONVERSATIONS}/2`,
  },
];

export function Sidebar() {
  return (
    <nav className="h-full p-3 bg-black flex flex-col text-white">
      <div className="flex-1 overflow-y-auto">
        {/* 로고 영역 */}
        <Logo />
        {/* 메뉴 아이템 영역 */}
        <div className="flex flex-col gap-2 mt-10">
          {DUMMY_ITEMS.map((item) => (
            <SidebarItem key={item.id} item={item} />
          ))}
        </div>
      </div>
      {/* 로그아웃 버튼 영역 */}
      <div className="flex justify-center">
        <LogoutButton />
      </div>
    </nav>
  );
}
