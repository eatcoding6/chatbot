export default function LoginLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      로그인 레이아웃
      {children}
    </>
  );
}
