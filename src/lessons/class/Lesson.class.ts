import { ContentLesson, Item } from '@schemas/lesson.schema';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class LessonClass {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly linkImage: string;

  @IsNotEmpty()
  @IsArray()
  readonly content: ContentLesson[];

  @IsArray()
  @IsNotEmpty()
  readonly indexItem: Item[];

  @IsString()
  @IsNotEmpty()
  readonly course: string;
}
export class UpdateLesson extends PartialType(LessonClass) {}
