import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import fs from "fs";

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

  await r2.send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: key,
      Body: fileStream,
      ContentType: "video/mp4",
    })
  );

  return `${process.env.R2_PUBLIC_URL}/${key}`;
};