// import NextAuth, { AuthOptions } from 'next-auth';
// import GithubProvider from 'next-auth/providers/github';
// import GoogleProvider from 'next-auth/providers/google';
// import Credentials from 'next-auth/providers/credentials';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { compare } from 'bcrypt';
// import prismadb from '@/libs/prismadb';
// import FacebookProvider from "next-auth/providers/facebook";

// export const authOptions: AuthOptions = {
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID || '',
//       clientSecret: process.env.GITHUB_SECRET || '',
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || '',
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
//     }),
//     FacebookProvider({
//       clientId: process.env.FACEBOOK_CLIENT_ID || '',
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
//     }),
//     Credentials({
//       id: 'credentials',
//       name: 'Credentials',
//       credentials: {
//         email: {
//           label: 'Email',
//           type: 'text',
//         },
//         password: {
//           label: 'Password',
//           type: 'password'
//         }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error('Email and password required');
//         }

//         const user = await prismadb.user.findUnique({ where: {
//           email: credentials.email
//         }});

//         if (!user || !user.hashedPassword) {
//           throw new Error('Email does not exist');
//         }

//         const isCorrectPassword = await compare(credentials.password, user.hashedPassword);

//         if (!isCorrectPassword) {
//           throw new Error('Incorrect password');
//         }

//         return user;
//       }
//     })
//   ],
//   pages: {
//     signIn: '/auth'
//   },
//   debug: process.env.NODE_ENV === 'development',
//   adapter: PrismaAdapter(prismadb),
//   session: { strategy: 'jwt' },
//   jwt: {
//     secret: process.env.NEXTAUTH_JWT_SECRET,
//   },
//   secret: process.env.NEXTAUTH_SECRET
// };

// export default NextAuth(authOptions);

// import { OAuth2Client } from 'google-auth-library';

// import NextAuth, { AuthOptions } from 'next-auth';
// import GithubProvider from 'next-auth/providers/github';
// import GoogleProvider from 'next-auth/providers/google';
// import Credentials from 'next-auth/providers/credentials';
// import { PrismaAdapter } from '@next-auth/prisma-adapter';
// import { compare } from 'bcrypt';
// import prismadb from '@/libs/prismadb';
// import FacebookProvider from "next-auth/providers/facebook";

// export const authOptions: AuthOptions = {
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID || '',
//       clientSecret: process.env.GITHUB_SECRET || '',
//     }),
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID || '',
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
//     }),

//     FacebookProvider({
//       clientId: process.env.FACEBOOK_CLIENT_ID || '',
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
//     }),
//     Credentials({
//       id: 'credentials',
//       name: 'Credentials',
//       credentials: {
//         email: {
//           label: 'Email',
//           type: 'text',
//         },
//         password: {
//           label: 'Password',
//           type: 'password'
//         }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error('Email and password required');
//         }

//         const user = await prismadb.user.findUnique({ where: {
//           email: credentials.email
//         }});

//         if (!user || !user.hashedPassword) {
//           throw new Error('Email does not exist');
//         }

//         const isCorrectPassword = await compare(credentials.password, user.hashedPassword);

//         if (!isCorrectPassword) {
//           throw new Error('Incorrect password');
//         }

//         return user;
//       }
//     })
//   ],
//   pages: {
//     signIn: '/auth'
//   },
//   debug: process.env.NODE_ENV === 'development',
//   adapter: PrismaAdapter(prismadb),
//   session: { strategy: 'jwt' },
//   jwt: {
//     secret: process.env.NEXTAUTH_JWT_SECRET,
//   },
//   secret: process.env.NEXTAUTH_SECRET
// };

// export default NextAuth(authOptions);
import NextAuth, { AuthOptions } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { compare } from 'bcrypt';
import prismadb from '@/libs/prismadb';
import FacebookProvider from "next-auth/providers/facebook";
import { OAuth2Client } from 'google-auth-library';

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || '',
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      scope: 'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/calendar',
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID || '',
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || '',
    }),
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        const user = await prismadb.user.findUnique({ where: {
          email: credentials.email
        }});

        if (!user || !user.hashedPassword) {
          throw new Error('Email does not exist');
        }

        const isCorrectPassword = await compare(credentials.password, user.hashedPassword);

        if (!isCorrectPassword) {
          throw new Error('Incorrect password');
        }

        return user;
      }
    })
  ],
  pages: {
    signIn: '/auth'
  },
  debug: process.env.NODE_ENV === 'development',
  adapter: PrismaAdapter(prismadb),
  session: { strategy: 'jwt' },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,

};

export default NextAuth(authOptions);



//   callbacks: {
//     async jwt(token, user, account) {
//       if (account?.provider === 'google' && account?.accessToken) {
//         const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
//         const ticket = await client.verifyIdToken({
//           idToken: account.idToken,
//           audience: process.env.GOOGLE_CLIENT_ID,
//         });
//         const googleUser = ticket.getPayload();

//         token.accessToken = account.accessToken;
//         token.id = googleUser?.sub;
//         token.email = googleUser?.email;
//         token.name = googleUser?.name;
//         token.picture = googleUser?.picture;
//       }

//       return token;
//     },
//   },
