import { Global, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesModule } from './courses/courses.module';
import { Connection } from 'mongoose';
import * as MongooseDelete from 'mongoose-delete'
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LessonsModule } from './lessons/lessons.module';
import { HistoriesModule } from './histories/histories.module';
import { ShoppingCartsModule } from './shopping-carts/shopping-carts.module';
import { PaymentsModule } from './payments/payments.module';
@Global()
@Module({
  imports: [
    UsersModule, CoursesModule, AuthModule,
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 50
      }
    ]),
    PassportModule.register({
      session: false,
    }),
    JwtModule.register({
      // secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '4h' },
    }),
    ConfigModule.forRoot(
      {
        isGlobal: true,
        envFilePath: '.env.development.local'
      }
    ),
    MongooseModule.forRoot(`${process.env.DATABASE}://${process.env.DATABASE_HOST}:${process.env.DATABASE_PORT}/${process.env.DATABASE_COLLECTION}`,
      {
        connectionFactory(connection: Connection, name: string) {
          {
            connection && console.log("Connect Database successfully");
          }
          connection.plugin(MongooseDelete,
            {
              deletedBy: true, deletedByType: String, deletedAt: true,
              overrideMethods: 'all'
            });
          return connection;
        }
      }
    ),
    LessonsModule,
    HistoriesModule,
    ShoppingCartsModule,
    PaymentsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    }
  ],
})
export class AppModule { };
