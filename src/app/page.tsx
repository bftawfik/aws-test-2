import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>{process.env.NEXT_PUBLIC_ANALYTICS_ID}</div>
      <div>Hello from Home page</div>
      <Link href={"/page2"}>Page2</Link>
    </main>
  );
}
