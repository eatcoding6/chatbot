import { message, user } from "@/db/schema";

export type User = typeof user.$inferSelect;
export type TMessage = typeof message.$inferSelect;
