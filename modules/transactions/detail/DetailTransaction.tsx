import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Modal, SimpleGrid, Table, Text } from '@mantine/core';
import dayjs from 'dayjs';
// @ts-ignore
import Skeleton from 'react-loading-skeleton';

import { GET_DETAIL_TRANSACTION } from '../../../services/transactions';
import { convertToRupiah } from '../../../context/helpers';
import { GLOBAL_FORMAT_DATE, TRANSACTION_STATUS } from '../../../context/global';
import client from '../../../apollo-client';
import TransactionId from '../../../components/cards/TransactionId';

interface Props {
  id: string;
  opened: boolean;
  onClose: () => void;
}

const List = ({ label, value }: { label: string; value: string }) => {
  return (
    <Box display="inline-block">
      <Text size="sm" color="dimmed">
        {label}
      </Text>
      <Text size="md" fw={600}>
        {value}
      </Text>
    </Box>
  );
};

export default function DetailTransaction(props: Props) {
  const { id, opened, onClose } = props;

  const { data, error, loading } = useQuery(GET_DETAIL_TRANSACTION, {
    client: client,
    skip: !id,
    variables: { id },
  });

  if (error) {
    console.error(error);
  }

  const { id: transactionId, code, employee, created_at, payment_type, payment_method, status, products_solds, total_amount, payment_amount } =
    data?.transactions?.[0] || {};

  console.log(data)

  const offset = payment_amount - total_amount;


  return (
    <Modal size={640} opened={opened} onClose={onClose} title="Detail Transaksi">
      {loading && <Skeleton count={5} height="36px" width="100%" />}
      {!loading && (
        <>
          <SimpleGrid mb="xl" cols={2}>
            <List label="Nomor Transaksi" value={code || '-'} />
            <List label="Kasir" value={employee?.name} />
            <List label="Waktu Transaksi" value={dayjs(created_at).format(GLOBAL_FORMAT_DATE)} />
            <List label="Metode Pembayaran" value={`${payment_type} - ${payment_method}`} />
            <List label="Status" value={TRANSACTION_STATUS[status]} />
          </SimpleGrid>

          <Table highlightOnHover withBorder withColumnBorders mb="xl">
            <thead>
              <tr>
                <th>Nama Barang</th>
                <th>Varian</th>
                <th>Jumlah (qty)</th>
                <th>Harga</th>
                <th>Harga Total</th>
              </tr>
            </thead>
            <tbody>
              {products_solds?.map((product: any, idx: number) => {
                const variants = product.variants.join(', ');

                return (
                  <tr key={idx}>
                    <td>{product.name}</td>
                    <td>{variants || 'Tidak ada varian'}</td>
                    <td>{product.quantity_sold}</td>
                    <td><Text ta="right">{convertToRupiah(product.unit_price)}</Text></td>
                    <td><Text ta="right">{convertToRupiah(product.total_price)}</Text></td>
                  </tr>
                );
              })}

              <tr>
                <td colSpan={4}>
                  <Text fw={600}>
                    Total Tagihan
                  </Text>
                </td>
                <td><Text ta="right">{convertToRupiah(total_amount)}</Text></td>
              </tr>
              <tr>
                <td colSpan={4}><Text >Dibayar</Text></td>
                <td><Text ta="right">{convertToRupiah(payment_amount)}</Text></td>
              </tr>
              {offset > 0 && (
                <tr>
                  <td colSpan={4}><Text>Kembali</Text></td>
                  <td align="right">
                    <Text color="green" fw="bold">+ {convertToRupiah(offset)}</Text>
                  </td>
                </tr>
              )}
              {offset < 0 && (
                <tr>
                  <td colSpan={4}><Text >Kurang</Text></td>
                  <td align="right">
                    <Text color="red" fw="bold">- {convertToRupiah(Math.abs(124000))}</Text>
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </>
      )}
      <TransactionId transactionId={transactionId} />
    </Modal>
  );
}
