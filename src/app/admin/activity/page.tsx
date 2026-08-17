import moment from "moment";
import { db } from "~/server/clients/db";

function messagePreview(content: unknown): string {
  if (typeof content === "string") {
    return content.slice(0, 160);
  }

  if (Array.isArray(content)) {
    const texts: string[] = [];
    for (const part of content) {
      if (
        typeof part === "object" &&
        part !== null &&
        "type" in part &&
        part.type === "text" &&
        "text" in part &&
        typeof part.text === "string"
      ) {
        texts.push(part.text);
      }
    }
    if (texts.length > 0) {
      return texts.join(" ").slice(0, 160);
    }
  }

  try {
    return JSON.stringify(content).slice(0, 160);
  } catch {
    return "(unreadable)";
  }
}

export default async function AdminActivityPage() {
  const [totalUsers, telegramConnected, totalMessages, recentMessages] =
    await Promise.all([
      db.user.count(),
      db.composioClawInstance.count({
        where: { telegramChatId: { not: null } },
      }),
      db.message.count(),
      db.message.findMany({
        take: 10,
        orderBy: { createdAt: "desc" },
        include: {
          instance: {
            include: {
              user: { select: { name: true, email: true } },
            },
          },
        },
      }),
    ]);

  const stats = [
    { label: "Total users", value: totalUsers },
    { label: "Telegram connected", value: telegramConnected },
    { label: "Total messages", value: totalMessages },
  ] as const;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-[#E8A045] md:text-2xl">
          Activity
        </h1>
        <p className="text-sm text-muted-foreground">System-wide stats</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-border/40 bg-white/5 p-4"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-2xl font-semibold text-[#E8A045]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h2 className="text-base font-medium">Recent messages</h2>
        <div className="overflow-x-auto rounded-lg border border-border/40">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border/40 bg-white/5 text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium md:px-4">User</th>
                <th className="px-3 py-2 font-medium md:px-4">Role</th>
                <th className="px-3 py-2 font-medium md:px-4">Source</th>
                <th className="px-3 py-2 font-medium md:px-4">Preview</th>
                <th className="px-3 py-2 font-medium md:px-4">When</th>
              </tr>
            </thead>
            <tbody>
              {recentMessages.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    className="px-3 py-8 text-center text-muted-foreground md:px-4"
                  >
                    No messages yet
                  </td>
                </tr>
              ) : (
                recentMessages.map((msg) => (
                  <tr
                    key={msg.id}
                    className="border-b border-border/20 last:border-0"
                  >
                    <td className="px-3 py-2.5 md:px-4">
                      <div>{msg.instance.user.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {msg.instance.user.email}
                      </div>
                    </td>
                    <td className="px-3 py-2.5 capitalize md:px-4">
                      {msg.role}
                    </td>
                    <td className="px-3 py-2.5 capitalize md:px-4">
                      {msg.source}
                    </td>
                    <td className="max-w-xs truncate px-3 py-2.5 text-muted-foreground md:px-4">
                      {messagePreview(msg.content)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-2.5 text-muted-foreground md:px-4">
                      {moment(msg.createdAt).format("MMM D, YYYY h:mm A")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
