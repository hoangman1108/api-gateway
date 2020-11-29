import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class UserType{
  @Field()
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  age: number;
}

@ObjectType()
export class UserResponses{
  @Field(()=>[UserType])
  users: UserType[];
}