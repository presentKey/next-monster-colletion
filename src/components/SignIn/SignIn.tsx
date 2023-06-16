'use client';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import SignInButton from './SignInButton';

type Props = {
  providers: Record<string, ClientSafeProvider>;
};

export default function SignIn({ providers }: Props) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <SignInButton
          key={id}
          name={name}
          text={`${name} 로그인`}
          onClick={() => signIn(id)}
        />
      ))}
    </>
  );
}
