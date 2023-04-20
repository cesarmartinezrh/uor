import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

const authOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
  jwt: {
    secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
    encryption: true,
  },
  // Configure one or more authentication providers
  site: process.env.NEXTAUTH_URL,
  providers: [
    CredentialsProvider({
      id: "credentials",
      type: "credentials",
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {},
      async authorize(credentials, req) {
        const { usuario, password } = credentials;
        const loginInfo = new URLSearchParams();
        loginInfo.append("usuario", usuario);
        loginInfo.append("password", password);

        const response = await axios.post(
          process.env.USERS_API,
          loginInfo.toString(),
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          }
        );
        const user = response.data;
        console.log(user);
        if (response.status === 200 && user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
  },
};
export default NextAuth(authOptions);
