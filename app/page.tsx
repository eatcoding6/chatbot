export default async function Home() {
  const response = await fetch("http://localhost:3000/api/test", {
    next: { revalidate: 0 },
  });
  const data = await response.json();
  console.log("data", data);
  return <div>난 루트페이지</div>;
}
