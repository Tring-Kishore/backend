// src/config.ts
import dotenv from 'dotenv';

dotenv.config();

export default {
  // AWS S3 Configuration
  aws: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',       // AWS Access Key ID
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '', // AWS Secret Access Key
    region: process.env.AWS_REGION || 'us-east-1',          // AWS Region (default: us-east-1)
    bucketName: process.env.AWS_S3_BUCKET_NAME || '',       // Your S3 bucket name
    endpoint: process.env.AWS_S3_ENDPOINT,                  // Optional: For using with other S3-compatible services
    s3ForcePathStyle: process.env.AWS_S3_FORCE_PATH_STYLE === 'true', // Optional: Needed for some S3-compatible services
    signatureVersion: process.env.AWS_S3_SIGNATURE_VERSION || 'v4', // Signature version
  },
  
  // File Upload Configuration
  upload: {
    maxFileSize: parseInt(process.env.MAX_FILE_SIZE || '5242880'), // 5MB default
    allowedFileTypes: (process.env.ALLOWED_FILE_TYPES || 'image/jpeg,image/png,image/gif').split(','),
    uploadExpiration: parseInt(process.env.UPLOAD_URL_EXPIRATION || '300'), // 5 minutes default
    downloadExpiration: parseInt(process.env.DOWNLOAD_URL_EXPIRATION || '300'), // 5 minutes default
  },
  
  // App Configuration
  app: {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT || '4000'),
  },
};