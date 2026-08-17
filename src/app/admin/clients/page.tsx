import { db } from "~/server/clients/db";
import { AdminUsersTable } from "../_components/admin-users-table";
import { AssignDinqIdForm } from "./assign-dinq-id-form";

export default async function AdminClientsPage() {
  const clients = await db.user.findMany({
    where: { dinqId: { not: null } },
    include: {
      instances: {
        select: { telegramChatId: true },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-[#E8A045] md:text-2xl">
          Clients
        </h1>
        <p className="text-sm text-muted-foreground">
          Users with a Dinq ID assigned ({clients.length})
        </p>
      </div>
      <AdminUsersTable users={clients} />
      <AssignDinqIdForm />
    </div>
  );
}
