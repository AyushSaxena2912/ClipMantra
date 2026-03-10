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
) => {

  const fileStream = fs.createReadStream(filePath);

  /* detect content type automatically */

  let contentType = "application/octet-stream";

  const ext = path.extname(filePath);

  if (ext === ".mp4") contentType = "video/mp4";
  if (ext === ".mp3") contentType = "audio/mpeg";
  if (ext === ".json") contentType = "application/json";

  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: key,
      Body: fileStream,
      ContentType: contentType,
    })
  );

  return `${process.env.R2_PUBLIC_URL}/${key}`;
};