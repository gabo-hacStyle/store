'use client';
import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    paymentBrickController: any;
  }
}
import { initMercadoPago, Payment } from '@mercadopago/sdk-react';
import { IBrickError } from '@mercadopago/sdk-react/esm/bricks/util/types/common';
import { IPaymentFormData } from '@mercadopago/sdk-react/esm/bricks/payment/type';
import { submitPaymentHandler } from '@/actions/paymentActions';

initMercadoPago('TEST-c9141262-2dd5-452d-976d-9b165dcff718');

const PaymentBrick = () => {
  const paymentBrickControllerRef = useRef<any>(null);

  const initialization = {
    amount: 10000,
    preferenceId: "<PREFERENCE_ID>",
  };
  const customization = {
    paymentMethods: {
      ticket: 'all',
      bankTransfer: 'all',
      creditCard: 'all',
      prepaidCard: ['all'],
      debitCard: 'all',
      mercadoPago: 'all',
      atm: 'all'
    },
  };
  const onSubmit = async (
    { formData }: { formData: any },
  ) => {
    // callback llamado al hacer clic en el botón enviar datos
    console.log(formData);
    await submitPaymentHandler(formData);
    return null;
  };
  const onError = async (error: IBrickError) => {
    // callback llamado para todos los casos de error de Brick
    console.log(error);
  };
  const onReady = async () => {
    /*
      Callback llamado cuando el Brick está listo.
      Aquí puede ocultar cargamentos de su sitio, por ejemplo.
    */
      console.log('Brick is ready');
  };

  useEffect(() => {
    // Guardar la referencia del controlador del Brick
    paymentBrickControllerRef.current = window.paymentBrickController;
    console.log('Brick mounted');

    return () => {
      // Desmontar la instancia del Brick al salir de la pantalla
      if (paymentBrickControllerRef.current) {
        paymentBrickControllerRef.current.unmount();
        console.log('Brick unmounted');
      }
    };
  }, []);

  return (
    <Payment
      initialization={initialization}
      customization={customization}
      onSubmit={onSubmit}
      onReady={onReady}
      onError={onError}
    />
  );
};

export default PaymentBrick;