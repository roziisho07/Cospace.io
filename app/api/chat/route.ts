// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.ACCOUNT_ID}/ai/run/@cf/meta/llama-3-8b-instruct`, // or another supported model
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CLOUDFLARE_AI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: [
          {
            role: "system",
            content:
              "You generate markdown documents for users. Unless specified, this is a draft. Keep things shortish. Do not add any supplementary text, as everything you say will be placed into a document. If you're confused however, it's okay to ask a user for info. Responses must be either a chat response, or a document. Don't add bold styling to headings.",
          },
          ...messages,
        ],
      }),
    }
  );

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Cloudflare AI error:", errorText);
    return new Response(
      JSON.stringify({ error: "Cloudflare AI request failed." }),
      { status: response.status }
    );
  }

  const data = await response.json();
  const result = data.result?.response || "No response generated.";

  return new Response(result, {
    headers: { "Content-Type": "text/plain" },
  });
}
