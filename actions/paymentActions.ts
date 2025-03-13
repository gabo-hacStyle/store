'use server';

import { makePaymentPse } from "@/services/mepa/pse";
import { makePayment } from "@/services/mepa/xcard";

export const submitPaymentHandler = async (data: any) => {
    console.log(data);

    switch (data.payment_method_id) {
        case 'pse': async () => {
            await makePaymentPse(data);
        }
        break;
        // case 'efecty': async () => {
        //     const answ  = await makePayment(data);
        //     if (answ.transaction_details) {
        //         console.log(answ.transaction_details.external_resource_url);
        //     } else {
        //         console.error('Transaction details are undefined');
        //     }
        // }
        break;
        default: (async () => {
            await makePayment(data);

        })();

    }
    
}