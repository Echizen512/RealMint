import { NextRequest } from "next/server";
import { randomUUID } from "crypto";
import { PinataSDK } from "pinata";

const pinata = new PinataSDK({
  pinataJwt: process.env.API_JWT!,
  pinataGateway: process.env.API_GATEWAY!,
});

const MAX_SIZE_BYTES = 2 * 1024 * 1024; // 2MB

export const POST = async (request: NextRequest) => {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file || !(file instanceof File)) {
      return Response.json({ message: "No image file provided" }, { status: 400 });
    }

    if (file.size > MAX_SIZE_BYTES) {
      return Response.json(
        {
          message: "Image too large. Max allowed size is 2MB.",
          size: file.size,
          allowed: MAX_SIZE_BYTES,
        },
        { status: 413 },
      );
    }

    const extension = file.name.split(".").pop() || "png";
    const uniqueName = `img_${Date.now()}_${randomUUID()}.${extension}`;
    const renamedFile = new File([await file.arrayBuffer()], uniqueName, { type: file.type });

    const upload = await pinata.upload.public.file(renamedFile);

    return Response.json({
      message: "success",
      cid: upload.cid,
      name: upload.name,
      // url: `https://${pinata?.config?.pinataGateway}/ipfs/${upload.cid}`,
      url: `https://ipfs.io/ipfs/${upload.cid}`,
    });
  } catch (err) {
    console.error("Upload error:", err);
    return Response.json({ message: "Internal Server Error" }, { status: 500 });
  }
};
