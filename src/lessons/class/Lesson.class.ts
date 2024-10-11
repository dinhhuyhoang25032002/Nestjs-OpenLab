
import { ContentLesson } from "@schemas/lesson.schema";
import { IsNotEmpty, IsNotEmptyObject, IsObject, IsString } from "class-validator";
import { PartialType } from '@nestjs/mapped-types';

export class LessonClass {
    @IsNotEmpty()
    @IsString()
    readonly name: string

    @IsNotEmpty()
    @IsString()
    readonly linkVideo: string

    @IsNotEmpty()
    @IsString()
    readonly linkImage: string

    @IsNotEmptyObject()
    @IsObject()
    readonly content: ContentLesson

    @IsString()
    @IsNotEmpty()
    readonly course: string
}
export class UpdateLesson extends PartialType(LessonClass) { }