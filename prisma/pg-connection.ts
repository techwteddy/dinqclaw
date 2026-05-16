import type { PoolConfig } from "pg";

/**
 * Supabase requires TLS. Avoid verify-full / verify-ca here — on Windows (and
 * behind some corporate proxies) that often fails with "self-signed certificate
 * in certificate chain" when using @prisma/adapter-pg (node-pg).
 */
export function normalizeDatabaseUrl(url: string): string {
  const parsed = new URL(url);

  if (shouldRelaxDatabaseSsl()) {
    // Prisma CLI + node-pg on Windows/dev: skip strict chain verification.
    parsed.searchParams.set("sslmode", "no-verify");
    return parsed.toString();
  }

  const sslmode = parsed.searchParams.get("sslmode");
  if (sslmode === "verify-full" || sslmode === "verify-ca") {
    parsed.searchParams.set("sslmode", "require");
  }

  if (!parsed.searchParams.has("sslmode")) {
    parsed.searchParams.set("sslmode", "require");
  }

  return parsed.toString();
}

/** Relaxed TLS for local dev / Windows unless explicitly disabled. */
export function shouldRelaxDatabaseSsl(): boolean {
  if (process.env.DATABASE_SSL_RELAXED === "true") return true;
  if (process.env.DATABASE_SSL_RELAXED === "false") return false;
  return process.env.NODE_ENV !== "production";
}

export function getPgPoolConfig(databaseUrl: string): PoolConfig {
  const connectionString = normalizeDatabaseUrl(databaseUrl);
  const config: PoolConfig = { connectionString };

  if (shouldRelaxDatabaseSsl()) {
    config.ssl = { rejectUnauthorized: false };
  }

  return config;
}
