import { Stripe } from 'stripe';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';

if (process.env.NODE_ENV === 'development') { dotenv.config({ path: path.resolve(process.cwd(), '.env.dev') }); }
if (process.env.NODE_ENV === 'production') { dotenv.config({ path: path.resolve(process.cwd(), '.env.prod') }); }

let STRIPE_API_SECRET_KEY: string;

if (process.env.STRIPE_API_SECRET_KEY) {
  STRIPE_API_SECRET_KEY = process.env.STRIPE_API_SECRET_KEY;
} else {
  STRIPE_API_SECRET_KEY = 'secret_key_not_found';
}

const stripe = new Stripe(STRIPE_API_SECRET_KEY, { apiVersion: '2020-08-27' });

export default class PaymentController {
  static async create(req: Request, res: Response) {
    try {
      const { amount, paymentData } = req.body;
      if (!paymentData) {
        throw new Error('Payment data not found');
      }
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency: 'brl',
        metadata: { integration_check: 'accept_a_payment' },
        payment_method: paymentData.id,
        confirm: true,
      });
      return res.status(200).json({ paymentIntent });
    } catch (err) {
      return res.status(400).json({ error: { message: err.message } });
    }
  }
}
