import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { COURSE_MODEL, Course } from '@schemas/course.schema';
import { Model } from 'mongoose';
import { CourseClass, UpdateCourse } from './class/Course.class';
import { SoftDeleteModel } from 'mongoose-delete';

@Injectable()
export class CoursesService {
    constructor(
        @InjectModel(COURSE_MODEL)
        private readonly courseModel: SoftDeleteModel<Course> & Model<Course>
    ) { }

    async createOneCourse(Course: CourseClass): Promise<Course> {
        const newCourse = {
            ...Course,
            type: "COURSE"
        }
        const createdCourse = new this.courseModel(newCourse);
        return createdCourse.save();
    }

    async findAllCourses(): Promise<Course[]> {
        return this.courseModel.find().exec();
    }

    async findOneCourse(id: string): Promise<Course | null> {
        return this.courseModel.findById(id);
    }

    async GetNameCourse(name: string) {
        return this.courseModel.find({ name: { '$regex': name, $options: 'i' } }, "name").sort([['price', 'asc']])
    }

    async GetCoursesBySearch(searchValue?: string, price?: string): Promise<Course[] | string | undefined> {
        if (!searchValue && !price) {
            return ("Missing require parameter!")
        }
        if (searchValue && price) {
            return this.courseModel.find({ name: { '$regex': searchValue, $options: 'i' }, price: { $lte: price } }).sort('asc')
        }
        if (searchValue) {
            return this.courseModel.find({ name: { '$regex': searchValue, $options: 'i' } });
        }
        if (price) {
            return this.courseModel.find({ price: { $lte: price } }).sort([['price', 'asc']])
        }
    }

    async updateOneCourse(id: string, Course: CourseClass): Promise<CourseClass> {
        return this.courseModel.updateOne({ _id: id }, Course).exec()
            .then(() => ({ ...Course, message: 'Update Successfully!' }))
            .catch((e) => {
                throw new Error(e);
            });
    }

    async updateInForCourse(id: string, CourseInfo: UpdateCourse): Promise<string> {
        return this.courseModel.findOneAndUpdate({ _id: id }, CourseInfo, { strict: true }).exec().
            then(() => ('Update InFoCourse successfully !')
            )
            .catch((e) => {
                throw new Error(e);
            });
    }

    async deleteOneCourse(id: string): Promise<string> {
        return this.courseModel.delete({ _id: id }).exec()
            .then(() => ("Soft Delete successfully !"))
            .catch((e) => {
                throw new Error(e);
            });
    }

    async restoreCourse(id: string): Promise<string> {
        return this.courseModel.restore({ _id: id }).exec()
            .then(() => ('Restore Course Successfully!'))
            .catch((e) => { throw new Error(e) });
    }

    async hardDeleteCourse(id: string): Promise<string> {
        return this.courseModel.deleteOne({ _id: id }).exec()
            .then(() => ("Hard Delete successfully !"))
            .catch((e) => {
                throw new Error(e);
            });
    }
}
