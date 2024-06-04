"use client";

import { TextareaHTMLAttributes, useEffect, useRef } from "react";
import { Textarea } from "../ui/textarea";
import { cn } from "@/lib/utils";

export function AutoResizingTextarea({
  className,
  value,
  ...others
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "inherit";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);

  return (
    <Textarea
      value={value}
      className={cn("min-h-[20px] max-h-[200px]")}
      ref={textareaRef}
      {...others}
    />
  );
}
