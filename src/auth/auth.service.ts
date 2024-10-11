import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { USER_MODEL } from '@schemas/users.schema';
import { UpdateUser, UserClass } from '@users/class/User.class';
import { Model } from 'mongoose';
import { User } from '@schemas/users.schema';
import { hardData, compareData } from 'src/util/bcrypt';
import { Response } from 'express';
import { getToken } from '@util/auth';
import { JwtPayload } from './strategy/accessToken.strategy';
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

    async createOneUser(User: UserClass) {
        const userExist = await this.userModel.findOne({ email: User.email })
        if (userExist) {
            throw new BadRequestException('Email already exists');
        }

        let password = await hardData(User.password);
        User.password = password;

        const UserSave = {
            ...User,
            role: 'user',
        }

        await new this.userModel(UserSave).save({ validateBeforeSave: true })
            .catch((e) => {
                throw new Error(e);
            });

        // const tokens = await getToken(userDb._id, userDb.email);
        // await this.updateRtHash(userDb._id, tokens.refresh_token);

        return { message: 'User created succefully' };
    }

    async updateRtHash(userId: string, rt: string) {
        const hardRt = await hardData(rt);
        await this.userModel.updateOne({ _id: userId }, { refresh_token: hardRt }, { strict: true })
    }

    async handleLogin(user: UpdateUser, res: Response) {
        try {
            //  console.log('check user:', user);
            let User = await this.userModel.findOne({ email: user.email }).select('+password').exec();

            if (!User) {
                return res.send(
                    { errmessage: new BadRequestException('Wrong credentials') }
                )
            }

            //Validate password
            let checkPassword = await compareData(user.password as string, User.password);
            if (!checkPassword) {
                throw new ForbiddenException("Access Denied");
            }

            const userObject = User.toObject();
            delete userObject.password;

            const tokens = await getToken(User._id, User.email);

            res.cookie('token', tokens.refreshToken,
                { httpOnly: true, secure: true, sameSite: "none", expires: new Date(Date.now() + 604800000), partitioned: true });

            return res.send({
                ...userObject,
                access_token: tokens.accessToken,
            });
        } catch (e) {
            throw new Error(e);
        }
    }

    async handleLogout(res: Response) {
        res.cookie('token', "",
            { httpOnly: true, secure: true, sameSite: "none", expires: new Date(Date.now()), partitioned: true });
        return res.send({ message: 'Logged out succefully' });
    }

    async refreshToken(user: JwtPayload, res: Response) {
        const { sub, email } = user;
        const tokens = await getToken(sub, email);
        res.cookie('token', tokens.refreshToken,
            { httpOnly: true, secure: true, sameSite: "none", expires: new Date(Date.now() + 604800000), partitioned: true });
        return res.send({
            access_token: tokens.accessToken,
        });
    }
}
