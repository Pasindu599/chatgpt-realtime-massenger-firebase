"use client";
import React, { use } from "react";
import { useSession } from "next-auth/react";
import { query } from "firebase/firestore";
import { collection, orderBy } from "firebase/firestore";
import { db } from "@/firbase";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { ArrowDownCircleIcon } from "@heroicons/react/24/outline";

type Props = {
  chatId: string;
};

function Chat({ chatId }: Props) {
  const { data: session } = useSession();

  const [messages] = useCollection(
    session &&
      query(
        collection(
          db,
          "users",
          session?.user?.email!,
          "chats",
          chatId,
          "messages"
        ),
        orderBy("createdAt")
      )
  );

  return (
    <div className="flex-1 overflow-y-auto">
      {messages?.empty && (
        <>
          <p className="mt-10 text-center text-white">
            Type a prompt in below to get started
          </p>
          <ArrowDownCircleIcon className=" h-10 w-10 text-white mx-auto mt-5 animate-bounce" />
        </>
      )}
      {messages?.docs.map((message) => (
        <Message key={message.id} message={message.data()}></Message>
      ))}
    </div>
  );
}

export default Chat;
