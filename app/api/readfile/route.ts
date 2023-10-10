import fs from "fs";
import path from "path";
import { NextResponse } from "next/server";

export async function GET() {
  const dataFolderPath = path.join(process.cwd(), "public", "data");

  const files = fs.readdirSync(dataFolderPath);
  let texts = "";

  for (const file of files) {
    const filePath = path.join(dataFolderPath, file);
    const text = fs.readFileSync(filePath, "utf8");
    // texts.push(text);
    texts += text;
  }

  return NextResponse.json({ texts: texts });
  // return new NextResponse(JSON.stringify(texts), {
  //   headers: { "Content-Type": "application/json" },
  // });
}
