import { unstable_cache } from "next/cache";
import { google } from "googleapis";

type SheetRow = Record<string, string>;

const TRUE_VALUES = new Set(["TRUE", "YES", "1"]);

async function fetchSheetData() {
    try {
        if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
            console.error("Missing Google Sheets credentials in environment variables.");
            return [];
        }

        const auth = new google.auth.GoogleAuth({
            credentials: {
                client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
                private_key: (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n"),
            },
            scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
        });

        const sheets = google.sheets({ version: "v4", auth });
        const spreadsheetId = process.env.GOOGLE_SHEET_ID || "1xrOfLGzPUofmJgeNBicavmned5DAEA7Q56DVrn8fClU";
        const range = "Sheet1!A1:Z";

        const response = await sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });

        const rows = response.data.values;

        if (!rows || rows.length === 0) {
            return [];
        }

        // Extract headers (first row) and data
        const headers = rows[0].map((header) => String(header).trim());
        const rawData = rows.slice(1);

        const processedData = rawData
            .map((row) => {
                const rowObject: SheetRow = {};
                headers.forEach((header, index) => {
                    if (!header) return;
                    rowObject[header] = String(row[index] || "").trim();
                });
                return rowObject;
            })
            .filter((item) => {
                const featuredValue = item.is_featured || item.featured || "";
                return TRUE_VALUES.has(featuredValue.toUpperCase());
            });

        return processedData;
    } catch (error) {
        console.error("Google Sheets API Error:", error);
        return [];
    }
}

export const getSheetData = unstable_cache(fetchSheetData, ["google-sheets-featured"], {
    revalidate: 3600,
});
