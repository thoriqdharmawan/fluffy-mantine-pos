import { useState } from 'react';
import { Box, SimpleGrid, Paper, Text, TextInput, Select, NumberInput } from '@mantine/core';
import { IconBrandShopee, IconCashBanknote } from '@tabler/icons';

import CheckboxCard from '../../../../../components/checkbox/CheckboxCard';

export default function PaymentMethod() {
  const [checked, setChecked] = useState<string>('');

  return (
    <Box p="md">
      <SimpleGrid cols={2} spacing="xl">
        <div>
          <Text mb="sm" ta="center" size="md">
            Detail Pelanggan
          </Text>
          <Select
            label="Nama Pelanggan"
            placeholder="Pilih Pelanggan"
            labelProps={{ mb: 8 }}
            defaultValue="GUEST"
            mb="sm"
            data={[
              { value: 'GUEST', label: 'Guest' },
              { value: 'Amel', label: 'Amel' },
              { value: 'svelte', label: 'Jaenal Anwar' },
              { value: 'vue', label: 'Masud' },
            ]}
          />
          <NumberInput
            label="Nomor HP"
            placeholder="Masukan Nomor HP"
            labelProps={{ mb: 8 }}
            mb="sm"
            icon={
              <Text size="sm" color="dimmed">
                +62
              </Text>
            }
            hideControls
          />
          <TextInput
            label="Alamat"
            placeholder="Masukan Alamat Pelanggan"
            labelProps={{ mb: 8 }}
            mb="sm"
          />
          <TextInput
            label="Catatan"
            placeholder="Tambahkan Catatan Untuk Pelanggan"
            labelProps={{ mb: 8 }}
            mb="sm"
          />
        </div>
        <div>
          <Text mb="sm" ta="center" size="md">
            Total Tagihan
          </Text>
          <Paper mb="xl" p="md" withBorder>
            <Text variant="gradient" ta="center" size="xl" fw="bold">
              Rp 20.0000
            </Text>
          </Paper>
          <Text mb="sm" color="dimmed" size="sm">Online Payment</Text>
          <CheckboxCard
            icon={<IconCashBanknote />}
            checked={checked}
            onChange={setChecked}
            fieldName="gopay"
            title="Go-Pay"
          />
          <CheckboxCard
            icon={<IconBrandShopee />}
            checked={checked}
            onChange={setChecked}
            fieldName="shopeepay"
            title="ShopeePay"
          />
          <Text mb="sm" color="dimmed" size="sm">Offline Payment</Text>
          <CheckboxCard
            icon={<IconCashBanknote />}
            checked={checked}
            onChange={setChecked}
            fieldName="kasir"
            title="Bayar di Kasir"
          />
        </div>
      </SimpleGrid>
    </Box>
  );
}
