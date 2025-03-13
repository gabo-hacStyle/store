'use server'

import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN_MEPA_DEV || '',
    options: { timeout: 5000 } });
const payment = new Payment(client);




export const makePayment = async (data: any) => {
     payment.create({
        body: data
    }).then((response) => {
        console.log(response);
        return response;
    }).catch((error) => {
        console.error(error);
    }
    );

    


;}