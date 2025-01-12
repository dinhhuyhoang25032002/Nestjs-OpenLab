import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Req,
  Res,
  Get,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { PartialUser, UserClass } from '@users/class/User.class';
import { Request, Response } from 'express';
import { JwtRefreshAuthGuard } from './guard/refreshToken.guard';
import { JwtAccessAuthGuard } from './guard/accessToken.guard';
import { GoogleAuthGuard } from './guard/google.guard';
import { userFromGoogle } from 'src/types/CustomType';
import { getToken } from '@util/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  //POST auth/sign-up/
  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() user: PartialUser) {
    console.log(user);

    return this.authService.createOneUser(user);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() user: PartialUser, @Res() res: Response) {
    return this.authService.handleLogin(user, res);
  }

  @UseGuards(GoogleAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('google/login')
  async handleLoginWithGoogle() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/redirect')
  @HttpCode(HttpStatus.OK)
  async handleRedirect(@Req() req: Request, @Res() res: Response) {
    const user = req.user as userFromGoogle;
    if (!user) {
      res.json({ message: 'Authentication with Google failed!' });
    }
    const data = await this.authService.handleLoginWithGoogle(user, res);
    res.json(data);
  }

  // @UseGuards(JwtAccessAuthGuard)
  @Get('logout')
  @HttpCode(HttpStatus.OK)
  logout(@Res() res: Response) {
    return this.authService.handleLogout(res);
  }

  @Get()
  @UseGuards(JwtAccessAuthGuard)
  async addCookie(
    @Query() query: { id: string; email: string },
    @Res() res: Response,
  ) {
    const { id, email } = query;
    console.log(id, email);
    const { refreshToken } = await getToken(id, email);
    res.cookie('token', refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      expires: new Date(Date.now() + 604800000),
      partitioned: true,
    });
    return res.status(200).json({ message: 'accessed server' });
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(@Req() req: Request, @Res() res: Response) {
    const jwt = req.user as { sub: string; email: string };
    return this.authService.refreshToken(jwt, res);
  }
  @Get('status')
  user(@Req() request: Request) {
    console.log(request.user);
    if (request.user) {
      return { msg: 'Authenticated' };
    } else {
      return { msg: 'Not Authenticated' };
    }
  }
}
