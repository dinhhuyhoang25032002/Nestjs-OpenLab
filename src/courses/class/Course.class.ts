import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { PartialType } from '@nestjs/mapped-types'
import { dataBenefit } from "@schemas/course.schema";
export class CourseClass {

    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @IsOptional()
    @IsString()
    readonly benefit: Array<dataBenefit>;

    @IsNotEmpty()
    @IsString()
    readonly description: string;

    @IsNotEmpty()
    @IsString()
    readonly price: string;

    @IsNotEmpty()
    @IsString()
    readonly image: string;

    @IsNotEmpty()
    @IsString()
    readonly video: string;

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
    readonly starNumber?: string

    @IsArray()
    //  @IsNotEmpty()
    @IsOptional()
    readonly lessons: Array<Object>
}

export class UpdateCourse extends PartialType(CourseClass) { }