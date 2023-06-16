import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import { getProviders } from 'next-auth/react';
import SignIn from '@/components/SignIn/SignIn';
import Notice from '@/components/Notice';
import styles from './css/page.module.css';

export default async function SignPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  const providers = (await getProviders()) ?? {};

  return (
    <section className={styles.container}>
      <Notice
        type='note'
        text='로그인을 하지 않아도 사이트를 이용할 수 있습니다.'
      />
      <Notice
        type='tip'
        text='로그인 시 북마크, 엘몬 컬렉션 정보가 저장됩니다.'
      />

      <SignIn providers={providers} />
    </section>
  );
}
