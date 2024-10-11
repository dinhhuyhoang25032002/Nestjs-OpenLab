import { PartialType } from "@nestjs/mapped-types";
import { IsArray, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class ShoppingCartClass {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsArray()
    @IsOptional()
    listItem?: Array<{ itemId: string, type: string }>
}

export class UpdateShoppingCart extends PartialType(ShoppingCartClass) { }