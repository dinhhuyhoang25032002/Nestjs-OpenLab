import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';

type dataSlideType = {
  image?: string;
  description?: string;
};
type dataContentNote = {
  title: string;
  description: string;
};
type tabType = {
  title: string;
  image?: string;
  description?: Array<string>;
};
export type Item = {
  nameItem: string;
};
export class ContentLesson {
  dataSlides?: dataSlideType[];
  contentText?: Array<string>;
  dataPlus?: dataContentNote[];
  title?: Array<string>;
  dataVideo?: string;
  dataImage?: string;
  dataTab?:tabType[]
}

@Schema({ timestamps: true })
export class Lesson extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  linkVideo: string;

  @Prop({ required: true })
  linkImage: string;

  @Prop({ type: Array<ContentLesson>, required: true })
  content: ContentLesson[];

  @Prop({ type: Array<Item>, required: true })
  indexItem: Item[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true })
  course: ObjectId;
}
export const LESSON_MODEL = Lesson.name;
export const LessonSchema = SchemaFactory.createForClass(Lesson);
