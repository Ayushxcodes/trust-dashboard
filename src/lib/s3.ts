import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const region = process.env.AWS_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.AWS_S3_BUCKET_NAME;

// Only initialize S3 client if credentials are provided
const isS3Configured = !!(region && accessKeyId && secretAccessKey && bucketName);

export const s3Client = isS3Configured
  ? new S3Client({
      region,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    })
  : null;

/**
 * Uploads a file to S3 (if configured) or returns null.
 * @param file The file to upload
 * @param folder The folder inside the bucket (e.g. 'documents' or 'templates')
 * @returns The S3 URL key, or null if S3 is not configured
 */
export async function uploadFileToS3(file: File, folder: string): Promise<string | null> {
  if (!s3Client || !bucketName) return null;

  const key = `${folder}/${Date.now()}_${file.name.replace(/\s+/g, "_")}`;
  const buffer = Buffer.from(await file.arrayBuffer());

  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );

    return `s3://${bucketName}/${key}`;
  } catch (err) {
    console.error("S3 Upload error, falling back to local file storage:", err);
    return null;
  }
}

/**
 * Generates a download URL for a file.
 * Handles both S3 URLs (s3://...) and local paths.
 */
export async function getDownloadUrl(fileUrl: string): Promise<string> {
  if (!fileUrl) return "";

  if (fileUrl.startsWith("s3://") && s3Client) {
    try {
      const match = fileUrl.match(/^s3:\/\/([^/]+)\/(.+)$/);
      if (match) {
        const [, bucket, key] = match;
        const command = new GetObjectCommand({
          Bucket: bucket,
          Key: key,
        });
        // Presigned for 1 hour
        return await getSignedUrl(s3Client, command, { expiresIn: 3600 });
      }
    } catch (err) {
      console.error("Error generating presigned S3 URL:", err);
    }
  }

  return fileUrl;
}
