import query from "@/lib/queryApi";
import type { NextApiRequest, NextApiResponse } from "next";
import admin from "firebase-admin";
import { adminDb } from "@/firebaseAdmin";

type Data = {
  answer: string;
};

export async function POST(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { prompt, chatId, model, session } = req.body;

  console.log("prompt", prompt);

  if (!prompt) {
    return res.status(400).json({ answer: "prompt is required" });
  }
  if (!chatId) {
    return res.status(400).json({ answer: "chatId is required" });
  }

  // gpt query

  const response = await query(prompt, chatId, model);

  const message: Message = {
    text: response || "No response",
    createdAt: admin.firestore.Timestamp.now(),
    user: {
      _id: "gpt",
      name: "gpt",
      avatar: "/gpt.png",
    },
  };

  await adminDb
    .collection("users")
    .doc(session?.user?.email!)
    .collection("chats")
    .doc(chatId)
    .collection("messages")
    .add(message);

  return res.status(200).json({ answer: message.text });
}
