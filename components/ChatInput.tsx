"use client";
import { PaperAirplaneIcon } from "@heroicons/react/16/solid";
import React from "react";
import { useSession } from "next-auth/react";
import { serverTimestamp } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/firbase";
import toast from "react-hot-toast";

type Props = {
  chatId: string;
};

function ChatInput({ chatId }: Props) {
  const [prompt, setPrompt] = React.useState("");
  const { data: session } = useSession();

  //   usesWR to get model

  const model = "gpt-3.5-turbo";

  const sendMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!prompt) return;
    const input = prompt.trim();
    setPrompt("");
    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: session?.user?.email!,
        name: session?.user?.name!,
        avatar: session?.user?.image! || "",
      },
    };

    await addDoc(
      collection(
        db,
        "users",
        session?.user?.email!,
        "chats",
        chatId,
        "messages"
      ),
      message
    );

    // toast

    const notification = toast.loading("Chat gpt thinking");

    await fetch("api/askQuestion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: input,
        chatId,
        model,
        session,
      }),
    }).then(() => {
      // toast notification
      toast.success("Chat gpt has replied", { id: notification });
    });
  };

  return (
    <div className="bg-gray-700/50 text-gray-400 rounded-lg text-s">
      <form onSubmit={sendMessage} className="p-5 space-x-5 flex">
        <input
          className="m focus:ouline-none bg-transparent outline-none flex-1 disabled:cursor-not-allowed disabled:text-gray-300"
          disabled={!session}
          value={prompt}
          type="text"
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your message"
        />
        <button
          type="submit"
          disabled={!prompt || !session}
          className="bg-[#11A37F] hover:opacity-50 text-white font-bold px-4 py-2 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <PaperAirplaneIcon className="h-5 w-5 -rotate-45" />
        </button>
      </form>

      <div>{/* model selection   */}</div>
    </div>
  );
}

export default ChatInput;
