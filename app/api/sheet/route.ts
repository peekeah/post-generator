import sheet from "./utils";

export async function GET(
  _req: Request
) {
  try {
    
    const response = await sheet.getSheetValues();
    console.log("rr", response)
    return new Response(
      JSON.stringify({
        statue: true,
        data: response 
      })
    )
  } catch (err) {
    return new Response(
      JSON.stringify({
        statue: false,
        data: "Internal server error" 
      })
    )
  }
}

