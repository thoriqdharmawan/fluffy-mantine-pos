import { Box, Text, Paper, NumberInput, Table } from '@mantine/core';

type Props = {};

export default function PayNow({}: Props) {
  return (
    <Box>
      <Text mb="sm" ta="center" size="md">
        Total Tagihan
      </Text>
      <Paper mb="xl" p="xl" withBorder>
        <Text ta="center" size="xl" fw="bold">
          Rp 20.0000
        </Text>
      </Paper>

      <Table maw={400} m="auto">
        <tbody>
          <tr>
            <td>Diskon</td>
            <td align="right">Rp 12.000</td>
          </tr>
          <tr>
            <td>Dibayar</td>
            <td>
              <NumberInput
                variant="unstyled"
                hideControls
                placeholder="Masukan Nominal"
                parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                labelProps={{ mb: 8 }}
                mb="sm"
                formatter={(value) =>
                  !Number.isNaN(parseFloat(value || ''))
                    ? `Rp ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                    : 'Rp '
                }
              />
            </td>
          </tr>
        </tbody>
      </Table>
    </Box>
  );
}
