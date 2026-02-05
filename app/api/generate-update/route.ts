import { NextResponse } from "next/server";
import { openai } from "@/lib/openai";

export async function POST(req: Request) {
  const { commits, pulls } = await req.json();

  const messages = [
    {
      role: "system",
      content:
        "You write conservative, professional client updates. No promises, no timelines, no assumptions.",
    },
    {
      role: "user",
      content: `
Commits:
${commits.map((c: any) => `- ${c.commit.message}`).join("\n")}

Pull Requests:
${pulls.map((p: any) => `- ${p.title}`).join("\n")}
`,
    },
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
    temperature: 0.2,
  });

  return NextResponse.json({
    text: response.choices[0].message.content,
  });
}
