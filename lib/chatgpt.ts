import { OpenAI } from "openai";
import Configuration from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "DEFAULT_API_KEY",
});

export default openai;
