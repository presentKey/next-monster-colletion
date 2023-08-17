import { SignInResponse } from 'next-auth/react';
import GoogleIcon from '../../common/icons/GoogleIcon';
import styles from './css/LoginButton.module.css';
import { useEffect, useState } from 'react';
import UserIcon from '@/components/common/icons/UserIcon';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

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
    icon: <UserIcon />,
    text: '비회원 로그인',
  },
];

export default function LoginButton({ name, onClick }: Props) {
  const [click, setClick] = useState(false);
  const searchParams = useSearchParams();
  const error = searchParams.get('error');
  useEffect(() => {
    if (error) {
      toast.dismiss();
      toast.warn('비회원 로그인을 다시 시도해주세요.');
    }
  }, [error]);

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
