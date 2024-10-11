import { Body, Controller, Post } from '@nestjs/common';
import { ShoppingCartsService } from 'src/shopping-carts/shopping-carts.service';

@Controller('shopping-carts')
export class ShoppingCartsController {
    constructor(private readonly shoppingCartService: ShoppingCartsService) { }
    @Post()
    AddItemToCart(@Body() body: { userId: string, itemId: string, type: string }) {
        console.log('check body:', body);
        return this.shoppingCartService.handleAddItemToCart(body)
    }
}
