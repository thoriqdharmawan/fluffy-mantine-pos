import { useState } from 'react';
import { Box, Text, Paper, NumberInput, Table } from '@mantine/core';

import RecommendationCash from './payment-method/RecommendationCash';

type Props = {};

export default function PayNow({}: Props) {
  const [value, setValue] = useState(0);

  return (
    <Box>
      <Box maw={400} mx="auto">
        <Text mb="sm" ta="center" size="md" mt="lg">
          Total Tagihan
        </Text>
        <Paper mb="xl" p="xl" withBorder>
          <Text variant="gradient" ta="center" size="xl" fw="bold">
            Rp 23.0000
          </Text>
        </Paper>


        <Text mb="sm">Masukan Nominal Pembayaran</Text>
        <NumberInput
          ta="center"
          size="xl"
          mb="sm"
          icon="Rp"
          min={0}
          hideControls
          value={value}
          onChange={(value) => setValue(value || 0)}
          styles={{ input: { textAlign: 'center' } }}
          parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
          formatter={(value: any) =>
            !Number.isNaN(parseFloat(value)) ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
          }
        />
        <RecommendationCash onClick={setValue} total={23000} />

        <Table>
          <tbody>
            <tr>
              <td>Kembali</td>
              <td align="right">+ Rp 12.000</td>
            </tr>
            <tr>
              <td>Kurang</td>
              <td align="right">- Rp 12.000</td>
            </tr>
          </tbody>
        </Table>
      </Box>
    </Box>
  );
}
