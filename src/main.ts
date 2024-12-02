import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfixCors } from './util/configCors';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import * as fs from 'fs';
import * as passport from 'passport';

const httpsOptions = {
  key: fs.readFileSync('tinamys.com+4-key.pem'),
  cert: fs.readFileSync('tinamys.com+4.pem'),
};

async function bootstrap() {
  //create app and initialization,config CORS
  const app = await NestFactory.create(AppModule, {
    httpsOptions,
    bodyParser: true,
    cors: ConfixCors,
  });
  //Midleware
  app.use(
    session({
      secret: 'my-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 60 * 60 * 24 * 7,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  //app.setGlobalPrefix('api/v1')

  //Run Server
  await app.init();
  await app.listen(3001, () => {
    console.log(`Application is running on: https://tinamys.iotest:3001`);
  });
}

bootstrap();
