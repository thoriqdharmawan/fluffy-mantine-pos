import { useMemo } from 'react';
import { useQuery } from '@apollo/client';
import { Box, Modal, SimpleGrid, Table, Text } from '@mantine/core';
import dayjs from 'dayjs';
// @ts-ignore
import Skeleton from 'react-loading-skeleton';

import { GET_DETAIL_TRANSACTION } from '../../../services/transactions';
import client from '../../../apollo-client';
import { convertToRupiah } from '../../../context/helpers';
import { GLOBAL_FORMAT_DATE } from '../../../context/global';

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

  const { code, employee, transaction_date, payment_type, payment_method, status, products_solds } =
    data?.transactions?.[0] || {};

  const totalPayment = useMemo(() => {
    return products_solds?.reduce((acc: any, cur: any) => acc.total_price + cur.total_price);
  }, [products_solds]);

  return (
    <Modal size={640} opened={opened} onClose={onClose} title="Detail Transaksi">
      {loading && <Skeleton count={5} height="36px" width="100%" />}
      {!loading && (
        <>
          <SimpleGrid mb="xl" cols={2}>
            <List label="Nomor Transaksi" value={code || '-'} />
            <List label="Kasir" value={employee?.name} />
            <List
              label="Waktu Transaksi"
              value={dayjs(transaction_date).format(GLOBAL_FORMAT_DATE)}
            />
            <List label="Metode Pembayaran" value={`${payment_type} - ${payment_method}`} />
            <List label="Status" value={status} />
          </SimpleGrid>

          <Table highlightOnHover withBorder withColumnBorders>
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
                    <td>{convertToRupiah(product.unit_price)}</td>
                    <td>{convertToRupiah(product.total_price)}</td>
                  </tr>
                );
              })}

              <tr>
                <td colSpan={4}>
                  <Text ta="right" fw={600}>
                    Subtotal
                  </Text>
                </td>
                <td>{convertToRupiah(totalPayment)}</td>
              </tr>
            </tbody>
          </Table>
        </>
      )}
    </Modal>
  );
}
