import { SignInResponse } from 'next-auth/react';
import GoogleIcon from '../../common/icons/GoogleIcon';
import styles from './css/SocialLoginButton.module.css';
import { useState } from 'react';

type Props = {
  name: string;
  onClick: () => Promise<SignInResponse | undefined>;
};

const icons = [
  {
    title: 'Google',
    icon: <GoogleIcon />,
    text: '구글 로그인',
  },
  {
    title: 'Nonmember',
    icon: <GoogleIcon />,
    text: '비회원 로그인',
  },
];

export default function LoginButton({ name, onClick }: Props) {
  const [click, setClick] = useState(false);

  return (
    <>
      {icons.map(
        ({ title, icon, text }) =>
          title === name && (
            <button
              className={styles.button}
              key={title}
              type='button'
              onClick={() => {
                setClick(true);
                onClick() //
                  .finally(() => setClick(false));
              }}
              disabled={click}
            >
              <span className={styles.icon}>{icon}</span>
              {text}
            </button>
          )
      )}
    </>
  );
}
