import Link from "next/link";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "~/server/auth";
import { isAdmin } from "~/lib/is-admin";

const NAV_LINKS = [
  { href: "/admin/users", label: "Users" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/admin/activity", label: "Activity" },
] as const;

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session || !isAdmin(session.user.email)) {
    redirect("/dashboard");
  }

  return (
    <div className="dark flex min-h-screen bg-[#010812] text-foreground">
      <aside className="flex w-56 shrink-0 flex-col border-r border-border/40 bg-[#010812] p-4 md:w-64">
        <Link
          href="/admin/users"
          className="mb-6 text-lg font-semibold text-[#E8A045]"
        >
          DinqClaw Admin
        </Link>
        <nav className="flex flex-col gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-[#E8A045]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/dashboard"
          className="mt-auto px-3 py-2 text-xs text-muted-foreground hover:text-[#E8A045]"
        >
          ← Back to dashboard
        </Link>
      </aside>
      <main className="min-w-0 flex-1 overflow-x-auto p-4 md:p-8">
        {children}
      </main>
    </div>
  );
}
