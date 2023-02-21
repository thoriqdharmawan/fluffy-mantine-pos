import { Box, Center, Flex, NumberInput, Table, Text } from '@mantine/core';

type Props = {};

export default function Cash({}: Props) {
  return (
    <Box p="sm">
      <Table
        striped
        horizontalSpacing="xl"
        verticalSpacing="lg"
        fontSize="lg"
        ta="center"
        mb="md"
        fw="bold"
      >
        <tbody>
          <tr>
            <td>Total Tagihan</td>
            <td>Rp 120.000</td>
          </tr>
          {/* <tr>
            <td>Bayar</td>
            <td>Rp 150.000</td>
          </tr>
          <tr>
            <td>Kembali</td>
            <td>Rp 30.000</td>
          </tr> */}
        </tbody>
      </Table>
      <NumberInput
        defaultValue={12000}
        placeholder="Masukan nominal pembayaran"
        label="Bayar"
        withAsterisk
        hideControls
        size="lg"
        labelProps={{ mb: 8 }}
        mb="md"
        parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
        formatter={(value) =>
          !Number.isNaN(parseFloat(value || '0'))
            ? `Rp ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, '.')
            : 'Rp '
        }
      />
    </Box>
  );
}
