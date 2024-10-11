import { Controller, Post, Body, HttpCode, HttpStatus, UseGuards, Req, Res, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UpdateUser, UserClass } from '@users/class/User.class';
import { Request, Response } from 'express';
import { JwtRefreshAuthGuard } from './guard/refreshToken.guard';
import { JwtAccessAuthGuard } from './guard/accessToken.guard';
import { GoogleAuthGuard } from './guard/google.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    //POST auth/sign-up/
    @Post('sign-up')
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() user: UserClass) {
        return this.authService.createOneUser(user);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK) 
    async login(@Body() user: UpdateUser, @Res() res: Response,) {
         return this.authService.handleLogin(user, res);
    }
    
    @UseGuards(GoogleAuthGuard)
    @Get('google/login')
    async handleLoginWithGoogle() {
        return { message: 'Google Authentication' }
    }

    @UseGuards(GoogleAuthGuard)
    @Get('google/redirect')
    async handleRedirect() {
        return await this.handleLoginWithGoogle();
    }

   // @UseGuards(JwtAccessAuthGuard)
    @Get('logout')
    @HttpCode(HttpStatus.OK)
    logout(@Res() res: Response) {
        return this.authService.handleLogout(res)
    }

    @UseGuards(JwtRefreshAuthGuard)
    @Get('refresh')
    @HttpCode(HttpStatus.OK)
    refreshToken(@Req() req: Request, @Res() res: Response) {
        const user = req.user as { sub: string; email: string }
        return this.authService.refreshToken(user, res);
    }
}
