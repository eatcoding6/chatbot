ALTER TABLE "conversation" DROP CONSTRAINT "conversation_userId_user_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "conversation" ADD CONSTRAINT "conversation_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
