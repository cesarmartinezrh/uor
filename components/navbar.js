import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession, signOut } from 'next-auth/react'

export default function Navbar() {
  const { data: session } = useSession()

  const handleSignOut = async (e) => {
    e.preventDefault()
    const getout = await signOut({ redirect: false })
  }
  return (
    <>
      <nav className='flex px-4 items-center justify-between w-full bg-slate-50 shadow-md shadow-slate-400 h-14'>
        <h1 className='text-4xl font-extrabold'>UOR</h1>
        <Link
          className={'text-xl font-bold'}
          rel=''
          type=''
          href='/asesores-tecnicos'
        >
          Asesores técnicos
        </Link>
        <button
          className='rounded-md bg-red-500 text-white px-4 py-1 hover:bg-red-600'
          onClick={handleSignOut}
        >
          Salir
        </button>
      </nav>
    </>
  )
}
