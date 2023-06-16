'use client';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import SignInButton from './SignInButton';

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
};

export default function SignIn({ providers, callbackUrl }: Props) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <SignInButton
          key={id}
          name={name}
          text={`${name} 로그인`}
          onClick={() => signIn(id, { callbackUrl })}
        />
      ))}
    </>
  );
}
