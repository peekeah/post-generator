import { NextResponse } from "next/server"

export const ReturnError = (message?: string, errCode?: number) => {
  return NextResponse.json({
    status: false,
    error: message || "Internal server error"
  }, {
    status: errCode || 500
  })
}
