import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { memoryAdapter } from "@better-auth/memory-adapter";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import connectDB from "../db";

const useMemoryAdapter =
  process.env.AUTH_DEV_MEMORY_DB === "true" &&
  process.env.NODE_ENV === "development";

const memoryDb = {
  user: [],
  session: [],
  account: [],
  verification: [],
};

let client: any = null;
let db: any = null;

if (!useMemoryAdapter) {
  const mongooseInstance = await connectDB();
  client = mongooseInstance.connection.getClient();
  db = client.db();
}

const database = useMemoryAdapter
  ? memoryAdapter(memoryDb)
  : mongodbAdapter(db, {
      client,
    });

export const auth = betterAuth({
  database,
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 60 * 60,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
});

export async function getSession() {
  try {
    const result = await auth.api.getSession({
      headers: await headers(),
    });

    return result;
  } catch (error) {
    console.error("[Auth] Failed to get session", error);
    return null;
  }
}

export async function signOut() {
  const result = await auth.api.signOut({
    headers: await headers(),
  });

  if (result.success) {
    redirect("/sign-in");
  }
}