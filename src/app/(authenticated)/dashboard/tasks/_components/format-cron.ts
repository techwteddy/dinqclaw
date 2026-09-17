const DAY_NAMES: Record<string, string> = {
  "0": "Sunday",
  "1": "Monday",
  "2": "Tuesday",
  "3": "Wednesday",
  "4": "Thursday",
  "5": "Friday",
  "6": "Saturday",
};

export function formatCronExpression(expression: string): string {
  const parts = expression.split(" ");
  if (parts.length !== 5) return expression;

  const minute = parts[0] ?? "0";
  const hour = parts[1] ?? "*";
  const dayOfMonth = parts[2] ?? "*";
  const month = parts[3] ?? "*";
  const dayOfWeek = parts[4] ?? "*";

  if (dayOfMonth === "*" && month === "*" && dayOfWeek === "*") {
    if (minute === "0" && hour === "*") return "Every hour";
    if (hour === "*") return `Every hour at :${minute.padStart(2, "0")}`;
    return `Daily at ${hour}:${minute.padStart(2, "0")}`;
  }

  if (dayOfWeek !== "*" && dayOfMonth === "*" && month === "*") {
    const dayName = DAY_NAMES[dayOfWeek] ?? dayOfWeek;
    return `Every ${dayName} at ${hour}:${minute.padStart(2, "0")}`;
  }

  return expression;
}
