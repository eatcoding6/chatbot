export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      나는 대시보드 레이아웃
      {children}
    </>
  );
}
