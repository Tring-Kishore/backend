import { Field, InputType } from "type-graphql";

@InputType()
export class UploadPdfInput{
    @Field()
    fileName!:string

    @Field()
    fileType!:string
}
@InputType()
export class DownloadPdfInput{
    @Field()
    key!:string

    @Field()
    bucket!:string
    
}