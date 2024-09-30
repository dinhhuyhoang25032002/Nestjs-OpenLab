import { IsNotEmpty, IsString } from "class-validator";
import { PartialType } from '@nestjs/mapped-types'
export class CourseClass {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    readonly price: string;

    @IsNotEmpty()
    @IsString()
    readonly image: string;
}

export class UpdateCourse extends PartialType(CourseClass) { }