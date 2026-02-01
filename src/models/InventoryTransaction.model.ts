import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  product: mongoose.Types.ObjectId;
  type: 'INBOUND' | 'OUTBOUND' | 'ADJUSTMENT'; 
  quantity: number;
  reason?: string | undefined; 
}

const TransactionSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  type: { type: String, enum: ['INBOUND', 'OUTBOUND', 'ADJUSTMENT'], required: true },
  quantity: { type: Number, required: true },
  reason: { type: String }
}, { timestamps: true }); 

export const TransactionModel = mongoose.model<ITransaction>('Transaction', TransactionSchema);