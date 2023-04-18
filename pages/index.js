import { getSession, getProviders } from 'next-auth/react'

import TextInput from '../components/textinput'
import Layout from '../components/layout'
import Select from '../components/select'
import options from '../data/captec.json'

export default function Home({ sessionData }) {
  const { num_emp, puesto, nombre_completo } = sessionData.session.user.data

  return (
    <Layout>
      <div className='w-full flex flex-col gap-2 p-4 items-center'>
        <div>Bienvenido: {nombre_completo}</div>
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
}

export async function getServerSideProps(context) {
  const { req } = context
  const session = await getSession({ req })
  const sessionData = { session }

  if (!session) {
    return {
      redirect: { destination: '/api/auth/signin' }
    }
  }
  return {
    props: {
      sessionData
    }
  }
}
