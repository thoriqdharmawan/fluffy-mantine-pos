import { useMemo } from 'react';
import { Badge, Box, Flex, Text, Image, Table } from '@mantine/core';

import { convertToRupiah, getVariants } from '../../../../context/helpers';

interface Props {
  products: any[];
}

export default function DetailOrders(props: Props) {
  const { products } = props;

  const rows = products?.map((product) => {
    const variants = getVariants(product.variants, product.coord);
    const isVariant = product.type === 'VARIANT';
    return (
      <tr key={product.id}>
        <td>
          <Image width={60} height={60} radius="sm" withPlaceholder src={product.src} />
        </td>
        <td>{product.name}</td>
        <td>
          <Flex gap="sm">
            {isVariant ? (
              variants?.map((variant) => <Badge>{variant}</Badge>)
            ) : (
              <Text fs="italic" color="dimmed">
                Tidak ada varian
              </Text>
            )}
          </Flex>
        </td>
        <td>{product.quantity}</td>
        <td>{convertToRupiah(product.price)}</td>
        <td>{convertToRupiah(product.itemTotal)}</td>
      </tr>
    );
  });

  const totalPayment = useMemo(() => {
    return products.reduce((acc, cur) => acc + cur.itemTotal, 0);
  }, [products]);

  return (
    <Box p="md">
      <Text color="dimmed" mb="xl" maw="70%">
        Periksa kembali barang-barang yang telah dimasukkan ke dalam keranjang belanja sebelum
        melanjutkan proses pembayaran.
      </Text>

      <Table horizontalSpacing="xl" highlightOnHover withBorder withColumnBorders>
        <thead>
          <tr>
            <th>Foto Produk</th>
            <th>Nama Produk</th>
            <th>Varian Produk</th>
            <th>Total (Qty)</th>
            <th>Harga Satuan</th>
            <th>Harga Total</th>
          </tr>
        </thead>
        <tbody>
          {rows}
          <tr>
            <td colSpan={5}>
              <Text py="md" fw={700}>
                Total Pembayaran
              </Text>
            </td>
            <td>
              <Text fw={700}>{convertToRupiah(totalPayment)}</Text>
            </td>
          </tr>
        </tbody>
      </Table>
    </Box>
  );
}
