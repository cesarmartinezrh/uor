import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { signIn, useSession } from 'next-auth/react'
import Logo from '../../public/assets/logo.png'

const SignIn = () => {
  const [loginInfo, setLoginInfo] = useState({
    usuario: '',
    password: ''
  })
  const [error, setError] = useState(null)
  const { status } = useSession()
  const router = useRouter()
  if (status === 'authenticated') {
    router.replace('/')
    return
  }

  const { usuario, password } = loginInfo

  const handleChange = (e) => {
    const { name, value } = e.target
    setLoginInfo((prevState) => ({ ...prevState, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      redirect: false,
      usuario,
      password
    })
    if (result?.error) {
      alert(result.error)
    }
  }

  return (
    <div className='flex items-center min-h-screen p-4 bg-gray-100 lg:justify-center'>
      <div className='flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md'>
        <div className='p-4 py-6 text-white bg-emerald-800 md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly'>
          <div className='flex justify-center my-2'>
            <Image
              alt='Imagen de la Comisión Nacional Forestal'
              src={Logo}
              style={{ filter: 'brightness(0) invert(100%)', width: 200 }}
              priority
            />
          </div>
          <div className='my-1 text-2xl font-bold tracking-wider text-center'>
            <p>Unidad de Operación Regional</p>
          </div>
          <p className='mt-6 font-normal text-center text-slate-100 md:mt-0'>
            Sistema de manejo de información interna
          </p>
        </div>
        <div className='p-5 bg-white md:flex-1'>
          <h3 className='my-4 text-2xl font-semibold text-gray-700'>
            Ingresar
          </h3>

          <form onSubmit={handleSubmit} className='flex flex-col space-y-5'>
            <div className='flex flex-col space-y-1'>
              <label
                htmlFor='usuario'
                className='text-sm font-semibold text-gray-500'
              >
                Usuario
              </label>
              <input
                type='text'
                id='usuario'
                autoFocus
                name='usuario'
                className='px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-emerald-700'
                onChange={handleChange}
              />
            </div>
            <div className='flex flex-col space-y-1'>
              <div className='flex items-center justify-between'>
                <label
                  htmlFor='password'
                  className='text-sm font-semibold text-gray-500'
                >
                  Contraseña
                </label>
              </div>
              <input
                type='password'
                id='password'
                name='password'
                className='px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-emerald-700'
                onChange={handleChange}
              />
            </div>
            <div>
              <button
                type='submit'
                className='w-full px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 bg-emerald-800 rounded-md shadow hover:bg-emerald-600 focus:outline-none focus:ring-emerald-200 focus:ring-4'
              >
                Ingresar
              </button>
            </div>
            {error ? (
              <div className='w-full px-4 py-2 text-md text-center'>
                <span className='text-red-400 p-1 font-bold'>{error}</span>
              </div>
            ) : null}
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
