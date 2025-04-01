// // src/services/file.service.ts
// import { Service } from "typedi";
// import AWS from "aws-sdk";
// import config from "../cofig";
// import {
//   SignedUrlResponse,
//   FileUploadResponse,
// } from "../modules/user/response";
// import {
//   GetUploadSignedUrlInput,
//   GetDownloadSignedUrlInput,
//   DirectUploadInput,
// } from "../modules/user/input";

// @Service()
// export class FileService {
//   private readonly s3 = new AWS.S3({
//     accessKeyId: config.aws.accessKeyId,
//     secretAccessKey: config.aws.secretAccessKey,
//     region: config.aws.region,
//   });

//   private readonly S3_BUCKET_NAME = config.aws.bucketName;

//   async getUploadSignedUrl(
//     input: GetUploadSignedUrlInput
//   ): Promise<SignedUrlResponse> {
//     const path = `${input.folder || "images"}/${new Date().getTime()}_${
//       input.fileName
//     }`;
//     const url = await this.getSignedUrl("putObject", path);
//     return { url, key: path };
//   }

//   async getDownloadSignedUrl(
//     input: GetDownloadSignedUrlInput
//   ): Promise<SignedUrlResponse> {
//     const url = await this.getSignedUrl("getObject", input.fileKey);
//     return { url, key: input.fileKey };
//   }

//   async directUpload(input: DirectUploadInput): Promise<FileUploadResponse> {
//     const uniqueFilename = `${new Date().getTime()}_${input.fileName}`;
//     const key = `${input.folder || "images"}/${uniqueFilename}`;

//     // Convert base64 to buffer
//     const buffer = Buffer.from(
//       input.file.replace(/^data:\w+\/\w+;base64,/, ""),
//       "base64"
//     );

//     const params = {
//       Bucket: this.S3_BUCKET_NAME,
//       Key: key,
//       Body: buffer,
//       ContentEncoding: "base64",
//       ContentType: this.getContentType(input.file),
//     };

//     const data = await this.s3.upload(params).promise();
//     return { url: data.Location, key };
//   }

//   private async getSignedUrl(
//     operation: "getObject" | "putObject",
//     key: string
//   ): Promise<string> {
//     const params = {
//       Bucket: this.S3_BUCKET_NAME,
//       Key: key,
//       Expires: 60 * 5, // 5 minutes
//     };

//     return this.s3.getSignedUrlPromise(operation, params);
//   }

//   private getContentType(base64: string): string {
//     const match = base64.match(/^data:(\w+\/\w+);/);
//     return match ? match[1] : "application/octet-stream";
//   }
// }