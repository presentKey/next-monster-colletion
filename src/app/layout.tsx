import '../styles/normalize.css';
import '../styles/reset.css';
import '../styles/responsive.css';
import '../styles/globals.css';
import styles from './layout.module.css';
import GlobalHeader from '@/components/layout/GlobalHeader';
import AuthContext from '@/context/AuthContext';
import { DarkModeProvider } from '@/context/DarkModeContext';
import RecoilContext from '@/context/RecoilContext';
import MobileSideMenu from '@/components/layout/MobileSideMenu';
import { sans } from '@/utils/fonts';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import ToastNotification from '@/components/common/ToastNotification';
import QueryProvider from '@/context/QueryContext';
import QueryDevtools from '@/context/QueryDevtools';
import InitialSetup from '@/components/InitialSetup/InitialSetup';
import MobileTimerBar from '@/components/layout/MobileTimerBar';
import MobileSearchBar from '@/components/layout/MobileSearchBar';
import Footer from '@/components/layout/Footer';
import { Metadata } from 'next';
import GoogleAnalytics from '@/components/layout/GoogleAnalytics';

export const metadata: Metadata = {
  title: {
    default: '몬스터 컬렉션',
    template: '%s | 몬스터 컬렉션',
  },
  description: '메이플스토리 몬스터컬렉션 정보 사이트 | 메이플 몬컬 사이트',
  metadataBase: new URL('https://www.moncol.kr'),
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
              <MobileSideMenu />
              <MobileTimerBar />
              <MobileSearchBar />
              <MobileBottomNav />
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
