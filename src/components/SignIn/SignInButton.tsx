import GoogleIcon from '../icons/GoogleIcon';
import styles from './css/SignInButton.module.css';

type Props = {
  name: string;
  text: string;
  onClick: () => void;
};

const icons = [
  {
    title: 'Google',
    icon: <GoogleIcon />,
  },
];

export default function SignInButton({ name, text, onClick }: Props) {
  return (
    <button className={styles.button} type='button' onClick={onClick}>
      {icons.map(
        ({ title, icon }) =>
          title === name && (
            <span key={title} className={styles.icon}>
              {icon}
            </span>
          )
      )}
      {text}
    </button>
  );
}
