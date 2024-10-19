"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessage, fetchMessages } from "@/lib/store/features/message-slice";
import { AppDispatch, RootState } from "@/lib/store";
import { setWorkSpaceId } from "@/lib/store/features/workspace-slice";

export default function MessageInput() {
  const dispatch = useDispatch<AppDispatch>();
  const { workSpaceId }: { workSpaceId: string } = useSelector(
    (state: RootState) => state.workspace
  );
  const [text, setText] = useState("");
  const [rows, setRows] = useState(1);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(setWorkSpaceId(workSpaceId));
      await dispatch(addMessage(text));
      dispatch(fetchMessages());
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
