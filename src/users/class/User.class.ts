import { PartialType } from "@nestjs/mapped-types";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UserClass {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    readonly fullname: string;

    @IsNotEmpty()
    @IsString()
    readonly address: string;

    @IsOptional()
    @IsString()
    readonly image?: string;

    @IsNotEmpty()
    @IsString()
    readonly dateOfBirth: string;

    // @IsOptional()
    // @IsString()
    // readonly role?: string;
}

export class UpdateUser extends PartialType(UserClass) { }