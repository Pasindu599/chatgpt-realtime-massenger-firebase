"use client";
import React from "react";
import NewChat from "./NewChat";
import { signOut, useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firbase";
import { collection, orderBy, query } from "firebase/firestore";
import ChatRow from "./ChatRow";

function SideBar() {
  const { data: session } = useSession();

  const [chats, loading, error] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email!, "chats"),
        orderBy("createdAt", "asc")
      )
  );

  console.log(chats);

  return (
    <div className="p-2 flex flex-col h-screen">
      <div className="flex-1">
        {/* new chat  */}

        <NewChat />

        <div>{/* model selection */}</div>

        {chats?.docs.map((chat) => (
          <ChatRow key={chat.id} id={chat.id} />
        ))}
      </div>

      {session && (
        <button
          className="text-white border-white border"
          onClick={() => signOut()}
        >
          Log out
        </button>
      )}
    </div>
  );
}

export default SideBar;
