import { useState } from 'react';
import { Box } from '@mantine/core';

import { ListTransactions } from '../../modules/transactions/list';

import MainLayout from '../../layouts/MainLayout';
import HeaderSection from '../../components/header/HeaderSection';
import DetailTransaction from '../../modules/transactions/detail/DetailTransaction';

type Props = {};

export default function index({}: Props) {
  const [modal, setModal] = useState({
    open: false,
    id: '',
  });

  return (
    <MainLayout>
      <Box p="lg" w="100%">
        <HeaderSection
          title="Riwayat Transaksi"
          label=" Anda dapat melihat daftar transaksi yang telah dilakukan pada aplikasi kami. Anda dapat melihat detail transaksi seperti tanggal, waktu, jumlah produk, total harga, dan lain-lain. Fitur ini memudahkan Anda untuk memantau transaksi yang telah dilakukan."
        />

        <ListTransactions onClick={(id) => setModal({ open: true, id })} />
      </Box>

      <DetailTransaction
        id={modal.id}
        opened={modal.open}
        onClose={() => setModal({ open: false, id: '' })}
      />
    </MainLayout>
  );
}
