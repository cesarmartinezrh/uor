import { getSession, getProviders } from 'next-auth/react'

import Layout from '../components/layout'

export default function Home({ providers, session }) {
  console.log(providers, session)
  return (
    <Layout>
      <div>Home</div>
    </Layout>
  )
}

export async function getServerSideProps(context) {
  const { req } = context
  const session = await getSession({ req })
  const providers = await getProviders()
  if (!session) {
    return {
      redirect: { destination: '/api/auth/signin' }
    }
  }
  return {
    props: {
      providers,
      session
    }
  }
}
