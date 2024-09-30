
import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_MODEL, UserSchema } from '@schemas/users.schema';
import { AccessTokenStrategy } from 'src/auth/strategy/accessToken.strategy';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: USER_MODEL,
        schema: UserSchema
      }
    ])
  ],
  controllers: [UsersController],
  providers: [UsersService, AccessTokenStrategy],
  //exports: [MongooseModule]
})
export class UsersModule { }
