"use client";

import { ArrowUp } from "lucide-react";
import { useChat } from "ai/react";
import { Button } from "../ui/button";
import { Empty } from "./Empty";
import { Message } from "./Message";
import { AutoResizingTextarea } from "./AutoResizingTextarea";
import { FormEvent, useEffect, useRef, useState } from "react";
import { DUMMY_LONG_TEXT } from "@/constants/dummy";
import { useParams, useRouter } from "next/navigation";
import { addMessages, createConversation } from "@/actions/conversation";
import { CHAT_ROUTES } from "@/constants/routes";

const EMPTY_DUMMY = [];
const MESSAGE_DUMMY = [
  { id: "1", content: "더미데이터1", role: "user" },
  { id: "2", content: "더미데이터2", role: "assistant" },
  { id: "3", content: "더미데이터3", role: "user" },
  { id: "4", content: DUMMY_LONG_TEXT, role: "assistant" },
];
export function Chat() {
  const router = useRouter();
  const params = useParams<{ conversationsId: string }>();

  const { messages, input, handleInputChange, handleSubmit } = useChat({
    onFinish: async (message) => {
      // param -> conversationId 가 없으면
      if (!params.conversationsId) {
        // 1. create conversation
        const conversation = await createConversation(message.name ?? input);
        // 2. add messages
        await addMessages(conversation.id, input, message.content);

        router.push(`${CHAT_ROUTES.CONVERSATIONS}/${conversation.id}`);
        // param -> conversationId 가 있으면
      } else {
        // 1. add messages
        await addMessages(params.conversationsId, input, message.content);
      }
    },
  });
  const scrollRef = useRef<HTMLDivElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    handleSubmit(e);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex flex-col w-[80%] h-full mx-auto">
      {/* 채팅영역 */}
      <div className="flex-1">
        {messages.length === 0 ? (
          <Empty />
        ) : (
          <>
            {messages.map((message) => (
              <Message
                key={message.id}
                name={"user"}
                content={message.content}
                role={message.role}
              />
            ))}
          </>
        )}
      </div>
      {/* input 영역 */}
      <div className="sticky bottom-0 bg-white pb-5">
        <form
          onSubmit={onSubmit}
          className="flex items-center justify-center gap-4"
        >
          <AutoResizingTextarea value={input} onChange={handleInputChange} />
          <Button type="submit" size="icon">
            <ArrowUp />
          </Button>
        </form>
      </div>
      <div ref={scrollRef} />
    </div>
  );
}
