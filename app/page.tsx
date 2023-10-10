"use client";
import axios from "axios";
import { useChat } from "ai/react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import ContentBubble from "@/components/ui/contentbubble";

export default function Chat() {
  const [data, setData] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getDataFromServer();
  }, []);

  const { messages, input, handleInputChange, handleSubmit, stop, isLoading } =
    useChat({
      body: { texts: data },
    });

  function getDataFromServer() {
    console.log("program running");
    axios
      .get("/api/readfile", {})
      .then((res) => {
        setData(res.data.texts);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    } as ScrollIntoViewOptions);
  }, [messages]);

  return (
    <div className="mx-auto min-h-screen max-w-4xl px-3 pb-36 pt-4 flex flex-col gap-3 border-2 justify-center">
      {messages.map((m) => (
        <div key={m.id} className="flex flex-col">
          {m.role === "user" ? (
            <ContentBubble variant="user" content={m.content} />
          ) : (
            <ContentBubble variant="ai" content={m.content} />
          )}
        </div>
      ))}
      <div ref={bottomRef}></div>

      <form onSubmit={handleSubmit}>
        <div className="fixed max-w-4xl flex items-end  gap-2 bottom-0 mb-3">
          <Textarea
            placeholder="Type your message here."
            value={input}
            onChange={handleInputChange}
            disabled={isLoading}
          />
          {isLoading ? (
            <Button onClick={stop}>Stop</Button>
          ) : (
            <Button type="submit">Send</Button>
          )}
        </div>
      </form>
    </div>
  );
}
