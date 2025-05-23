import Link from "next/link";

// app/page.tsx (home)
export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-bold mb-4">Welcome to Reading List App</h1>
      <p className="text-gray-600 max-w-md text-center">
        Track your books easily. Log in to manage your reading list.
      </p>
      <Link href="/login">
        <button className="px-3 py-2 border rounded mt-2 cursor-pointer">
          Login
        </button>
      </Link>
    </main>
  );
}
