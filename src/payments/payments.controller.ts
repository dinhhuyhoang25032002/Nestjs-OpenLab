import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Res,
  Req,
  Get,
  Query,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Response } from 'express';
import { RequestConfirm } from 'src/types/CustomType';
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) { }

  @Patch('buy-course')
  @HttpCode(HttpStatus.OK)
  async buyACourse(
    @Body() info: { userId: string; courseId: string },
    @Res() res: Response,
  ) {
    return this.paymentService.handleBuyACourse(info, res);
  }

  @Post('callback')
  @HttpCode(HttpStatus.NO_CONTENT)
  async hanhdleCallbackPayment(
    @Body() info: { userId: string; courseId: string },
    @Res() res: Response,
  ) {
    console.log('sdfsdf');
    return res.sendStatus(200);
  }

  @Get('get-link')
  @HttpCode(HttpStatus.CREATED)
  async handleGetLinkForPayment(
    @Query() query: { userId: string; courseId: string, type: string },
  ) {
    return this.paymentService.handleGetLinkForPayment(query);
  }

  @Post()
  async handleConfirmPayment(@Body() info: RequestConfirm, @Res() res: Response) {
    console.log(info);
    await this.paymentService.handleConfirmPayment(info);
    return res.status(200).json({
      success: true,
    });
  }
}
