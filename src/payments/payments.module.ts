import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { COURSE_MODEL, CourseSchema } from '@schemas/course.schema';
import { HISTORY_MODEL, HistorySchema } from '@schemas/history.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_MODEL, UserSchema } from '@schemas/users.schema';
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: USER_MODEL,
        schema: UserSchema
      }, {
        name: COURSE_MODEL,
        schema: CourseSchema
      },
      {
        name: HISTORY_MODEL,
        schema: HistorySchema
      },
    ])
  ],
  providers: [PaymentsService],
  controllers: [PaymentsController]
})
export class PaymentsModule { }
