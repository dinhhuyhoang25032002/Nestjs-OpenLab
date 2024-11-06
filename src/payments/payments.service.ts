import { Injectable } from '@nestjs/common';
import { Course, COURSE_MODEL } from '@schemas/course.schema';
import { Response } from 'express';
import { CourseClass } from 'src/courses/class/Course.class';
import { History, HISTORY_MODEL } from '@schemas/history.schema';
import { HistoryClass } from 'src/histories/class/History.class';
import { InjectModel } from '@nestjs/mongoose';
import { UserClass } from '@users/class/User.class';
import { Model } from 'mongoose';
import { SoftDeleteModel } from 'mongoose-delete';
import { User, USER_MODEL } from '@schemas/users.schema';
import PayOS from '@payos/node';
type requestBodyForCreateLink = {
  orderCode: number;
  amount: number;
  description: string;
  cancelUrl: string;
  returnUrl: string;
  signature?: string;
  items?: { name: string; quantity: number; price: number }[];
  buyerName?: string;
  buyerEmail?: string;
  buyerPhone?: string;
  buyerAddress?: string;
  expiredAt?: number;
};
@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(COURSE_MODEL)
    private readonly courseModel: Model<Course> & SoftDeleteModel<Course>,
    @InjectModel(HISTORY_MODEL)
    private readonly historyModel: Model<History> & SoftDeleteModel<History>,
    @InjectModel(USER_MODEL)
    private readonly userModel: Model<User> & SoftDeleteModel<User>,
  ) {}

  async handlePayment() {
    //https://developers.momo.vn/#/docs/en/aiov2/?id=payment-method
    //parameters
    var accessKey = 'F8BBA842ECF85';
    var secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
    var orderInfo = 'pay with MoMo';
    var partnerCode = 'MOMO';
    var redirectUrl =
      'https://webhook.site/b3088a6a-2d17-4f8d-a383-71389a6c600b';
    var ipnUrl = 'https://c7b4-59-153-220-111.ngrok-free.app/payments/callback';
    var requestType = 'payWithMethod';
    var amount = '50000';
    var orderId = partnerCode + new Date().getTime();
    var requestId = orderId;
    var extraData = '';
    var orderGroupId = '';
    var autoCapture = true;
    var lang = 'vi';

    //before sign HMAC SHA256 with format
    //accessKey=$accessKey&amount=$amount&extraData=$extraData&ipnUrl=$ipnUrl&orderId=$orderId&orderInfo=$orderInfo&partnerCode=$partnerCode&redirectUrl=$redirectUrl&requestId=$requestId&requestType=$requestType
    var rawSignature =
      'accessKey=' +
      accessKey +
      '&amount=' +
      amount +
      '&extraData=' +
      extraData +
      '&ipnUrl=' +
      ipnUrl +
      '&orderId=' +
      orderId +
      '&orderInfo=' +
      orderInfo +
      '&partnerCode=' +
      partnerCode +
      '&redirectUrl=' +
      redirectUrl +
      '&requestId=' +
      requestId +
      '&requestType=' +
      requestType;
    //puts raw signature
    console.log('--------------------RAW SIGNATURE----------------');
    console.log(rawSignature);
    //signature
    const crypto = require('crypto');
    var signature = crypto
      .createHmac('sha256', secretKey)
      .update(rawSignature)
      .digest('hex');
    console.log('--------------------SIGNATURE----------------');
    console.log(signature);

    //json object send to MoMo endpoint
    const requestBody = JSON.stringify({
      partnerCode: partnerCode,
      partnerName: 'Test',
      storeId: 'MomoTestStore',
      requestId: requestId,
      amount: amount,
      orderId: orderId,
      orderInfo: orderInfo,
      redirectUrl: redirectUrl,
      ipnUrl: ipnUrl,
      lang: lang,
      requestType: requestType,
      autoCapture: autoCapture,
      extraData: extraData,
      orderGroupId: orderGroupId,
      signature: signature,
    });

    try {
      const res = await fetch(
        'https://test-payment.momo.vn/v2/gateway/api/create',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(requestBody).toString(),
          },
          body: requestBody,
        },
      ).then((res) => res.json());
      return res;
    } catch (error) {
      throw new Error(error);
    }
  }

  async handleBuyACourse(
    infor: { userId: string; courseId: string },
    res: Response,
  ) {
    const { userId, courseId } = infor;
    const user = await this.userModel.findById(userId);
    if (!user) {
      return res.status(200).send({ message: 'Không tồn tại người dùng' });
    }

    const course = await this.courseModel.findById(courseId);
    if (!course) {
      return res
        .status(200)
        .send({ message: 'Không tồn tại khóa học bạn cần đăng kí!' });
    }
    const dataFromMomo = await this.handlePayment();

    const listUserActive = (course as CourseClass).users;
    const listCourseBought = (user as UserClass).courses;

    if (!listUserActive.includes(userId)) {
      listUserActive.push(userId);
      await course?.save();
    }
    if (!listCourseBought.includes(courseId)) {
      listCourseBought.push(courseId);
      await user?.save();
    }

    const historyData = await this.historyModel.find({
      userId: user?._id,
      commodityId: course?._id,
    });

    if (historyData.length === 0) {
      const history: HistoryClass = {
        userId: userId,
        commodityId: courseId,
        commodityType: course.type,
        moneyTraded: course.price,
      };
      await new this.historyModel(history).save();
    }

    return res.status(200).send({
      message: 'Đăng kí thành công',
      data: {
        // listcourse: user?.courses,
        // user: user?._id,
        response: dataFromMomo,
      },
    });
  }

  async handleGetLinkForPayment(res: Response) {
    const payos = new PayOS(
      'cbef30a1-36c0-4062-926c-94a2ff798465',
      '99520a1a-5c9c-4d44-aa54-4bae11d27767',
      '7169882514c4a20b4c593fa0143fcc69c5ffab0400cdf0270104c3dbac9acbf3',
    );
    const requestData: requestBodyForCreateLink = {
      orderCode: 10,
      amount: 10000,
      description: 'Khóa học thực hành mạng di động 5g',
      cancelUrl: 'https://openlab.com.vn/',
      returnUrl: 'https://openlab.com.vn/',
    };
    const responsetData = await payos.createPaymentLink(requestData);
    return res.status(200).json({
      responsetData: responsetData,
    });
  }
}
