import { Stripe } from 'stripe';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

// dotenv.config();

const { STRIPE_API_SECRET_KEY_TEST } = process.env;

const stripe = new Stripe(STRIPE_API_SECRET_KEY_TEST, { apiVersion: '2020-08-27' });

export default class PaymentController {
  static async create(req: Request, res: Response) {
    console.log(STRIPE_API_SECRET_KEY_TEST);
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
      return res.status(200).json({ status: 'success', paymentIntent });
    } catch (err) {
      return res.status(400).json({ error: { message: err.message } });
    }
  }
}
