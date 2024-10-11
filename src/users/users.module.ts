
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_MODEL, UserSchema } from '@schemas/users.schema';
import { AccessTokenStrategy } from 'src/auth/strategy/accessToken.strategy';
import { COURSE_MODEL, CourseSchema } from '@schemas/course.schema';
import { HISTORY_MODEL, HistorySchema } from '@schemas/history.schema';

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
  controllers: [UsersController],
  providers: [UsersService, AccessTokenStrategy],
  //exports: [MongooseModule]
})
export class UsersModule { }
