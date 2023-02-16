import { Navbar as Nav, NavLink } from '@mantine/core';
import { IconHome2, IconCash, IconList, IconShoppingCart} from '@tabler/icons';
import { useRouter } from 'next/router';

import Link from 'next/link';

interface NabarProps {}

const data = [
  { icon: IconHome2, label: 'Home Page', href: '/' },
  { icon: IconShoppingCart, label: 'Riwayat Pesanan', href: '/orders-histories' },
  { icon: IconList, label: 'Daftar Produk', href: '/products' },
  { icon: IconCash, label: 'Pendapatan', href: '/income' },
];

export default function Navbar(props: NabarProps) {
  const router = useRouter();

  const menus = data.map((item, index) => {
    const url = `/${router.pathname.split('/')[1]}`;
    const isActive = url === item.href;

    return (
      <Link key={index} href={item.href}>
        <NavLink
          active={isActive}
          label={item.label}
          icon={<item.icon size={16} stroke={1.5} />}
          my={4}
        />
      </Link>
    );
  });

  return (
    <Nav>
      <Nav.Section grow>{menus}</Nav.Section>
      <Nav.Section>Last section</Nav.Section>
    </Nav>
  );
}
