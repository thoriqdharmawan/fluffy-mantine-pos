import { Box } from '@mantine/core';

import { ListTransactions } from '../../modules/transactions/list';

import MainLayout from '../../layouts/MainLayout';
import HeaderSection from '../../components/header/HeaderSection';

type Props = {};

export default function index({}: Props) {
  return (
    <MainLayout>
      <Box p="lg" w="100%">
        <HeaderSection
          title="Riwayat Transaksi"
          label=" Anda dapat melihat daftar transaksi yang telah dilakukan pada aplikasi kami. Anda dapat melihat detail transaksi seperti tanggal, waktu, jumlah produk, total harga, dan lain-lain. Fitur ini memudahkan Anda untuk memantau transaksi yang telah dilakukan."
        />

        <ListTransactions />
      </Box>
    </MainLayout>
  );
}
