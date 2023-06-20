import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import { migrate } from "drizzle-orm/libsql/migrator";

const client = createClient({ url: "file:db/dev.db" });

const db = drizzle(client);

migrate(db, { migrationsFolder: "./db/migrations" }).then(() =>
  console.log("migrations complete")
);
