export const ADMIN_EMAIL = "techwithteddy@gmail.com";

export function isAdmin(email: string | null | undefined): boolean {
  return email === ADMIN_EMAIL;
}
