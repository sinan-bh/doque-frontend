"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios, { AxiosError } from "axios";

type Message = {
  data: {
    _id: string;
    messages: [
      {
        content: string;
        timestamp: string;
        _id: string;
        sender: {
          firstName: string;
          image: string;
        };
      }
    ];
  };
};

type MessageContextType = {
  messages: Message | null;
  addMessage: (text: string) => void;
  deleteMessage: (id: string) => void;
  error: boolean;
  isOnline: boolean;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MDc3OWExNDQ0MGIwYmE1NzZmNDEzNyIsImlhdCI6MTcyODY0NjY3MSwiZXhwIjoxNzMxMjM4NjcxfQ.VStN3qS9yVvPguDGBtRVNnQXd416r3OPVXI0AniSaAA";

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    setError(false);
    if (!isOnline) return;

    const fetchData = async () => {
      try {
        const workspaceId = "6707881d4440b0ba576f4162";
        const response = await axios.get(
          `https://daily-grid-rest-api.onrender.com/api/chat/workspaces/${workspaceId}/messages`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessages(response.data);
      } catch (err) {
        if (err instanceof AxiosError && err.status === 404)
          return setMessages(null);
        setError(true);
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [trigger, isOnline]);

  const addMessage = async (text: string) => {
    try {
      const workspaceId = "6707881d4440b0ba576f4162";
      await axios.post(
        `https://daily-grid-rest-api.onrender.com/api/chat/workspaces/${workspaceId}/messages`,
        { content: text },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTrigger(!trigger);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteMessage = async (id: string) => {
    try {
      await axios.delete(
        `https://daily-grid-rest-api.onrender.com/api/chat/workspaces/${id}/chat`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessages(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MessageContext.Provider
      value={{ messages, addMessage, deleteMessage, error, isOnline }}
    >
      {children}
    </MessageContext.Provider>
  );
};

export const useMessageContext = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessageContext must be used within a MessageProvider");
  }
  return context;
};
