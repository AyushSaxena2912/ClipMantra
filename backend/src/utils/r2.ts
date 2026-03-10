import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";
import path from "path";

const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

export const uploadToR2 = async (
  filePath: string,
  key: string
): Promise<string> => {

  try {

    if (!fs.existsSync(filePath)) {
      throw new Error(`File not found: ${filePath}`);
    }

    const fileStream = fs.createReadStream(filePath);

    /* detect content type */

    let contentType = "application/octet-stream";

    const ext = path.extname(filePath).toLowerCase();

    if (ext === ".mp4") contentType = "video/mp4";
    else if (ext === ".mp3") contentType = "audio/mpeg";
    else if (ext === ".json") contentType = "application/json";

    await r2.send(
      new PutObjectCommand({
        Bucket: process.env.R2_BUCKET,
        Key: key,
        Body: fileStream,
        ContentType: contentType,
      })
    );

    const publicUrl = `${process.env.R2_PUBLIC_URL}/${key}`;

    return publicUrl;

  } catch (err) {

    console.error("R2 Upload Error:", err);

    throw new Error("Failed to upload file to R2");

  }

};