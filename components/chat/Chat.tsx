"use client";

import { ArrowUp } from "lucide-react";
import { useChat, Message as TMessage } from "ai/react";
import { Button } from "../ui/button";
import { Empty } from "./Empty";
import { Message } from "./Message";
import { AutoResizingTextarea } from "./AutoResizingTextarea";
import { FormEvent, useEffect, useRef, useState } from "react";
import { DUMMY_LONG_TEXT } from "@/constants/dummy";
import { useParams, useRouter } from "next/navigation";
import { addMessages, createConversation } from "@/actions/conversation";
import { CHAT_ROUTES } from "@/constants/routes";

type Props = {
  initialMessages?: TMessage[];
};

export function Chat({ initialMessages }: Props) {
  const router = useRouter();
  const params = useParams<{ conversationId: string }>();

  const { messages, setMessages, input, handleInputChange, handleSubmit } =
    useChat({
      onFinish: async (message) => {
        // param -> conversationId 가 없으면
        if (!params.conversationId) {
          // 1. create conversation
          const conversation = await createConversation(message.name ?? input);
          // 2. add messages
          await addMessages(conversation.id, input, message.content);

          router.push(`${CHAT_ROUTES.CONVERSATIONS}/${conversation.id}`);
          // param -> conversationId 가 있으면
        } else {
          // 1. add messages
          await addMessages(params.conversationId, input, message.content);
        }
      },
    });
  const scrollRef = useRef<HTMLDivElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.stopPropagation();
    handleSubmit(e);
  };

  useEffect(() => {
    if (initialMessages) {
      setMessages(initialMessages);
    }
  }, []);

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
