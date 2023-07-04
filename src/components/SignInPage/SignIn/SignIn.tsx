'use client';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import SocialLoginButton from './SocialLoginButton';

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

export default function SignIn({ providers, callbackUrl }: Props) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <SocialLoginButton
          key={id}
          name={name}
          onClick={() => signIn(id, { callbackUrl })}
        />
      ))}
    </>
  );
}
