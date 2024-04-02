import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import socialLogin from '@/actions/socialLogin';
import { Auth } from '@/types';
export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async jwt({ token, user, account, profile }) {
            if (
                (account?.provider === 'google' ||
                    account?.provider === 'facebook') &&
                profile
            ) {
                const payload = {
                    name: user?.name,
                    token: user?.id,
                    platform: account?.provider,
                    email: user?.email,
                };
                const res = await socialLogin(payload as any);
                if (res?.user) {
                    return { ...token, ...user };
                } else {
                    return { ...res };
                }
            } else {
                return { ...token, ...user };
            }
        },
        session({ session, token, user }) {
            session.auth = token as unknown as Auth;
            return { ...session, ...user };
        },
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                try {
                    const res = await fetch(
                        `${process.env.BASE_URL}/client-login`,
                        {
                            method: 'POST',
                            headers: {
                                'content-type': 'application/json',
                            },
                            next: {
                                revalidate: 10,
                            },
                            body: JSON.stringify(credentials),
                        }
                    );
                    const user = await res.json();
                    if (user) return user;
                    return null;
                } catch (error) {
                    // eslint-disable-next-line no-console
                    console.error(error);
                }
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
        }),
        FacebookProvider({
            clientId: process.env.FACEBOOK_CLIENT_ID ?? '',
            clientSecret: process.env.FACEBOOK_APP_SECRET ?? '',
        }),
    ],
} satisfies AuthOptions;
