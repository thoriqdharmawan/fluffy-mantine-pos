import React from 'react';
import { AppShell, useMantineTheme, Box } from '@mantine/core';

import Header from '../components/header';

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const theme = useMantineTheme();

  return (
    <AppShell
      styles={{
        root: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          display: 'flex',
        },
      }}
      header={<Header />}
      padding={0}
    >
      {children}
    </AppShell>
  );
}
