import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Image from 'next/image'
import Header from '../../components/Header'
import Logo from '../../public/assets/logo.png'

export default function LoginPage() {
  const [loginInfo, setLoginInfo] = useState({
    usuario: '',
    password: ''
  })
  const [error, setError] = useState('')
  const router = useRouter()

  const handleChange = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value.trim()
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (loginInfo.usuario === '' || loginInfo.password === '') {
      // If fields are empty, display an error message
      setError('Debes introducir un usuario y una contraseña.')
      return
    }
    if (loginInfo.usuario.length < 8 || loginInfo.password.length < 8) {
      setError('Introduzca un usuario y contraseña validos.')
      return
    }
    try {
      const response = await axios.post('/api/getUser', loginInfo, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
      const { token } = await response.data.data
      localStorage.setItem('token', token)
      router.push('/')
    } catch (error) {
      setError('Credenciales inválidas.')
    }
  }

  return (
    <>
      <Header title={'Inicio'} description={'Página de Inicio UOR'} />
      <main className='h-screen overflow-hidden'>
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
              <div className='relative flex bg-transparent text-gray-800 antialiased flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12 opacity-70'>
                <div className='relative py-3 sm:w-96 mx-auto text-center'>
                  <span className='mt-5 mx-3 text-center text-2xl text-gray-500 opacity-80'>
                    Ingresar
                  </span>
                  <div className='mt-4 bg-white shadow-md rounded-lg text-left'>
                    <div className='h-2 bg-emerald-800 rounded-t-md'></div>
                    <div className='px-8 py-6 '>
                      <label className='block font-semibold'>Usuario:</label>
                      <input
                        type='text'
                        placeholder='Usuario'
                        className='placeholder:italic placeholder:text-slate-400 border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-emerald-500 focus:ring-1 rounded-md'
                        name='usuario'
                        onChange={handleChange}
                      />
                      <label className='block mt-3 font-semibold'>
                        Contraseña:
                      </label>
                      <input
                        type='password'
                        placeholder='Contraseña'
                        name='password'
                        className='placeholder:italic placeholder:text-slate-400 border w-full h-5 px-3 py-5 mt-2 hover:outline-none focus:outline-none focus:ring-emerald-500 focus:ring-1 rounded-md'
                        onChange={handleChange}
                      />
                      <div className='flex justify-between items-baseline'>
                        <button
                          type='submit'
                          className='w-full mt-10 bg-emerald-800 text-white py-2 px-6 rounded-md hover:bg-emerald-600 '
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
