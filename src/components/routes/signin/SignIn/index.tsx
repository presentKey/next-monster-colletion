'use client';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import LoginButton from './LoginButton';
import NonMemberLogin from './NonMemberLogin';
import { Suspense } from 'react';

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
  csrfToken: string;
};

export default function SignIn({ providers, callbackUrl, csrfToken }: Props) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => {
        switch (name) {
          case 'Nonmember':
            return (
              <Suspense key={id}>
                <NonMemberLogin csrfToken={csrfToken}>
                  <LoginButton
                    name={name}
                    onClick={() =>
                      signIn(id, {
                        callbackUrl,
                        uid: localStorage.getItem('nonmember') ?? null,
                      })
                    }
                  />
                </NonMemberLogin>
              </Suspense>
            );
          default:
            return (
              <Suspense key={id}>
                <LoginButton
                  name={name}
                  onClick={() => signIn(id, { callbackUrl })}
                />
              </Suspense>
            );
        }
      })}
    </>
  );
}
