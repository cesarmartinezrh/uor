import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'

const authOptions = {
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  // Configure one or more authentication providers
  site: 'https://uor.cnf.gob.mx/',
  providers: [
    CredentialsProvider({
      type: 'credentials',
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: 'Credentials',
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {},
      async authorize(credentials, req) {
        const { usuario, password } = credentials
        const res = await fetch(
          'http://187.218.23.71/API_REST/api/autorizacion',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              usuario,
              password
            })
          }
        )
        const user = await res.json()
        if (res.status === 200 && user) {
          return user
        } else return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token
      return session
    }
  },
  pages: {
    signIn: '/auth/signin'
  }
}
export default NextAuth(authOptions)
