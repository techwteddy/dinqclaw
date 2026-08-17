import { db } from "~/server/clients/db";
import { AdminUsersTable } from "../_components/admin-users-table";

export default async function AdminUsersPage() {
  const users = await db.user.findMany({
    include: {
      instances: {
        select: { telegramChatId: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-[#E8A045] md:text-2xl">
          Users
        </h1>
        <p className="text-sm text-muted-foreground">
          All DinqClaw accounts ({users.length})
        </p>
      </div>
      <AdminUsersTable users={users} />
    </div>
  );
}
