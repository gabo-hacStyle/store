
// import { createClient } from '@/services/db/server'
import { cookies } from 'next/headers'
import { createClient } from '@/services/db/server'
import RenderedListFromDb from '@/components/ListOfIdk'

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
        <li>{data.id}</li>
      ))}
    </ul>

      <RenderedListFromDb />
    </>
  )
}
