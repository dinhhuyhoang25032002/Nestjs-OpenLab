import { Module } from '@nestjs/common';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';
import { LESSON_MODEL, LessonSchema } from '@schemas/lesson.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { COURSE_MODEL, CourseSchema } from '@schemas/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: LESSON_MODEL,
        schema: LessonSchema
      }, {
        name: COURSE_MODEL,
        schema: CourseSchema
      }
    ])
  ],
  controllers: [LessonsController],
  providers: [LessonsService]
})
export class LessonsModule { }
