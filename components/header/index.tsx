import { Header as Head, Text, Burger, useMantineTheme, Group, Drawer } from '@mantine/core';
import { SetStateAction, useState } from 'react';
import { ColorSchemeToggle } from '../color-scheme-toggle';
import { Fullscreen } from '../fullscreen';
import { UserLogin } from './UserLogin';
import Navbar from '../navbar';

export default function Header() {
  const [opened, setOpened] = useState<boolean>(false);
  const theme = useMantineTheme();

  return (
    <Head height={70} p="md">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
        }}
      >
        <Burger
          opened={opened}
          onClick={() => setOpened((o: SetStateAction<boolean>) => !o)}
          size="sm"
          color={theme.colors.gray[6]}
          mr="xl"
        />
        <Group position="center">
          <ColorSchemeToggle />
          <Fullscreen />

          <UserLogin />
        </Group>
      </div>

      <Drawer padding="md" opened={opened} onClose={() => setOpened(false)}>
        <Navbar />
      </Drawer>
    </Head>
  );
}
