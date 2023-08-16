import '../styles/normalize.css';
import '../styles/reset.css';
import '../styles/responsive.css';
import '../styles/globals.css';
import styles from './layout.module.css';
import GlobalHeader from '@/components/layout/GlobalHeader/GlobalHeader';
import AuthContext from '@/context/AuthContext';
import { DarkModeProvider } from '@/context/DarkModeContext';
import RecoilContext from '@/context/RecoilContext';
import SideBar from '@/components/layout/SideBar/SideBar';
import { sans } from '@/utils/fonts';
import BottomNav from '@/components/layout/BottomNav/BottomNav';
import ToastNotification from '@/components/common/ToastNotification/ToastNotification';
import QueryProvider from '@/context/QueryContext';
import QueryDevtools from '@/context/QueryDevtools';
import InitialSetup from '@/components/InitialSetup/InitialSetup';
import TimerBar from '@/components/layout/TimerBar/TimerBar';
import SearchBar from '@/components/layout/SearchBar/SearchBar';
import Footer from '@/components/layout/Footer/Footer';
import { Metadata } from 'next';
import GoogleAnalytics from '@/components/layout/GoogleAnalytics/GoogleAnalytics';

export const metadata: Metadata = {
  title: {
    default: '몬스터 컬렉션',
    template: '%s | 몬스터 컬렉션',
  },
  description: '메이플스토리 몬스터컬렉션 정보 사이트 | 메이플 몬컬 사이트',
  openGraph: {
    images: '/images/montser-collection.png',
    title: '몬스터컬렉션 등록 정보',
    url: 'https://www.moncol.kr/',
    description: '다양한 몬컬 등록 방법을 확인해보세요!',
  },
};

// SSR 사용자 테마 설정 스크립트
const themeScript = `
  const isDark = localStorage.theme === 'dark' ||
  (!('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches);

  if(isDark) {
    document.documentElement.dataset.theme = 'dark';
    localStorage.theme = 'dark';
  }
`;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ko'>
      <body className={sans.className}>
        <script
          dangerouslySetInnerHTML={{
            __html: themeScript,
          }}
        />
        <GoogleAnalytics />
        <RecoilContext>
          <DarkModeProvider>
            <QueryProvider>
              <AuthContext>
                <InitialSetup />
                <GlobalHeader />
                <main className={styles.main}>{children}</main>
              </AuthContext>
              <SideBar />
              <TimerBar />
              <SearchBar />
              <BottomNav />
              <Footer />
              <ToastNotification />
              <QueryDevtools />
            </QueryProvider>
          </DarkModeProvider>
        </RecoilContext>
      </body>
    </html>
  );
}
