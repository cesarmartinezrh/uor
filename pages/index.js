import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'

import TextInput from '../components/textinput'
import Layout from '../components/layout'
import Select from '../components/select'
import options from '../data/captec.json'

export default function Home({ sessionData = { session: null } }) {
  const router = useRouter()
  const { session } = sessionData

  useEffect(() => {
    if (session === null) {
      router.replace('/auth/signin')
    }
  }, [session, router])

  const [filter, setFilter] = useState({})

  const [asesores, setAsesores] = useState([])

  const handleChange = (e) => {
    const { value, name } = e.target
    setFilter((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const objParams = `${new URLSearchParams(filter).toString()}`
    console.log(objParams)

    try {
      const filteredData = await fetch(
        `http://localhost:3000/api/getAsesores?${objParams}`
      )
      const response = await filteredData.json()
      setAsesores(response)
    } catch (error) {
      throw new Error(error)
    }
  }

  if (session) {
    const { nombre_completo, num_emp } = session.user.data
    return (
      <Layout title={'Inicio'}>
        <div className='w-full flex flex-col gap-2 p-4 items-center'>
          <div>Bienvenido: {nombre_completo}</div>
          <form
            onSubmit={handleSubmit}
            className='w-full grid grid-rows-1 gap-2'
          >
            <input
              type='text'
              onChange={handleChange}
              placeholder={'Asesor Técnico'}
              name='nombre'
            />
            <input
              type='text'
              onChange={handleChange}
              placeholder={'Razón Social'}
              name='rs'
            />
            <input
              type='text'
              onChange={handleChange}
              placeholder={'Estado'}
              name='estado'
            />
            <input
              type='text'
              onChange={handleChange}
              placeholder={'RFN'}
              name='rfn'
            />
            <Select options={options} />
            <button type='submit'>Send it!</button>
          </form>
          {asesores ? JSON.stringify(asesores, null, 3) : <p>Sin resultados</p>}
        </div>
      </Layout>
    )
  }

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
