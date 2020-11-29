import { Query, Resolver } from "@nestjs/graphql";
import {LessonType} from "./lesson.types";

@Resolver(() => LessonType)
export class LessonResolver{

  @Query(()=>LessonType)
  lesson() { 
    return {
      id: '12312321',
      name: 'Physics class',
      startDate: (new Date()).toISOString(),
      endDate: (new Date()).toISOString(),
    }
  }

}