
// import * as mongoose from 'mongoose';
// import * as MongooseDelete from 'mongoose-delete';
// import { UserInterface } from '@users/interface/User.interface';
// const UserChema = new mongoose.Schema(
//     {
//         email: { type: String, require: true, unique: true },
//         password: { type: String, require: true },
//         fullname: { type: String, require: true },
//         address: { type: String, require: true },
//         image: { type: String, require: true },
//         dateOfBirth: { type: String, require: true },
//     },
//     { timestamps: true }
// );

// UserChema.plugin(MongooseDelete, { deletedBy: true });

// export default UserChema;

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose"
@Schema({ timestamps: true })
export class User extends Document {

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ require: true, select: false })
    password: string;

    @Prop({ require: true })
    fullname: string;

    @Prop({ require: false })
    address: string;

    @Prop({ require: false })
    image?: string;

    @Prop({ require: false })
    dateOfBirth: string;

    @Prop({ require: false })
    provider: string;
    
    @Prop({ required: true })
    role: string;
}

export const USER_MODEL = User.name;
export const UserSchema = SchemaFactory.createForClass(User);


