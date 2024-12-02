import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { COURSE_MODEL, CourseSchema } from '@schemas/course.schema';
import { HISTORY_MODEL, HistorySchema } from '@schemas/history.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_MODEL, UserSchema } from '@schemas/users.schema';
import { PAYMENT_MODEL, PaymentSchema } from '@schemas/payments.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: USER_MODEL,
        schema: UserSchema,
      },
      {
        name: PAYMENT_MODEL,
        schema: PaymentSchema,
      },
      {
        name: COURSE_MODEL,
        schema: CourseSchema,
      },
      {
        name: HISTORY_MODEL,
        schema: HistorySchema,
      },
    ]),
  ],
  providers: [PaymentsService],
  controllers: [PaymentsController],
})
export class PaymentsModule {}
