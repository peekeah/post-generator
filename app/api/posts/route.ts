import { OpenAI } from "openai";
import { PrismaClient } from "@prisma/client";
import { prisma } from "@/lib/utils";

export async function GET() {
  try {

    const dbRes = await prisma.socialMediaPost.findMany();
    return new Response(
      JSON.stringify({
        status: true,
        data: dbRes
      })
    )
  } catch (err) {
    console.log("ee:", err)
    return new Response(
      JSON.stringify({
        status: false,
        data: "Internal server error",
        err: err
      })
    )
  }
}

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json()
    if (!id) throw new Error("validaton error");

    await prisma.socialMediaPost.delete({
      where: { id }
    })

    return new Response(
      JSON.stringify({
        status: false,
        data: "Successfully deleted entry",
      })
    )

  } catch (err) {
    console.log("ee:", err)
    return new Response(
      JSON.stringify({
        status: false,
        data: "Internal server error",
        err: err
      })
    )
  }
}

export async function POST(
  req: Request
) {
  try {

    const request = await req.json()
    const {
      platform,
      message,
      wordLimit,
      tone,
    } = request;

    if (
      !platform ||
      !message ||
      !wordLimit ||
      !tone
    ) {
      throw new Error("validation error")
    }

    // LLM Call
    const llmResponse = await generateSocialMediaPost(platform, message, wordLimit, tone);

    // DB Call
    await prisma.socialMediaPost.create({
      data: {
        platform: platform.toUpperCase(),
        wordLimit,
        message,
        tone: tone.toUpperCase(),
        generatedContent: llmResponse
      }
    })

    return new Response(
      JSON.stringify({
        status: true,
        data: llmResponse,
      })
    )

  } catch (err) {
    console.log("ee:", err)
    return new Response(
      JSON.stringify({
        status: false,
        data: "Internal server error",
        err: err
      })
    )
  }
}

async function generateSocialMediaPost(
  platform: "linkedin" | "facebook" | "twitter" | "instagram",
  message: string,
  wordLimit: number,
  tone: "professional" | "casual" | "humorous" | "inspirational" | "educational"
): Promise<string> {

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  const systemPrompt = `
    You are an expert social media content creator with deep knowledge of effective engagement strategies for different platforms.
    - LinkedIn: Professional, insightful, industry-relevant.
    - Facebook: Conversational, engaging, friendly.
    - Twitter: Concise, impactful, trending topics.
    - Instagram: Visual-oriented, catchy, modern.
    
    Your task is to generate high-quality posts tailored to the given platform, ensuring engagement and clarity.
  `;

  const userPrompt = `
    Generate a **${tone}** social media post for **${platform}** within a **${wordLimit}**-word limit.
    
    **Message:** "${message}"
    
    Ensure the content aligns with best practices for the platform while making it engaging and readable.
  `;

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt }
    ],
    max_tokens: Math.min(wordLimit * 2, 200), // Adjust for word-to-token ratio
    temperature: 0.7,
  });

  return response?.choices?.[0]?.message?.content?.trim() || "Failed to generate post.";
}
