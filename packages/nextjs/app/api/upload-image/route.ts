import { NextRequest } from "next/server";
import fs from "fs";
import { writeFile } from "fs/promises";
import path from "path";

const FILEBASE_KEY = process.env.FILEBASE_KEY!;
const FILEBASE_SECRET = process.env.FILEBASE_SECRET!;
const FILEBASE_BUCKET = process.env.FILEBASE_BUCKET!;

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) return Response.json({ message: "No file provided" }, { status: 400 });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const tempPath = path.join("/tmp", file.name);

    await writeFile(tempPath, buffer);

    const filebaseUrl = `https://s3.filebase.com/${FILEBASE_BUCKET}/${file.name}`;

    const uploadRes = await fetch(filebaseUrl, {
      method: "PUT",
      headers: {
        Authorization: "Basic " + Buffer.from(`${FILEBASE_KEY}:${FILEBASE_SECRET}`).toString("base64"),
        "Content-Type": file.type,
        "x-amz-acl": "public-read",
      },
      body: buffer,
    });

    fs.unlinkSync(tempPath);

    if (!uploadRes.ok) {
      const errorText = await uploadRes.text();
      return new Response(`Error uploading: ${errorText}`, { status: 500 });
    }

    const previewUrl = `https://ipfs.io/ipfs/${file.name}`;

    return Response.json({ success: true, url: previewUrl });
  } catch (err) {
    console.error("Upload error:", err);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
