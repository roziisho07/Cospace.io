"use server";

import { CoreMessage } from "ai";

export async function continueConversation(messages: CoreMessage[]) {
  const formattedMessages = messages.map((msg) => ({
    role: msg.role,
    content: msg.content,
  }));

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: formattedMessages,
      }),
    }
  );

  const data = await response.json();

  const generatedText =
    data?.result?.response || "Sorry, I couldn’t generate a response.";

  return generatedText.trim();
}
