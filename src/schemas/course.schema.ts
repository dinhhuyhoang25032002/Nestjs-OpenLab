import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types, Document } from "mongoose";

@Schema({ timestamps: true })

export class Course extends Document {
    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true })
    price: string;
}

export const COURSE_MODEL = Course.name;
export const CourseSchema = SchemaFactory.createForClass(Course);