import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../theme';
import { Sidebar } from '@/components/Sidebar/Sidebar';
import { Navbar } from '@/components/Navbar/Navbar';

export const metadata = {
  title: 'Mantine Next.js template',
  description: 'I am using Mantine with Next.js!',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <div id="rootGrid">
          <MantineProvider theme={theme}>
            <div style={{ display: 'grid', gridTemplateColumns: '6% auto' }}>
              <div style={{ width: '400px !important' }}>
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
