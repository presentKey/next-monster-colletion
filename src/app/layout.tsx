import './css/normalize.css';
import './css/reset.css';
import './css/responsive.css';
import './css/globals.css';
import styles from './css/layout.module.css';
import { Noto_Sans_KR } from 'next/font/google';
import { Do_Hyeon } from 'next/font/google';
import GlobalHeader from '@/components/GlobalHeader/GlobalHeader';
import AuthContext from '@/context/AuthContext';

const sans = Noto_Sans_KR({
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const dohyeon = Do_Hyeon({
  subsets: ['latin'],
  weight: ['400'],
});

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={sans.className}>
        <AuthContext>
          <GlobalHeader />
          <main className={styles.main}>{children}</main>
        </AuthContext>
      </body>
    </html>
  );
}
