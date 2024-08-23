import sheet from "../sheet/utils"

export async function POST(
  req: Request
) {
  try {
    const OPENAI_KEY = process.env.OPENAI_KEY;
    const uri = "https://api.openai.com/v1/chat/completions";

    const request = await req.json()
    const { content } = request;

    const payload = {
      "model": "gpt-3.5-turbo",
      "messages": [
          {
              "role": "user",
              "content": `Please provide me social media post for the following content\n${content}`
          }
      ]
    }

    const config = {
      method: "POST",
      "Content-Type": "application/json",
      headers: {
        "Authorization": `Bearer ${OPENAI_KEY}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    }

    const response = await fetch(uri, config)
    const data = await response.json();

    const result = data?.choices?.[0].message?.content;

    // Store data into sheet
    const sheetValues =[
      [content, result, new Date()]
    ]
    
    await sheet.writeSheet(sheetValues)

    console.log("ress", result)
    return new Response(
      JSON.stringify({
        status: true,
        data: result
      })
    )
  
  } catch (err) {
    return new Response(
      JSON.stringify({
        status: false,
        data: "Internal server error"
      })
    )
  }
}
