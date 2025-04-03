import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION!,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const generatePresignedUrl = async (fileName: string, userId: string) => {
  const timestamp = Date.now();
  const key = `uploads/${userId}/${timestamp}_${fileName}`;

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: key,
    ContentType: "application/pdf",
  };

  const command = new PutObjectCommand(params);
  return {
    url: await getSignedUrl(s3, command, { expiresIn: 60 }),
    key,
  };
};
export const generateDownloadUrl = async (key: string) => {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
    };
  
    const command = new GetObjectCommand(params);
    return await getSignedUrl(s3, command, { expiresIn: 3600 });
  };
