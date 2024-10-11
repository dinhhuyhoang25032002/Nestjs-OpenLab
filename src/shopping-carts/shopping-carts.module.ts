import { Module } from '@nestjs/common';
import { ShoppingCartsController } from './shopping-carts.controller';
import { ShoppingCartsService } from './shopping-carts.service';
import { USER_MODEL, UserSchema } from '@schemas/users.schema';
import { SHOPPING_CART_MODEL, ShoppingCartSchema } from '@schemas/shoppingcart.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { COURSE_MODEL, CourseSchema } from '@schemas/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: USER_MODEL,
        schema: UserSchema
      }, {
        name: SHOPPING_CART_MODEL,
        schema: ShoppingCartSchema
      },
      {
        name: COURSE_MODEL,
        schema: CourseSchema
      }
    ])
  ],
  controllers: [ShoppingCartsController],
  providers: [ShoppingCartsService]
})
export class ShoppingCartsModule { }
