import { Module } from '@nestjs/common';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';
import { CourseSchema, COURSE_MODEL } from '@schemas/course.schema';
import { MongooseModule } from '@nestjs/mongoose';
@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: COURSE_MODEL,
                schema: CourseSchema
                // useFactory() {
                //     CourseSchema.plugin(require('mongoose-delete'))
                //     return CourseSchema;
                // }
            }
        ])
    ],
    controllers: [CoursesController],
    providers: [CoursesService],
    // exports: [MongooseModule]
})
export class CoursesModule { }
