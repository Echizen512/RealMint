import { NextRequest } from "next/server";
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.API_JWT!,
  pinataGateway: process.env.API_GATEWAY!,
});

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file || !(file instanceof File)) return Response.json({ message: "No image file provided" }, { status: 400 });

    const upload = await pinata.upload.public.file(file);

    return Response.json({
      message: "success",
      cid: upload.cid,
      name: upload.name,
      url: `https://${pinata?.config?.pinataGateway}/ipfs/${upload.cid}`,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
