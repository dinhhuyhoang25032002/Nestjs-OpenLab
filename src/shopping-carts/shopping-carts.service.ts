import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SHOPPING_CART_MODEL, ShoppingCart } from '@schemas/shoppingcart.schema';
import { SoftDeleteModel } from 'mongoose-delete';
import mongoose, { Model, ObjectId } from 'mongoose';
import { User, USER_MODEL } from '@schemas/users.schema';
import { Course, COURSE_MODEL } from '@schemas/course.schema';
import { ShoppingCartClass } from 'src/shopping-carts/class/ShoppingCart.class';
@Injectable()
export class ShoppingCartsService {

    constructor(
        @InjectModel(SHOPPING_CART_MODEL)
        private readonly shoppingCartModel: SoftDeleteModel<ShoppingCart> & Model<ShoppingCart>,

        @InjectModel(USER_MODEL)
        private readonly userModel: SoftDeleteModel<User> & Model<User>,

        @InjectModel(COURSE_MODEL)
        private readonly courseModel: SoftDeleteModel<Course> & Model<Course>
    ) { }

    async handleAddItemToCart(body: { userId: string, itemId: string, type: string }) {
        const { userId, itemId, type } = body;

        if (!userId || !itemId || !type) {
            return { message: "Thiếu tham số cần thiết" }
        }

        const user = await this.userModel.findById(userId);
        if (!user) {
            return { message: "Không tồn tại người dùng!" }
        }

        if (type === "COURSE") {
            const course = await this.courseModel.findById(itemId);
            if (!course) {
                return { message: "Không tồn tại khóa học." }
            }
            const shoppingCart = await this.shoppingCartModel.findOne({ userId: userId })

            if (!shoppingCart) {
                const newshoppingCart: ShoppingCartClass = {
                    userId: userId,
                    listItem: [{ itemId: itemId, type: course.type }]
                }
                await new this.shoppingCartModel(newshoppingCart).save()
            }

            const listItem = shoppingCart?.listItem;
            const itemCheck = {
                itemId: itemId,
                type: course.type
            };
            const itemExists = listItem?.some(item =>
                item.itemId.toString() === itemCheck.itemId.toString() && item.type === itemCheck.type
            );

            if (!itemExists) {
                listItem?.push(itemCheck);
                await shoppingCart?.save();
            }

            return { message: "Đã thêm vào giỏ hàng" }
        }
    }
}
