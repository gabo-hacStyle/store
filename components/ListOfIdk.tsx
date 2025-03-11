'use client';
import { createClient } from '@/services/db/client';

import React, { use, useCallback, useEffect } from 'react'
// import { getProducts } from '@/services/shopify';

const RenderedListFromDb =  () => {
const supabase = createClient();        

    const [products, setProducts] = React.useState<any>();

    const fetchItemsFromDatabase = useCallback(async () => {
        const { data: products, error } = await supabase.from('subcriptions')
        .select('*')
        setProducts(products);
    }, [supabase])

    useEffect(() => {
        fetchItemsFromDatabase();
    }, [supabase])

    console.log(products)
    return (
        <>
            <div className='grid grid-cols-4 gap-4'>
                {products?.map((product: any) => {
                    
                    return (
                        <article key={product.id} >
                            <h2>{product.referente}</h2>
                        </article>
                    ); 
                })} 
            </div>
        </>
    )
}

export default RenderedListFromDb;