import { google } from "googleapis";

const sheets = google.sheets('v4');

// Google api credentials
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// Google api constants
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const sheetId = '17QAMB0mflPwJLIdw455YCwRNjsEthlgI1IKYaNTj-r0'
const tabName = 'Sheet1'
const range = 'A:B'
const CREDENTIAL_PATH="secret.json"

export const getAuthToken = async() => {
  const auth = new google.auth.GoogleAuth({
    scopes: SCOPES,
    keyFile: CREDENTIAL_PATH
  });
  const authToken = await auth.getClient();
  return authToken;
}

interface ISpreadsheet{
  auth: any;
}

export const getSpreadSheet = async({ auth }: ISpreadsheet) => {
  const res = await sheets.spreadsheets.get({
    spreadsheetId: sheetId,
    auth,
  });
  return res;
}

interface ISpreadSheetValues {
  auth: any;
  sheetName: string;
}
export const getSpreadSheetValues = async({ auth, sheetName }: ISpreadSheetValues) => {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: sheetId,
    auth,
    range: sheetName
  });
  return res;
}

interface IWriteSheet {
  auth: any;
  tabName: string;
  range: string;
  data: any;
}
export const writeSheet = async({ auth, tabName, range, data }: IWriteSheet) => {
  const payload = {
    auth,
    spreadsheetId: sheetId,
    range: `${tabName}!${range}`,
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      "majorDimension": "ROWS",
      "values": data
    },
  }
  await sheets.spreadsheets.values.append(payload)


}
