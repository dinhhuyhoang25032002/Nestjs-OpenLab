import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { COURSE_MODEL, Course } from '@schemas/course.schema';
import { Model } from 'mongoose';
import { CourseClass, UpdateCourse } from './class/Course.class';
import { SoftDeleteModel } from 'mongoose-delete';
import { User, USER_MODEL } from '@schemas/users.schema';
import { compareArrays } from '@util/compareArrays';
import slugify from 'slugify';
import { LESSON_MODEL, Lesson } from '@schemas/lesson.schema';

@Injectable()
export class CoursesService {
  constructor(
    @InjectModel(COURSE_MODEL)
    private readonly courseModel: SoftDeleteModel<Course> & Model<Course>,
    @InjectModel(USER_MODEL)
    private readonly userModel: SoftDeleteModel<User> & Model<User>,
    @InjectModel(LESSON_MODEL)
    private readonly lessonModel: SoftDeleteModel<Lesson> & Model<Lesson>,
  ) {}

  async createOneCourse(Course: CourseClass): Promise<Course> {
    const { name } = Course;

    const newCourse = {
      ...Course,
      type: 'COURSE',
      slug: slugify(name, { lower: true, locale: 'vi' }),
    };
    const createdCourse = new this.courseModel(newCourse);
    return createdCourse.save();
  }

  async findAllCourses(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async findOneCourse(slug: string, query?: boolean) {
    if (query) {
      const data = await this.courseModel
        .findOne({ slug: slug })
        .select('_id')
        .populate({
          path: 'lessons',
          select: 'name _id',
        });

      return this.courseModel.findOne({ slug: slug }).select('name').populate({
        path: 'lessons',
        select: 'name _id',
      });
    }
    return this.courseModel
      .findOne({ slug: slug })
      .select('-users')
      .populate({ path: 'lessons', select: 'name _id linkImage' });
  }

  async getCourseByName(name: string) {
    return this.courseModel
      .find({ name: { $regex: name, $options: 'i' } }, 'name')
      .sort([['price', 'asc']]);
  }

  async getCoursesBySearch(
    searchValue?: string,
    price?: string,
  ): Promise<Course[] | string | undefined> {
    if (!searchValue && !price) {
      return 'Missing require parameter!';
    }
    if (searchValue && price) {
      return this.courseModel
        .find({
          name: { $regex: searchValue, $options: 'i' },
          price: { $lte: price },
        })
        .sort('asc');
    }
    if (searchValue) {
      return this.courseModel.find({
        name: { $regex: searchValue, $options: 'i' },
      });
    }
    if (price) {
      return this.courseModel
        .find({ price: { $lte: price } })
        .sort([['price', 'asc']]);
    }
  }

  async updateOneCourse(id: string, Course: CourseClass): Promise<CourseClass> {
    return this.courseModel
      .updateOne({ _id: id }, Course)
      .exec()
      .then(() => ({ ...Course, message: 'Update Successfully!' }))
      .catch((e) => {
        throw new Error(e);
      });
  }

  async updateInForCourse(
    id: string,
    CourseInfo: UpdateCourse,
  ): Promise<string> {
    return this.courseModel
      .findOneAndUpdate({ _id: id }, CourseInfo, { strict: true })
      .exec()
      .then(() => 'Update InFoCourse successfully !')
      .catch((e) => {
        throw new Error(e);
      });
  }

  async deleteOneCourse(id: string): Promise<string> {
    return this.courseModel
      .delete({ _id: id })
      .exec()
      .then(() => 'Soft Delete successfully !')
      .catch((e) => {
        throw new Error(e);
      });
  }

  async restoreCourse(id: string): Promise<string> {
    return this.courseModel
      .restore({ _id: id })
      .exec()
      .then(() => 'Restore Course Successfully!')
      .catch((e) => {
        throw new Error(e);
      });
  }

  async hardDeleteCourse(id: string): Promise<string> {
    return this.courseModel
      .deleteOne({ _id: id })
      .exec()
      .then(() => 'Hard Delete successfully !')
      .catch((e) => {
        throw new Error(e);
      });
  }
  async getAllCourseActive(body: { userId: string; courseId?: Array<string> }) {
    const { userId, courseId } = body;
    if (!userId) {
      return { message: 'Thiếu tham số quan trọng.' };
    }
    if (courseId?.length === 0) {
      return { message: 'Người dùng chưa đăng kí khóa học.' };
    }
    const user = await this.userModel.findById(userId);
    if (!user) {
      return { message: 'Không tồn tại người dùng.' };
    }

    const coursesData = user.courses.map((x) => x.toString());
    if (courseId) {
      const result = compareArrays(coursesData, courseId);
      if (!result) {
        return { message: 'Dữ liệu gửi lên không hợp lệ' };
      }
      const listCourses = await this.courseModel
        .find({
          _id: { $in: coursesData },
        })
        .select('name starNumber type image subType lessons');

      return {
        message: 'Lấy dữ liệu thành công!',
        data: listCourses,
      };
    }
  }
}
