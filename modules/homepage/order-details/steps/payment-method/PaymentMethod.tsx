import { useState } from 'react';
import { Box, SimpleGrid, Paper, Text, TextInput, Select, NumberInput } from '@mantine/core';
import { IconBrandShopee, IconCashBanknote } from '@tabler/icons';
import { UseFormReturnType } from '@mantine/form';

import { FormValues } from '../../DetailModal';
import { convertToRupiah } from '../../../../../context/helpers';
import CheckboxCard from '../../../../../components/checkbox/CheckboxCard';

interface Props {
  totalPayment: number;
  form: UseFormReturnType<FormValues>;
}

export default function PaymentMethod(props: Props) {
  const { totalPayment, form } = props;

  const PAYMENTS = [
    {
      label: 'Online Payment',
      type: 'ONLINE',
      options: [
        {
          icon: IconCashBanknote,
          fieldName: 'GOPAY',
          title: 'Go-Pay',
        },
        {
          icon: IconBrandShopee,
          fieldName: 'SHOPEEPAY',
          title: 'ShoppePay',
        },
      ],
    },
    {
      label: 'Offline Payment',
      type: 'OFFLINE',
      options: [
        {
          icon: IconCashBanknote,
          fieldName: 'CASHIER',
          title: 'Bayar di Kasir',
        },
      ],
    },
  ];

  const handleChangePayment = (fieldName: string, type: string) => {
    form.setValues((prev) => ({ ...prev, paymentMethod: fieldName, paymentType: type }));
  };

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
            mb="sm"
            data={[
              { value: 'GUEST', label: 'Umum' },
              { value: 'Amel', label: 'Amel' },
              { value: 'svelte', label: 'Jaenal Anwar' },
              { value: 'vue', label: 'Masud' },
            ]}
            {...form.getInputProps('customer.name')}
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
            {...form.getInputProps('customer.phone')}
          />
          <TextInput
            label="Alamat"
            placeholder="Masukan Alamat Pelanggan"
            labelProps={{ mb: 8 }}
            mb="sm"
            {...form.getInputProps('customer.address')}
          />
          <TextInput
            label="Catatan"
            placeholder="Tambahkan Catatan Untuk Pelanggan"
            labelProps={{ mb: 8 }}
            mb="sm"
            {...form.getInputProps('customer.note')}
          />
        </div>
        <div>
          <Text mb="sm" ta="center" size="md">
            Subtotal
          </Text>
          <Paper mb="xl" p="md" withBorder>
            <Text variant="gradient" ta="center" size="xl" fw="bold">
              {convertToRupiah(totalPayment)}
            </Text>
          </Paper>
          {PAYMENTS.map((payment, i) => {
            return (
              <Box key={i}>
                <Text mb="sm" color="dimmed" size="sm">
                  {payment.label}
                </Text>
                {payment.options.map((option, idx) => {
                  return (
                    <CheckboxCard
                      key={idx}
                      icon={<option.icon />}
                      checked={form.values.paymentMethod}
                      onChange={(fieldName) => handleChangePayment(fieldName, payment.type)}
                      fieldName={option.fieldName}
                      title={option.title}
                    />
                  );
                })}
              </Box>
            );
          })}
        </div>
      </SimpleGrid>
    </Box>
  );
}
