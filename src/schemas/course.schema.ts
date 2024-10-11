import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, ObjectId } from "mongoose";


@Schema({ timestamps: true })
export class Course extends Document {

    @Prop({ required: true, unique: true })
    name: string;

    @Prop({ required: true })
    description: string;

    @Prop({ required: false })
    benefit: string;

    @Prop({ required: true })
    image: string;

    @Prop({ required: true })
    price: string;

    @Prop({ required: true })
    type: string;

    @Prop({ required: true })
    subType: string;

    @Prop()
    startNumber: string;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] })
    users?: Array<ObjectId>;

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Lesson" }], required: true })
    lessons: Array<ObjectId>;
}

export const COURSE_MODEL = Course.name;
export const CourseSchema = SchemaFactory.createForClass(Course);