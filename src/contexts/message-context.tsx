"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios, { AxiosError } from "axios";
import { useUser } from "./user-context";
import { useWorkSpaceContext } from "./workspace-context";

type Message = {
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

type MessageContextType = {
  messages: Message | null;
  addMessage: (text: string) => void;
  deleteMessage: (id: string) => void;
  error: boolean;
  isOnline: boolean;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const [messages, setMessages] = useState<Message | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [trigger, setTrigger] = useState<boolean>(false);
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== "undefined" ? navigator.onLine : true
  );
  const { loggedUser } = useUser();
  const {workSpaceId} = useWorkSpaceContext()

  setInterval(()=>{
    setTrigger(!trigger)
  },60000)


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
    if (workSpaceId && loggedUser?.token) {
      const fetchData = async () => {
        try {
          const {data} = await axios.get(
            `https://daily-grid-rest-api.onrender.com/api/chat/workspaces/${workSpaceId}/messages`,
            {
              headers: {
                Authorization: `Bearer ${loggedUser?.token}`,
              },
            }
          );          
          setMessages(data.data);
        } catch (err) {
          if (err instanceof AxiosError && err.status === 404)
            return setMessages(null);
          setError(true);
          console.log(err);
        }
      };
      fetchData();
    }
  }, [trigger, isOnline,workSpaceId,loggedUser?.token]);

  const addMessage = async (text: string) => {
    try {
      await axios.post(
        `https://daily-grid-rest-api.onrender.com/api/chat/workspaces/${workSpaceId}/messages`,
        { content: text },
        {
          headers: {
            Authorization: `Bearer ${loggedUser?.token}`,
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
            Authorization: `Bearer ${loggedUser?.token}`,
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
