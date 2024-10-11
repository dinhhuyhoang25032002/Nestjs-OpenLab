import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Lesson, LESSON_MODEL } from '@schemas/lesson.schema';
import { SoftDeleteModel } from 'mongoose-delete';
import { Model } from 'mongoose';
import { LessonClass } from 'src/lessons/class/Lesson.class';
import { Course, COURSE_MODEL } from '@schemas/course.schema';
import { CourseClass } from 'src/courses/class/Course.class';
@Injectable()
export class LessonsService {
    constructor(
        @InjectModel(LESSON_MODEL)
        private readonly lessonModel: SoftDeleteModel<Lesson> & Model<Lesson>,
        @InjectModel(COURSE_MODEL)
        private readonly courseModel: SoftDeleteModel<Course> & Model<Course>
    ) { }

    async handleCreateLesson(contentLesson: LessonClass) {
        const { course } = contentLesson
        const courseData = await this.courseModel.findById(course)
        if (!courseData) {
            return { message: 'Không tồn tại khóa học để thêm.' }
        }
        const lessonCreated = await new this.lessonModel(contentLesson).save();
        const listLessons = (courseData as CourseClass).lessons
        const lessonId = lessonCreated.id
        if (!listLessons.includes(lessonId)) {
            listLessons.push(lessonId)
            await courseData?.save()
        }
        return { message: 'Đã cập nhật bài học mới' }
    }
}
