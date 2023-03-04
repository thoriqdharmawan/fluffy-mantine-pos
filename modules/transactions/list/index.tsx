import { Table, Paper, Pagination, Group, Badge, ActionIcon, Text } from '@mantine/core';
import { IconEye } from '@tabler/icons';
import { useQuery } from '@apollo/client';
import { usePagination } from '@mantine/hooks';
import dayjs from 'dayjs';

import { GET_LIST_TRANSACTIONS } from '../../../services/transactions';
import { convertToRupiah } from '../../../context/helpers';
import { GLOBAL_FORMAT_DATE } from '../../../context/global';

import client from '../../../apollo-client';
import Loading from '../../../components/loading/Loading';

interface TableOrderHistoriesProps {
  onClick: (id: string) => void;
}

const LIMIT = 10;

export function ListTransactions({ onClick }: TableOrderHistoriesProps) {
  const pagination = usePagination({ total: 10, initialPage: 1 });

  const { data, loading, error } = useQuery(GET_LIST_TRANSACTIONS, {
    client: client,
    fetchPolicy: 'cache-and-network',
    variables: {
      limit: LIMIT,
      offset: (pagination.active - 1) * LIMIT,
    },
  });

  if (error) {
    console.error(error);
  }

  const totalPage = Math.ceil((data?.total.aggregate.count || 0) / LIMIT);

  const rows = data?.transactions?.map((row: any) => {
    return (
      <tr key={row.id}>
        <td>{row.code || '-'}</td>
        <td>{dayjs(row.transaction_date).format(GLOBAL_FORMAT_DATE)}</td>
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
          <ActionIcon onClick={() => onClick(row.id)} variant="light" color="primary">
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
            <th>Waktu Transaksi</th>
            <th>Nama Custormer</th>
            <th>Total Pesanan</th>
            <th>Kasir</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        {!loading && <tbody>{rows}</tbody>}
      </Table>
      {loading && <Loading />}
      <Group mt={24} mb={12}>
        <Pagination ml="auto" total={totalPage} onChange={pagination.setPage} />
      </Group>
    </Paper>
  );
}

const STATUS: any = {
  COMPLETED: 'Selesai',
};
