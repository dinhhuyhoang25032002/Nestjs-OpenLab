
import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '@schemas/users.schema';
import { UpdateUser, UserClass } from './class/User.class';
import { USER_MODEL } from '@schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import { Course, COURSE_MODEL } from '@schemas/course.schema';
import { Response } from 'express';
import { CourseClass } from 'src/courses/class/Course.class';
import { History, HISTORY_MODEL } from '@schemas/history.schema';
import { HistoryClass } from 'src/histories/class/History.class';
@Injectable()
export class UsersService {
    constructor(
        @InjectModel(USER_MODEL)
        private readonly userModel: Model<User> & SoftDeleteModel<User>,
        @InjectModel(COURSE_MODEL)
        private readonly courseModel: Model<Course> & SoftDeleteModel<Course>,
        @InjectModel(HISTORY_MODEL)
        private readonly historyModel: Model<History> & SoftDeleteModel<History>
    ) { }

    async findAllUsers(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async findOneUser(id: string): Promise<User | null> {
        return this.userModel.findById(id).exec();
    }

    async updateInFoOneUser(id: string, User: UpdateUser): Promise<string> {
        return this.userModel.findOneAndUpdate({ _id: id }, User, { strict: true }).exec()
            .then(() => ('Update User Info Successfully!'))
            .catch((e) => {
                throw new Error(e);
            })
    }

    async updateOneUser(id: string, user: UserClass): Promise<string> {
        return this.userModel.updateOne({ _id: id }, user).exec()
            .then(() => ("Update User Successfully!"))
            .catch((e) => {
                throw new Error(e);
            })
    }

    // async restoreOneUser(id: string) {
    //     return this.userModel
    // }

    // soft-delete
    async softDeleteOneUser(id: string) {
        return
    }
    async handleBuyACourse(infor: { userId: string, courseId: string }, res: Response) {
        const { userId, courseId } = infor
        const user = await this.userModel.findById(userId);
        if (!user) {
            return res.status(200).send({ message: "Không tồn tại người dùng" })
        }

        const course = await this.courseModel.findById(courseId)
        if (!course) {
            return res.status(200).send({ message: "Không tồn tại khóa học bạn cần đăng kí!" })
        }
        const listUserActive = (course as CourseClass).users
        const listCourseBought = (user as UserClass).courses

        if (!listUserActive.includes(userId)) {
            listUserActive.push(userId)
            await course?.save()
        }
        if (!listCourseBought.includes(courseId)) {
            listCourseBought.push(courseId)
            await user?.save()
        }

        const historyData = await this.historyModel.find({ userId: user?._id, commodityId: course?._id })

        if (historyData.length === 0) {
            const history: HistoryClass = {
                userId: userId,
                commodityId: courseId,
                commodityType: course.type,
                moneyTraded: course.price
            }
            await new this.historyModel(history).save()
        }

        return res.status(200).send({
            message: "Đăng kí thành công",
            data: {
                listcourse: user?.courses,
                user: user?._id
            }
        })
    }

    async deleteOneUser(id: string): Promise<string> {
        return this.userModel.deleteOne({ _id: id }).exec()
            .then(() => ('Hard Delete User'))
            .catch((e) => {
                throw new Error(e);
            })
    }
}

