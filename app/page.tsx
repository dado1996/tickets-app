import Link from "next/link";
import { auth0 } from "../lib/auth0"; // Adjust path if your auth0 client is elsewhere

export default async function Home() {
  const session = await auth0.getSession();

  if (!session) {
    return (
      <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-6">
        <div className="space-y-4 text-center">
          <h1 className="text-4xl font-bold">Welcome to My Ticket App</h1>
          <p className="text-slate-500">Please login to continue</p>
        </div>
        <div className="mt-8 flex items-center space-x-4">
          <a
            className="rounded bg-slate-900 px-4 py-2 font-bold text-white transition-colors hover:bg-slate-700"
            href="/auth/login?screen_hint=signup"
          >
            Sign up
          </a>
          <a
            className="rounded bg-slate-900 px-4 py-2 font-bold text-white transition-colors hover:bg-slate-700"
            href="/auth/login"
          >
            Log in
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto flex min-h-screen flex-col items-center justify-center p-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome, {session.user.name}!</h1>
        <p className="text-slate-600">You can view your tickets or log out.</p>
      </div>
      <Link
        href="/tickets"
        className="rounded bg-slate-900 px-6 py-2 font-bold text-white transition-colors hover:bg-slate-700"
      >
        Tickets
      </Link>
      <a
        href="/auth/logout"
        className="font-medium text-slate-500 transition-colors hover:text-red-500 hover:underline"
      >
        Logout
      </a>
    </main>
  );
}
