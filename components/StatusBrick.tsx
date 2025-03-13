'use client';

import { StatusScreen } from '@mercadopago/sdk-react';
import { IBrickError } from '@mercadopago/sdk-react/esm/bricks/util/types/common';
import React, { useEffect, useRef } from 'react';

declare global {
  interface Window {
    statusScreenBrickController: any;
  }
}

const StatusBrick = () => {
  const statusBrickControllerRef = useRef<any>(null);

  const initialization = {
    paymentId: ''
  };
  const onError = async (error: IBrickError) => {
    // callback llamado para todos los casos de error de Brick
    console.log('onError:', error);
  };
  const onReady = async () => {
    /*
      Callback llamado cuando Brick está listo.
      Aquí puede ocultar cargamentos de su sitio, por ejemplo.
    */
    console.log('Brick is ready');
  };

  useEffect(() => {
    // Guardar la referencia del controlador del Brick
    statusBrickControllerRef.current = window.statusScreenBrickController;
    console.log('Brick mounted');

    return () => {
      // Desmontar la instancia del Brick al salir de la pantalla
      if (statusBrickControllerRef.current) {
        statusBrickControllerRef.current.unmount();
        console.log('Brick unmounted');
      }
    };
  }, []);

  return (
   <StatusScreen 
    initialization={initialization}
    onError={onError}
    onReady={onReady}
  />
   
  );
}

export default StatusBrick;