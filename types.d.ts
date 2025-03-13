interface psebody {
    transaction_amount: number;
    description: string;
    payment_method_id: string;
    callback_url: string;
    notification_url: string;
    payer: {
        entity_type: string;
        email: string;
        first_name: string;
        last_name: string;
        identification: {
            type: string;
            number: string;
        };
        address: {
            zip_code: string;
            street_name: string;
            street_number: string;
            neighborhood: string;
            city: string;
            federal_unit: string;
        };
        phone: {
            area_code: string;
            number: string;
        };
    };
    additional_info: {
        ip_address: string;
    };
    transaction_details: {
        financial_institution: string;
    };
}