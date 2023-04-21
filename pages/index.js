import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'

import Table from '../components/table'
import TextInput from '../components/textinput'
import Layout from '../components/layout'
import Select from '../components/select'
import captec from '../data/captec.json'
import states from '../data/states.json'

export default function Home() {
  const router = useRouter()
  const [filter, setFilter] = useState({})
  const [asesores, setAsesores] = useState([])
  const [error, setError] = useState(null)
  const session = useSession()
  console.log(asesores)

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
    const nonEmptyEntries = Object.fromEntries(
      Object.entries(filter).filter(([key, value]) => value !== '')
    )
    const params = new URLSearchParams(nonEmptyEntries).toString()
    try {
      const response = await fetch(`/api/getAsesores?${params}`, {
        cache: 'no-store'
      })
      const data = await response.json()
      setAsesores(data)
      setError(null)
      if (data.length < 1) {
        setError('Sin resultados')
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (session.status === 'authenticated') {
    const searchInputs = [
      { placeholder: 'Asesor técnico', name: 'rs' },
      { placeholder: 'Folio de asesor', name: 'folio' },
      { placeholder: 'Representante Legal', name: 'nombre' },
      { placeholder: 'RFN', name: 'rfn' }
    ]
    return (
      <Layout title={'Inicio'}>
        <div className='w-full flex flex-col gap-2 p-4 items-center'>
          <div>Bienvenido: {session?.data?.user?.data.nombre_completo}</div>
          <form onSubmit={handleSubmit} className='flex w-full gap-2'>
            <div className='w-full grid grid-cols-1 gap-4 place-items-center xl:grid-cols-3'>
              {searchInputs.map((input) => (
                <TextInput
                  type='text'
                  onChange={handleChange}
                  key={input.name}
                  placeholder={input.placeholder}
                  name={input.name}
                />
              ))}
              <Select
                selectName={'Capacidad Técnica'}
                name={'ct'}
                onChange={handleChange}
                options={captec}
              />
              <Select
                selectName={'Entidad Federativa'}
                name={'estado'}
                onChange={handleChange}
                options={states}
              />
              <Select
                selectName={'Tipo de persona'}
                name={'tpd'}
                onChange={handleChange}
                options={[
                  { key: 'fisica', description: 'FISICA' },
                  { key: 'moral', description: 'MORAL' }
                ]}
              />
              <button
                className='rounded-none bg-emerald-800 hover:bg-emerald-600 text-slate-50 text-1xl px-4 py-2'
                type='submit'
              >
                Buscar
              </button>
            </div>
          </form>

          {asesores.length > 0 ? <Table data={asesores} /> : null}
          {error !== null ? <p>{error}</p> : null}
        </div>
      </Layout>
    )
  } else {
    // Return a loading spinner or message if the session is null
    return <div>Loading...</div>
  }
}
