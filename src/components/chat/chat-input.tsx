import React, { useState } from "react";
import { useMessageContext } from "@/contexts/message-context";

export default function MessageInput() {
  const [text, setText] = useState("");
  const [rows, setRows] = useState(1);
  const { addMessage } = useMessageContext();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addMessage(text);
      setText("");
    }
  };

  const handleFocus = () => {
    setRows(3);
  };

  const handleBlur = () => {
    if (!text.trim()) {
      setRows(1);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex p-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Type your message..."
        className="flex-grow p-2 border rounded-l-md resize-none"
        rows={rows}
      />
      <button
        type="submit"
        className="p-2 bg-purple-500 text-white rounded-r-md"
      >
        Send
      </button>
    </form>
  );
}
