import { MobileMenu } from "./MobileMenu";

export function Header() {
  return (
    <header className="flex items-center">
      {/* 모바일 메뉴 영역 */}
      <MobileMenu />
      {/* 모델 선택 영역 */}
      <div>모델 선택영역</div>
    </header>
  );
}
