import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../theme';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Navbar } from '@/components/Navbar/Navbar';
import S from './global.module.css';
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
          <MantineProvider theme={theme}>
            <div className={S.grid}>
              <div className={S.sidebar}>
                <Sidebar />
              </div>
              <div>
                <Navbar />
                {children}
              </div>
            </div>
          </MantineProvider>
        </div>
      </body>
    </html>
  );
}
