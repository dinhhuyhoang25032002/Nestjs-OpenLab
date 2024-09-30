import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
// import { UsersModule } from '@users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { USER_MODEL, UserSchema } from '@schemas/users.schema';
import { AccessTokenStrategy } from 'src/auth/strategy/accessToken.strategy';
import { RefreshTokenStrategy } from 'src/auth/strategy/refreshToken.strategy';
import { GoogleStrategy } from './strategy/Google/google.strategy';
import { SessionSerializer } from './strategy/Google/Serializer';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: USER_MODEL,
        schema: UserSchema
      }
    ])
  ],
  controllers: [AuthController],
  providers: [
    AuthService ,
    AccessTokenStrategy, RefreshTokenStrategy,
    GoogleStrategy, SessionSerializer
  ],
})
export class AuthModule { }
