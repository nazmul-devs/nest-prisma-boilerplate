import * as dotenv from 'dotenv';

// .env ফাইলটি লোড করুন
dotenv.config();
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "src/database/schema.prisma",
  migrations: {
    path: "src/database/migrations",
    seed: "pnpm exec tsx src/database/seed.ts",
  },
  datasource: {
    url: process.env["DATABASE_URL"] || "",
  },
});
