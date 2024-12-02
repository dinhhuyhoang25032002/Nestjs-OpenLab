import mongoose, { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({ timestamps: true })
export class Payments extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: string;
  @Prop({ required: true, unique: true })
  paymentsLinkId: string;
}
export const PAYMENT_MODEL = Payments.name;
export const PaymentSchema = SchemaFactory.createForClass(Payments);

PaymentSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });