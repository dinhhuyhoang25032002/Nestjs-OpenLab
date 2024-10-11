import { PartialType } from "@nestjs/mapped-types";
import { IsNotEmpty, IsNotEmptyObject, IsObject, IsString } from "class-validator";

export class HistoryClass {

    @IsNotEmpty()
    @IsString()
    userId: string;

    @IsNotEmpty()
    @IsString()
    commodityId: string;

    @IsNotEmpty()
    @IsString()
    commodityType: string;

    @IsNotEmpty()
    @IsString()
    moneyTraded: string;
}

export class UpdateUser extends PartialType(HistoryClass) { }