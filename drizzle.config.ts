import type { Config } from "drizzle-kit";

export default {
  schema: "./db/schema.ts",
  dbCredentials: { url: process.env.DB_URL || "file:db/dev.db" },
  out: "./db/migrations",
  breakpoints: true,
} satisfies Config;
