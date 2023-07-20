'use client';
import { ClientSafeProvider, signIn } from 'next-auth/react';
import SocialLoginButton from './SocialLoginButton';
import NonMemberLogin from './NonMemberLogin';

type Props = {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
  csrfToken: string;
};

export default function SignIn({ providers, callbackUrl, csrfToken }: Props) {
  return (
    <>
      {Object.values(providers).map(({ name, id }) =>
        name === 'Nonmember' ? (
          <NonMemberLogin key={id} csrfToken={csrfToken}>
            <SocialLoginButton
              name={name}
              onClick={() => signIn(id, { callbackUrl })}
            />
          </NonMemberLogin>
        ) : (
          <SocialLoginButton
            key={id}
            name={name}
            onClick={() => signIn(id, { callbackUrl })}
          />
        )
      )}
    </>
  );
}
