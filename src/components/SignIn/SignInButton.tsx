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
      <span className={styles.icon}>
        {icons.map(({ title, icon }) => title === name && icon)}
      </span>
      {text}
    </button>
  );
}
