import moment from "moment";

type AdminUserRow = {
  id: string;
  name: string;
  email: string;
  dinqId: string | null;
  createdAt: Date;
  instances: { telegramChatId: string | null }[];
};

export function AdminUsersTable({ users }: { users: AdminUserRow[] }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-border/40">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="border-b border-border/40 bg-white/5 text-muted-foreground">
          <tr>
            <th className="px-3 py-2 font-medium md:px-4">Name</th>
            <th className="px-3 py-2 font-medium md:px-4">Email</th>
            <th className="px-3 py-2 font-medium md:px-4">Dinq ID</th>
            <th className="px-3 py-2 font-medium md:px-4">Telegram</th>
            <th className="px-3 py-2 font-medium md:px-4">Joined</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                className="px-3 py-8 text-center text-muted-foreground md:px-4"
              >
                No users found
              </td>
            </tr>
          ) : (
            users.map((user) => {
              const telegramChatId = user.instances[0]?.telegramChatId;
              return (
                <tr
                  key={user.id}
                  className="border-b border-border/20 last:border-0"
                >
                  <td className="px-3 py-2.5 md:px-4">{user.name}</td>
                  <td className="px-3 py-2.5 md:px-4">{user.email}</td>
                  <td className="px-3 py-2.5 font-mono text-xs md:px-4">
                    {user.dinqId ?? "Not set"}
                  </td>
                  <td className="px-3 py-2.5 md:px-4">
                    {telegramChatId ? "✅ Connected" : "❌ Not linked"}
                  </td>
                  <td className="px-3 py-2.5 text-muted-foreground md:px-4">
                    {moment(user.createdAt).format("MMM D, YYYY")}
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
}
