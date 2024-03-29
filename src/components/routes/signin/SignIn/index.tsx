'use client';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import LoginButton from './LoginButton';
import NonMemberLogin from './NonMemberLogin';

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
              <NonMemberLogin key={id} csrfToken={csrfToken}>
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
            );
          default:
            return (
              <LoginButton
                key={id}
                name={name}
                onClick={() => signIn(id, { callbackUrl })}
              />
            );
        }
      })}
    </>
  );
}
