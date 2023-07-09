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

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
        <RecoilContext>
          <DarkModeProvider>
            <QueryProvider>
              <AuthContext>
                <GlobalHeader />
                <main className={styles.main}>{children}</main>
              </AuthContext>
              <SideBar />
              <BottomNav />
              <ToastNotification />
            </QueryProvider>
          </DarkModeProvider>
        </RecoilContext>
      </body>
    </html>
  );
}
