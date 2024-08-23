import { getAuthToken, getSpreadSheetValues, writeSheet } from "./utils";

export async function GET(
  _req: Request
) {
  try {
    
    const auth = await getAuthToken();
    const response = await getSpreadSheetValues({
      auth,
      sheetName: "Sheet1"
    })

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

export async function POST(
  _req: Request
) {
  try {
    const auth = await getAuthToken();
    await writeSheet({
      auth,
      tabName: "Sheet1",
      range: "A:B",
      data: [["hi", "there!"]]
    })
    return new Response(
      JSON.stringify({
        statue: true,
        data: "Successfully added values!"
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
