import sheet from "./utils";

export async function GET(
  _req: Request
) {
  try {
    const response = await sheet.getSheetValues();
    return new Response(
      JSON.stringify({
        status: true,
        data: response 
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

