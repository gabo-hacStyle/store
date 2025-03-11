'use server';

import {  BlobSASPermissions, BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';

// import { ContainerClient } from '@azure/storage-blob';
// import { BlobClient } from '@azure/storage-blob';

type Blob = {
    name: string;
    url: string;
}



//Listar blobs
export async function listBlobs() {
    try {
        const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
        if(!connectionString) {
            throw new Error('Azure storage connection string not found');
        }

        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        const containerClient = blobServiceClient.getContainerClient('music');
        

        console.log('\nAzure Blob storage v12 - JavaScript quickstart sample\n');
        console.log('\nListing blobs...');

        const blobNames: Blob[] = []

        const listBlobsFlat = async () => {
            for await (const blob of containerClient.listBlobsFlat()) {
                const tempBlockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(blob.name);
           
                // console.log('\t', blob.name);
                // console.log('\t', tempBlockBlobClient.url);
                


                blobNames.push({
                    name: blob.name,
                    url: tempBlockBlobClient.url
                });

                
            }
        };

        listBlobsFlat().catch((err) => {
            console.error('Error running sample:', err.message);
        }
        )

        await listBlobsFlat();

        return blobNames;

        
    } catch (error) {
        
    }
}

//Descargar blobs


export const bringSingleBlob = async (
    blobName: string,
    
) => {
    console.log('Blob name:', blobName);
    try {
        const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
        if(!connectionString) {
            throw new Error('Azure storage connection string not found');
        }

        const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
        const containerClient = blobServiceClient.getContainerClient('files');
        // console.log('Container client:', containerClient.listBlobsFlat());

        const listBlobsFlat = async () => {
            for await (const blob of containerClient.listBlobsFlat()) {
                const tempBlockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(blob.name);
           
                console.log('\t', blob.name);
                console.log('\t', tempBlockBlobClient.url);
                


               

                
            }
        };
        const blockBlobClient = containerClient.getBlockBlobClient(blobName);
        await listBlobsFlat();
        

        try {
            const expiryTime = new Date();
            expiryTime.setMinutes(expiryTime.getMinutes() + 4);
            const sasUrl = await blockBlobClient.generateSasUrl({ expiresOn: expiryTime, permissions: BlobSASPermissions.parse("r") });

            return sasUrl; 
        } catch (error) {
            console.error('Error generating SAS:', error);
            return null;
        }
    } catch (error) {
        return null;
    }
}