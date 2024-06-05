"use server";

import db from "@/db";
import { verifySession } from "./sessions";
import { conversation, message } from "@/db/schema";
import { revalidatePath } from "next/cache";
import { CHAT_ROUTES } from "@/constants/routes";

export const addMessages = async (
  conversationId: string,
  userContent: string,
  assistantContent: string
) => {
  await db.insert(message).values({
    conversationId,
    content: userContent,
    role: "user",
  });

  await db.insert(message).values({
    conversationId,
    content: assistantContent,
    role: "assistant",
  });

  revalidatePath(CHAT_ROUTES.CONVERSATIONS);
};

export const createConversation = async (name: string) => {
  const session = await verifySession();

  const result = await db
    .insert(conversation)
    .values({
      name,
      userId: session.id,
    })
    .returning();

  revalidatePath(CHAT_ROUTES.CONVERSATIONS);

  return result[0];
};
