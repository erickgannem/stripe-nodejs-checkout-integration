import { Stripe } from 'stripe';
import { Request, Response } from 'express';

const { STRIPE_API_SECRET_KEY }: {STRIPE_API_SECRET_KEY: string} = process.env;

const stripe = new Stripe(STRIPE_API_SECRET_KEY, { apiVersion: '2020-08-27' });

export default class PaymentController {
  static async create(req: Request, res: Response) {
    return res.json(process.env.STRIPE_API_SECRET_KEY);
  }
}
