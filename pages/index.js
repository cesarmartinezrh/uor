import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import TextInput from '../components/textinput'
import Layout from '../components/layout'
import Select from '../components/select'
import options from '../data/captec.json'

export default function Home() {
  const router = useRouter()
  const [filter, setFilter] = useState({})
  const [asesores, setAsesores] = useState([])
  const session = useSession()

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.replace('/auth/signin')
    }
  }, [session.status])

  const handleChange = (e) => {
    const { value, name } = e.target
    setFilter((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const objParams = `${new URLSearchParams(filter).toString()}`
    try {
      const filteredData = await fetch(`/api/getAsesores?${objParams}`)
      const response = await filteredData.json()
      setAsesores(response)
    } catch (error) {
      throw new Error(error)
    }
  }

  if (session.status === 'authenticated') {
    const searchInputs = [
      { placeholder: 'Asesor Técnico', name: 'nombre' },
      { placeholder: 'Razón Social', name: 'rs' },
      { placeholder: 'Estado', name: 'estado' },
      { placeholder: 'RFN', name: 'rfn' }
    ]
    return (
      <Layout title={'Inicio'}>
        <div className='w-full flex flex-col gap-2 p-4 items-center'>
          <div>Bienvenido: {'hi'}</div>
          <form
            onSubmit={handleSubmit}
            className='w-full grid grid-rows-1 gap-2'
          >
            {searchInputs.map((input) => (
              <input
                type='text'
                onChange={handleChange}
                key={input.name}
                placeholder={input.placeholder}
                name={input.name}
              />
            ))}
            <Select options={options} />
            <button type='submit'>Send it!</button>
          </form>
          {asesores ? JSON.stringify(asesores, null, 3) : <p>Sin resultados</p>}
        </div>
      </Layout>
    )
  } else {
    // Return a loading spinner or message if the session is null
    return <div>Loading...</div>
  }
}
