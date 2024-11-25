import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { USER_MODEL } from '@schemas/users.schema';
import { PartialUser, UserClass } from '@users/class/User.class';
import { Model } from 'mongoose';
import { User } from '@schemas/users.schema';
import { hardData, compareData } from 'src/util/bcrypt';
import { Response } from 'express';
import { getToken } from '@util/auth';
import { JwtPayload } from './strategy/accessToken.strategy';
import { userFromGoogle } from 'src/types/CustomType';
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(USER_MODEL)
        private readonly userModel: Model<User>,
    ) { }

    async findUser(email: string) {
        const user = await this.userModel.findOne({ email: email });
        return user;
    }

    async validateUser(user: User) {
        const userDatabase = await this.userModel.findOne({ email: user.email });
        if (userDatabase) {
            return userDatabase;
        }
        const newUser = new this.userModel(user).save({ validateBeforeSave: true })
            .catch((e) => {
                throw new Error(e);
            });
        return newUser;
    }

    async createOneUser(user: PartialUser) {
        let { email, password } = user
        if (!email || !password) {
            throw new BadRequestException('Email or Password not empty');
        }
        const userExist = await this.userModel.findOne({ email: email })
        if (!userExist) {
            let passwordhard = await hardData(password);
            password = passwordhard;
            const UserSave = {
                ...user,
                role: 'user',
            }
            await new this.userModel(UserSave).save({ validateBeforeSave: true })
                .catch((e) => {
                    throw new Error(e);
                });
            return { message: 'User created succefully' };
        }
        throw new BadRequestException('Email already exists');
    }

    // async updateRtHash(userId: string, rt: string) {
    //     const hardRt = await hardData(rt);
    //     await this.userModel.updateOne({ _id: userId }, { refresh_token: hardRt }, { strict: true })
    // }

    async handleLogin(user: PartialUser, res: Response) {
        try {
            console.log('check user:', user);
            const { email, password } = user
            let User = await this.userModel.findOne({ email: email }).select('+password').exec();

            if (!User) {
                return res.send(
                    { errmessage: new BadRequestException('Wrong credentials') }
                )
            }
            if (!User.password && User.provider !== null) {
                return res.send(
                    { errmessage: new BadRequestException('user is exised') }
                )
            }
            console.log(User);

            //Validate password
            let checkPassword = await compareData(user.password as string, User.password);
            if (!checkPassword) {
                throw new ForbiddenException("Access Denied");
            }

            const userObject = User.toObject();
            delete userObject.password;

            const { accessToken, refreshToken } = await getToken(User._id, User.email);

            res.cookie('token', refreshToken,
                { httpOnly: true, secure: true, sameSite: "none", expires: new Date(Date.now() + 604800000), partitioned: true });

            return res.send({
                ...userObject,
                accessToken: accessToken,
            });
        } catch (e) {
            throw new Error(e);
        }
    }
    async handleLoginWithGoogle(user: userFromGoogle, res: Response) {
        try {
            const { email } = user;
            let dataUser = await this.userModel.findOne({ email }).exec();
            if (!dataUser) {
                dataUser = await this.userModel.create(user);
            }
            const { accessToken, refreshToken } = await getToken(dataUser._id, dataUser.email);
            res.redirect(`http://localhost:3000/auth?token=${accessToken}`)

        } catch (error) {
            throw new Error('Error processing Google login.');
        }
    }

    async handleLogout(res: Response) {
        res.clearCookie('token',
            { httpOnly: true, secure: true, sameSite: "none", expires: new Date(Date.now() + 604800000), partitioned: true });
        return res.send({ message: 'Logged out succefully' });
    }

    async refreshToken(jwt: JwtPayload, res: Response) {
        const { sub, email } = jwt;
        const tokens = await getToken(sub, email);
        res.cookie('token', tokens.refreshToken,
            { httpOnly: true, secure: true, sameSite: "none", expires: new Date(Date.now() + 604800000), partitioned: true });
        return res.send({
            accessToken: tokens.accessToken,
        });
    }
}
