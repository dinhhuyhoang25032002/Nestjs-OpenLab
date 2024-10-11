
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document, Mixed, ObjectId } from 'mongoose'
type dataSlideType = {
    title: string,
    image?: string,
    description: string
}
type dataContentNote = {
    title: string,
    description: string
}
export class ContentLesson {
    dataSlides: dataSlideType[];
    contentText: string;
    dataPlus: dataContentNote[]
    title: string
}

@Schema({ timestamps: true })
export class Lesson extends Document {
    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    linkVideo: string

    @Prop({ required: true })
    linkImage: string

    @Prop({ type: ContentLesson, required: true })
    content: ContentLesson | Mixed

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Course", required: true })
    course: ObjectId;
}
export const LESSON_MODEL = Lesson.name;
export const LessonSchema = SchemaFactory.createForClass(Lesson)