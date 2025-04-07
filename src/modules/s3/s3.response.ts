import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UploadPdfResponse{
    @Field()
    presignedUrl!:string

    @Field()
    key!:string

    @Field()
    publicUrl!:string
}
@ObjectType()
export class DownloadPdfResponse {
  @Field()
  downloadUrl!: string;
  
  @Field()
  expiresAt!: Date;
}
