import { useEffect, useState } from 'react';
import { Box, SimpleGrid, Paper, Text, TextInput, Select, NumberInput } from '@mantine/core';
import { IconBrandShopee, IconCashBanknote } from '@tabler/icons';
import { UseFormReturnType } from '@mantine/form';

import { FormValues } from '../../DetailModal';
import { convertToRupiah } from '../../../../../context/helpers';
import CheckboxCard from '../../../../../components/checkbox/CheckboxCard';
import { getListCustomers } from '../../../../../services/customers';

interface Props {
  totalPayment: number;
  form: UseFormReturnType<FormValues>;
  error: boolean;
}

interface CustomerState {
  data: any[];
  total: number;
  loading: boolean;
}

export default function PaymentMethod(props: Props) {
  const { totalPayment, form, error } = props;
  const [customers, setCustomers] = useState<CustomerState>({
    data: [],
    total: 0,
    loading: false,
  });

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

  const getData = (withLoading?: boolean) => {
    if (withLoading) {
      setCustomers((prev: CustomerState) => ({
        ...prev,
        loading: true,
      }));
    }
    getListCustomers({
      fetchPolicy: 'network-only',
    })
      .then(({ data }: any) => {
        setCustomers((prev: CustomerState) => ({
          ...prev,
          data: data?.customers,
          total: data.total.aggregate.count,
          loading: false,
        }));
      })
      .catch((err) => console.error(err.message));
  };
  useEffect(() => {
    getData();
  }, []);

  const handleChangePayment = (fieldName: string, type: string) => {
    form.setValues((prev) => ({ ...prev, paymentMethod: fieldName, paymentType: type }));
  };

  const isErrorPaymentMethod = error && !form.values.paymentMethod;

  const handleChangeCustomer = (value: string) => {
    if (value !== '0') {
      const _customers = customers.data.find((cus) => cus.id === Number(value));

      form.setFieldValue('customer', {
        name: value,
        phone: Number(_customers?.phone),
        address: _customers?.address || '',
        note: _customers?.note || '',
      });
    } else {
      form.setFieldValue('customer', {
        name: value,
        phone: undefined,
        address: '',
        note: '',
      });
    }
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
              { value: '0', label: 'Umum' },
              ...customers.data?.map((customer) => ({ value: `${customer.id}`, label: customer.name })),
            ]}
            {...form.getInputProps('customer.name')}
            onChange={handleChangeCustomer}
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
            placeholder="Tambahkan Catatan Pelanggan"
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
                      error={isErrorPaymentMethod}
                    />
                  );
                })}
              </Box>
            );
          })}
          {isErrorPaymentMethod && (
            <Text color="red" size="sm">
              Silahkan Pilih Metode Pembayaran
            </Text>
          )}
        </div>
      </SimpleGrid>
    </Box>
  );
}
