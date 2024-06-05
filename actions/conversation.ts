"use server";

import db from "@/db";
import { verifySession } from "./sessions";
import { conversation, message } from "@/db/schema";

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

  return result[0];
};
