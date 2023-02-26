import { Navbar as Nav, Stack, Tooltip, UnstyledButton, createStyles } from '@mantine/core';
import { IconHome2, IconCash, IconList, IconShoppingCart } from '@tabler/icons';
import { useRouter } from 'next/router';
import { ColorSchemeToggle } from '../color-scheme-toggle';

const useStyles = createStyles((theme) => ({
  link: {
    width: 50,
    height: 50,
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[0],
    },
  },

  active: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },
}));

const data = [
  { icon: IconHome2, label: 'Home Page', href: '/' },
  { icon: IconShoppingCart, label: 'Riwayat Transaksi', href: '/transactions' },
  { icon: IconList, label: 'Daftar Produk', href: '/products' },
  { icon: IconCash, label: 'Pendapatan', href: '/incomes' },
];

export default function Navbar() {
  const router = useRouter();
  const { classes, cx } = useStyles();

  const menus = data.map((item, index) => {
    const url = `/${router.pathname.split('/')[1]}`;
    const isActive = url === item.href;

    return (
      <Tooltip key={index} label={item.label} position="right" transitionDuration={0}>
        <UnstyledButton
          onClick={() => router.push(item.href)}
          className={cx(classes.link, { [classes.active]: isActive })}
        >
          <item.icon stroke={1.5} />
        </UnstyledButton>
      </Tooltip>
    );
  });

  return (
    <Nav width={{ base: 80 }} p="md">
      <Nav.Section grow>
        <Stack justify="center" spacing={0}>
          {menus}
        </Stack>
      </Nav.Section>
      <Nav.Section>
        <ColorSchemeToggle />
      </Nav.Section>
    </Nav>
  );
}
