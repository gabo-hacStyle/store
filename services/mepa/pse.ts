'use server'
import { MercadoPagoConfig, Payment } from 'mercadopago';

const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN_MEPA_DEV || '',
    options: { timeout: 5000 } });
const payment = new Payment(client);



export const makePaymentPse = async (data: any) => {

    const body: psebody = {
        transaction_amount: 5000,
        description: 'Product description',
        payment_method_id: 'pse',
        callback_url: 'http://www.your-site.com',
        notification_url: 'http://www.your-site.com',
        payer: {
          entity_type: 'individual',
          email: data.body.email,
          first_name: data.body.firstName,
          last_name: data.body.lastName,
          identification: {
            type: data.body.identificationType,
            number: data.body.identificationNumber
          },
          address: {
            zip_code: data.body.zipCode,
            street_name: data.body.streetName,
            street_number: data.body.streetNumber,
            neighborhood: data.body.neighborhood,
            city: data.body.city,
            federal_unit: data.body.federalUnit
          },
          phone: {
            area_code: data.body.phoneAreaCode,
            number: data.body.phoneNumber
          }
        },
        additional_info: {
          ip_address: '127.0.0.1'
        },
        transaction_details: {
          financial_institution: data.body.financialInstitution
        }
      };

    const response = await payment.create({
        body: data
    });
    console.log(response);
    return response;
}