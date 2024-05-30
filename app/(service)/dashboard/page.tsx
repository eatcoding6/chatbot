import { Suspense } from "react";
import { Box } from "./components/Box";

export default async function DashboardPage() {
  const response = await fetch("http://localhost:3000/api/test", {
    next: { revalidate: 0 },
  });
  const data = await response.json();
  console.log("data", data);
  return (
    <>
      대시보드 페이지에요
      <Suspense fallback={<div>로딩중1</div>}>
        <Box />
      </Suspense>
      <Suspense fallback={<div>로딩중2</div>}>
        <Box />
      </Suspense>
      <Suspense fallback={<div>로딩중3</div>}>
        <Box />
      </Suspense>
      <Suspense fallback={<div>로딩중4</div>}>
        <Box />
      </Suspense>
    </>
  );
}
