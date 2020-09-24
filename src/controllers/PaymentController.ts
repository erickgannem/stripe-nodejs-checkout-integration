import { Stripe } from 'stripe';
import { Request, Response } from 'express';
import { errorMonitor } from 'stream';

const { STRIPE_API_SECRET_KEY }: {STRIPE_API_SECRET_KEY: string} = process.env;

const stripe = new Stripe(STRIPE_API_SECRET_KEY, { apiVersion: '2020-08-27' });

export default class PaymentController {
  static async create(req: Request, res: Response) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        // amount placeholder
        amount: 1000,
        currency: 'brl',
        metadata: { integration_check: 'accept_a_payment' },
      });
      res.status(200).json({ client_secret: paymentIntent.client_secret });
    } catch (error) {
      res.status(400).json({ error });
    }
  }
}
