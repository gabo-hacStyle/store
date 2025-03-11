// import { getProducts } from "@/services/shopify"

import { bringSingleBlob, listBlobs } from "@/services/azure/music"
import { NextRequest } from 'next/server';



// /{blobName}
export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const blobName = searchParams.get('blobName');
    
    if (!blobName) {
        return new Response('Blob name is required', { status: 400 });
    }

    const url = await bringSingleBlob('alex-campos.zip');

    return new Response(JSON.stringify({ url }), {
        headers: { 'Content-Type': 'application/json' },
    });
}