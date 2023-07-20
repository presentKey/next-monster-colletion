import GoogleIcon from '../../common/icons/GoogleIcon';
import styles from './css/SocialLoginButton.module.css';

type Props = {
  name: string;
  onClick: () => void;
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

export default function SocialLoginButton({ name, onClick }: Props) {
  return (
    <>
      {icons.map(
        ({ title, icon, text }) =>
          title === name && (
            <button
              className={styles.button}
              key={title}
              type='button'
              onClick={onClick}
            >
              <span className={styles.icon}>{icon}</span>
              {text}
            </button>
          )
      )}
    </>
  );
}
