import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { getSession, useSession } from 'next-auth/react'

import TextInput from '../components/textinput'
import Layout from '../components/layout'
import Select from '../components/select'
import options from '../data/captec.json'

export default function Home({ sessionData }) {
  const router = useRouter()
  /*  const { num_emp, puesto, nombre_completo } = sessionData.session.user.data */
  console.log(sessionData)
  const { data, status } = useSession()

  const loading = status === 'loading'

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/auth/signin')
    }
  }, [status])

  if (status === 'authenticated')
    return (
      <Layout>
        <div className='w-full flex flex-col gap-2 p-4 items-center'>
          <div>Bienvenido: {'Hola'}</div>
          <form className='w-full grid grid-rows-1 gap-2'>
            <TextInput placeholder={'Asesor Técnico'} name={'nombre'} />
            <TextInput placeholder={'Razón Social'} name={'rs'} />
            <TextInput placeholder={'Estado'} name={'estado'} />
            <TextInput placeholder={'RFN'} name={'rfn'} />
            <Select options={options} />
          </form>
        </div>
      </Layout>
    )
  return <p>Loading</p>
}

export async function getServerSideProps(context) {
  const { req } = context
  const session = await getSession({ req })
  const sessionData = { session }

  return {
    props: {
      sessionData
    }
  }
}
