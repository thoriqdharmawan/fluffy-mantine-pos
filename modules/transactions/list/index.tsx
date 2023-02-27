import { useState, useEffect } from 'react';
import { Table, Paper, Pagination, Group, Badge, ActionIcon, Text } from '@mantine/core';
import { IconEye } from '@tabler/icons';

import { getListTransactions } from '../../../services/transactions';
import { convertToRupiah } from '../../../context/helpers';

interface TableOrderHistoriesProps {}

interface Data {
  data?: any[] | undefined;
  total: number;
  loading: boolean;
}

export function ListTransactions({}: TableOrderHistoriesProps) {
  const [data, setData] = useState<Data>({
    data: [],
    total: 0,
    loading: false,
  });

  const getData = (withLoading: boolean) => {
    if (withLoading) {
      setData((prev) => ({
        ...prev,
        loading: true,
      }));
    }
    getListTransactions({
      fetchPolicy: 'network-only',
    })
      .then(({ data }) => {
        setData((prev) => ({
          ...prev,
          data: data?.transactions,
          total: data.total.aggregate.count,
          loading: false,
        }));
      })
      .catch((err) => console.error(err.message));
  };

  useEffect(() => {
    getData(false);
  }, []);

  const rows = data.data?.map((row: any) => {
    return (
      <tr key={row.id}>
        <td>{row.code || '-'}</td>
        <td>{row.transaction_date}</td>
        <td>
          {row.customer?.name || (
            <Text fs="italic" color="dimmed">
              Tamu
            </Text>
          )}
        </td>
        <td>{convertToRupiah(row.total_amount)}</td>
        <td>{row.employee?.name}</td>
        <td>
          <Badge color="green">{STATUS[row.status] || 'Selesai'}</Badge>
        </td>
        <td>
          <ActionIcon variant="light" color="primary">
            <IconEye size={16} />
          </ActionIcon>
        </td>
      </tr>
    );
  });

  return (
    <Paper shadow="sm" p="md" withBorder w="100%">
      <Table verticalSpacing="xs" striped>
        <thead>
          <tr>
            <th>Nomor Pesanan</th>
            <th>Waktu Pemesanan</th>
            <th>Nama Custormer</th>
            <th>Total Pesanan</th>
            <th>Kasir</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Group mt={24} mb={12}>
        <Pagination ml="auto" total={data.total} />
      </Group>
    </Paper>
  );
}

const STATUS: any = {
  COMPLETED: 'Selesai',
};
