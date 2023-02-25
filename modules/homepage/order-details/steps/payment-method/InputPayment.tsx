import { Box, SimpleGrid, Button, NumberInput } from '@mantine/core';

type Props = {};

export default function InputPayment({}: Props) {
  return (
    <Box>
      <SimpleGrid cols={3} mb="xl">
        <Button variant="light">Rp 10.000</Button>
        <Button variant="light">Rp 15.000</Button>
        <Button variant="light">Rp 20.000</Button>
      </SimpleGrid>

      <NumberInput hideControls 
                placeholder="Masukan Nominal"
                parser={(value) => value?.replace(/\$\s?|(,*)/g, '')}
                labelProps={{ mb: 8 }}
                mb="sm"
                formatter={(value) =>
                  !Number.isNaN(parseFloat(value || ''))
                    ? `Rp ${value}`.replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')
                    : 'Rp '
                } />
    </Box>
  );
}
