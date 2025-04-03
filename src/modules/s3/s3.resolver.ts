import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { DownloadPdfResponse, UploadPdfResponse } from "./s3.response";
import { DownloadPdfInput, UploadPdfInput } from "./s3.input";
import { downloadPdf, uploadPdf } from "./s3service";

@Resolver()
export class S3Resolver {
  @Mutation(() => UploadPdfResponse)
  async generateUploadUrl(
    @Arg("input") input: UploadPdfInput
  ): Promise<UploadPdfResponse> {
    const presignedUrl = await uploadPdf(
      process.env.AWS_S3_BUCKET_NAME || "jobportal-media-resume",
      input.fileName
    );
    return {
      presignedUrl,
      key: input.fileName,
      publicUrl: `https://${process.env.AWS_S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${input.fileName}`,
    };
  }

  @Query(() => DownloadPdfResponse)
  async generateDownloadUrl(@Arg("input")input:DownloadPdfInput):Promise<DownloadPdfResponse>
  {
    const downloadUrl = await downloadPdf(input.bucket,input.key)
    return { 
        downloadUrl,
        expiresAt: new Date(Date.now() + 3600 * 1000)
    }
  }
}
