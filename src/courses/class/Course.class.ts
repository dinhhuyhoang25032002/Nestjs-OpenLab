import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
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

    @IsOptional()
    @IsString()
    readonly type: string;

    @IsNotEmpty()
    @IsString()
    readonly subType: string;

    @IsArray()
    @IsOptional()
    users: Array<Object>

    @IsOptional()
    @IsString()
    readonly startNumber?: string

    @IsArray()
    //  @IsNotEmpty()
    @IsOptional()
    readonly lessons: Array<Object>
}

export class UpdateCourse extends PartialType(CourseClass) { }