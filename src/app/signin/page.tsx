import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { getProviders } from 'next-auth/react';
import SignIn from '@/components/SignInPage/SignIn/SignIn';
import Notice from '@/components/common/Notice/Notice';
import styles from './page.module.css';
import Divider from '@/components/common/Divider/Divider';

const NOTE_TEXT = ['로그인을 하지 않아도 사이트를 이용할 수 있습니다.'];
const TIP_TEXT = [
  '로그인 시 북마크, 엘몬 컬렉션 정보가 저장됩니다.',
  '비로그인은 접속 기기 브라우저에 정보가 저장되어, 사용자의 다른 기기에서 정보를 볼 수 없습니다.',
];

type Props = {
  searchParams: {
    callbackUrl: string;
  };
};

export default async function SignPage({
  searchParams: { callbackUrl },
}: Props) {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  const providers = (await getProviders()) ?? {};

  return (
    <section className={styles.container}>
      <Notice type='note' textList={NOTE_TEXT} />
      <Notice type='tip' textList={TIP_TEXT} />
      <Divider />
      <SignIn providers={providers} callbackUrl={callbackUrl ?? '/'} />
    </section>
  );
}
