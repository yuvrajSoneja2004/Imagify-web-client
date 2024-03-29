import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript, useThe } from '@mantine/core';
import { theme } from '../theme';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Navbar } from '@/components/Navbar/Navbar';
import S from './global.module.css';
import 'react-loading-skeleton/dist/skeleton.css';
import '@mantine/notifications/styles.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { ReduxProvider } from '@/redux/features/provider';
import '@mantine/carousel/styles.css';
import { Notifications } from '@mantine/notifications';
import AuthCheck from '@/components/authCheck';

export const metadata = {
  title: 'Imagify - Talk to anyone!',
  description: 'Inspired by https://beta.character.ai/',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <div id="rootGrid">
          <ReduxProvider>
            <MantineProvider theme={theme}>
              <AuthCheck>
                <Notifications />
                <div className={S.grid}>
                  <div className={S.sidebar}>
                    <Sidebar />
                  </div>
                  <div>
                    <Navbar />
                    {children}
                  </div>
                </div>
              </AuthCheck>
            </MantineProvider>
          </ReduxProvider>
        </div>
      </body>
    </html>
  );
}
