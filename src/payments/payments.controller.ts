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
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Response, Request } from 'express';
@Controller('payments')
export class PaymentsController {
  constructor(private readonly paymentService: PaymentsService) {}

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
  async handleGetLinkForPayment(@Res() res: Response) {
    console.log('asdasd');
    
    return this.paymentService.handleGetLinkForPayment(res);
  }

  @Post()
  async handleConfirmPayment(@Body() info: any, @Res() res: Response) {
    console.log(info);
    return res.status(200).json({
      success: true,
    });
  }
}
