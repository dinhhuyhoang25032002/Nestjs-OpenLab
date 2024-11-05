import { Body, Controller, HttpCode, HttpStatus, Patch, Post, Res } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { Response } from 'express';
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paymentService: PaymentsService,
  ) { }

  @Patch('buy-course')
  @HttpCode(HttpStatus.OK)
  async buyACourse(@Body() info: { userId: string, courseId: string }, @Res() res: Response) {
    return this.paymentService.handleBuyACourse(info, res)
  }

  @Post('callback')
  @HttpCode(HttpStatus.NO_CONTENT)
  async hanhdleCallbackPayment(@Body() info: { userId: string, courseId: string }, @Res() res: Response) {
    console.log('sdfsdf');

    return res.status(204).json({})
  }
}
