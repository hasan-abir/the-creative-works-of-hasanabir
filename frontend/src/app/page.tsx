import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8">
      <div className="max-w-5xl w-full">
        <h1 className="font-bold text-xl">Home</h1>
        <br />
        <Link href="/stories" className="underline">
          Go to Stories
        </Link>
      </div>
    </main>
  );
}
