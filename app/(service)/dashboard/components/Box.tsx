export async function Box() {
  const response = await fetch("http://localhost:3000/api/test", {
    next: { revalidate: 0 },
  });
  const data = await response.json();
  console.log("data", data);
  return <div className="w-10 h-10 border-1">박스</div>;
}
