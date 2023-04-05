import { useState } from 'react'
const axios = require('axios').default
import Image from 'next/image'
import Header from '../components/Header'
import Logo from '../public/assets/logo.png'

export default function Home() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios({
        method: 'post',
        url: 'http://187.218.23.71/API_REST/api/autorizacion',
        data: {
          usuario: username,
          password
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      alert(JSON.stringify(response, null, 2))
      const { token } = await response.data.data
      localStorage.setItem('token', token)
    } catch (error) {
      console.log(error)
      setError('Credenciales inválidas')
    }
  }
  return (
    <>
      <Header title={'Inicio'} description={'Página de Inicio UOR'} />
      <main className='h-screen'>
        <header className="w-full h-full bg-[url('../public/assets/woods.jpg')] bg-cover bg-center flex justify-center items-center">
          <div className='flex flex-col justify-center items-center gap-4'>
            <Image
              src={Logo}
              alt={'Logotipo de la Comisión Nacional Forestal'}
              width={400}
              height={200}
            />
            <h1 className=' text-center text-5xl text-white font-bold drop-shadow-lg'>
              UNIDAD DE OPERACIÓN REGIONAL
            </h1>
            <p className='mt-5 mx-3 text-center text-xl text-gray-500 opacity-80'>
              Sistema informático para la administración de información dentro
              de la Unidad de Operación Regional
            </p>
            {error && <p className='text-3xl text-red-600 '>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div class='relative flex bg-transparent text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12 opacity-70'>
                <div class='relative py-3 sm:w-96 mx-auto text-center'>
                  <span class='mt-5 mx-3 text-center text-2xl text-gray-500 opacity-80'>
                    Ingresar
                  </span>
                  <div class='mt-4 bg-white shadow-md rounded-lg text-left'>
                    <div class='h-2 bg-emerald-800 rounded-t-md'></div>
                    <div class='px-8 py-6 '>
                      <label class='block font-semibold'>Usuario:</label>
                      <input
                        type='text'
                        placeholder='Usuario'
                        class='placeholder:italic placeholder:text-slate-400 border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-emerald-500 focus:ring-1 rounded-md'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                      <label class='block mt-3 font-semibold'>
                        Contraseña:
                      </label>
                      <input
                        type='password'
                        placeholder='Contraseña'
                        value={password}
                        class='placeholder:italic placeholder:text-slate-400 border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-emerald-500 focus:ring-1 rounded-md'
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <div class='flex justify-between items-baseline'>
                        <button
                          type='submit'
                          class='w-full mt-10 bg-emerald-800 text-white py-2 px-6 rounded-md hover:bg-emerald-600 '
                        >
                          Entrar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </header>
      </main>
    </>
  )
}
