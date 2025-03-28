import { Field, InputType } from "type-graphql";

@InputType()
export class OrganizationInput {
  @Field()
  website!: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  status?: string;

  @Field({ nullable: true })
  location?: string;
}

@InputType()
export class UserInput {
  @Field()
  name!: string;

  @Field()
  email!: string;

  @Field()
  phone!: string;
}