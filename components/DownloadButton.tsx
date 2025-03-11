'use client';
import React from 'react'
// import { bringSingleBlob } from '@/services/azure/music';
// import { BlobClient } from '@azure/storage-blob';


interface DownloadButtonProps {
    blobName: string;
}

const DownloadButton = ({blobName}: DownloadButtonProps) => {
  async function downloadFile(){
    const response = await fetch(`/api?blobName=${blobName}`);
    const data = await response.json();
    const url = await data.url;
    console.log(url);

    if (!url) {
      throw new Error('Failed to get SAS URL');
  }
  const fileResponse = await fetch(url);
  const blob = await fileResponse.blob();

  // Crear un enlace de descarga
  const downloadUrl = window.URL.createObjectURL(blob);

  // Crear un enlace de descarga
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', 'alex-campos.zip');
  document.body.appendChild(link);
  link.click();
  link.remove();

  }

  

  // c

    const handleClickDownload = async () => {
        try {


          downloadFile();


           // const buffer = await bringSingleBlob(blobName);
            //console.log('Buffer:', buffer);
           

            // // Convertir el buffer en un Blob
            // const blob = new Blob([buffer], { type: 'audio/mpeg' });

            // // Crear un enlace de descarga
            // const url = window.URL.createObjectURL(blob);
            // const a = document.createElement('a');
            // a.href = url;
            // a.download = blobName; // Nombre del archivo a descargar
            // document.body.appendChild(a);
            // a.click();
            // a.remove();
            // window.URL.revokeObjectURL(url);

            // alert('File downloaded successfully!');
        } catch (error) {
            console.error('Error downloading file:', error);
            alert('Failed to download file.');
        }
    };
    
  return (
    
    <button 
        onClick={handleClickDownload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Download
    </button>
  )
}

export default DownloadButton