
// import { createClient } from '@/services/db/server'
import { cookies } from 'next/headers'
import { createClient } from '@/services/db/server'
import RenderedListFromDb from '@/components/ListOfIdk'
import PaymentBrick from '@/components/PaymentBrick'

export default async function Page() {
  // const cookieStore = await cookies();
  // const supabase = createClient(await cookies())
  const supabase = await createClient()

  
  
let { data: subcriptions, error } = await supabase
.from('subcriptions')
.select('id')



    console.log('subcriptions', subcriptions)


  return (
    <>
      <ul>
      {subcriptions?.map((data: any) => (
        <li key={data.id}>{data.id}</li>
      ))}
    </ul>

      <RenderedListFromDb />
      <section>
        <h1 className='text-4xl'>Pago:</h1>
        <div className="flex justify-center items-center mx-auto w-4/5">
        <PaymentBrick />
        </div>

        
      </section>
    </>
  )
}
