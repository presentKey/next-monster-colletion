import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { getCsrfToken, getProviders } from 'next-auth/react';
import SignIn from '@/components/SignInPage/SignIn/SignIn';
import Notice from '@/components/common/Notice/Notice';
import styles from './page.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '로그인',
  description: '구글 로그인 및 비회원 로그인',
};

const NOTE_TEXT = [
  '로그인 시 북마크, 엘몬 컬렉션 기능을 이용할 수 있습니다.',
  '비회원 로그인은 구글 로그인과 동일한 기능을 제공합니다.',
  '구글 로그인은 사용자의 이름, 이메일, 프로필 사진을 저장하지 않습니다.',
];
const TIP_TEXT = [
  '구글 로그인 시 북마크, 엘몬 컬렉션 정보를 사용자의 다른 기기에서 확인할 수 있습니다.',
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
  const csrfToken = (await getCsrfToken()) ?? '';

  return (
    <section className={styles.container}>
      <Notice type='note' textList={NOTE_TEXT} />
      <Notice type='tip' textList={TIP_TEXT} />
      <div className={styles.divider} />
      <SignIn
        providers={providers}
        callbackUrl={callbackUrl ?? '/'}
        csrfToken={csrfToken}
      />
    </section>
  );
}
