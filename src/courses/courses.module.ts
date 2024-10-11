import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CourseSchema, COURSE_MODEL } from '@schemas/course.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { LESSON_MODEL, LessonSchema } from '@schemas/lesson.schema';
import { USER_MODEL, UserSchema } from '@schemas/users.schema';
@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: COURSE_MODEL,
                schema: CourseSchema

            },
            {
                name: LESSON_MODEL,
                schema: LessonSchema
            },
            {
                name: USER_MODEL,
                schema: UserSchema
              }
        ])
    ],
    controllers: [CoursesController],
    providers: [CoursesService],
    // exports: [MongooseModule]
})
export class CoursesModule { }
