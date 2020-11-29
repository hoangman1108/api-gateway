import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class LessonType{

  @Field()
  id: string;

  @Field()
  name: string;
  
  @Field()
  startDate: string;
  
  @Field()
  endDate: string;
}