import { Table, Button, Paper, Pagination, Group, Badge, ActionIcon } from '@mantine/core';
import { IconEye } from '@tabler/icons';

interface TableOrderHistoriesProps {}

const data = [
  {
    orderId: 1,
    customerName: 'Amel',
    dateAdded: '10 Januari 2020',
    totalAmount: 34000,
    cashier: 'Maruf',
    status: 'COMPLETE',
  },
  {
    orderId: 2,
    customerName: 'Mayang',
    dateAdded: '10 Januari 2020',
    totalAmount: 34200,
    cashier: 'Maruf',
    status: 'COMPLETE',
  },
  {
    orderId: 3,
    customerName: 'Farhan',
    dateAdded: '10 Januari 2020',
    totalAmount: 1000,
    cashier: 'Maruf',
    status: 'COMPLETE',
  },
  {
    orderId: 4,
    customerName: 'Tamu',
    dateAdded: '10 Januari 2020',
    totalAmount: 53000,
    cashier: 'Maruf',
    status: 'COMPLETE',
  },
  {
    orderId: 4,
    customerName: 'Tamu',
    dateAdded: '11 Januari 2020',
    totalAmount: 85400,
    cashier: 'Maruf',
    status: 'COMPLETE',
  },
];

export function ListTransactions({}: TableOrderHistoriesProps) {
  const rows = data.map((row) => {
    return (
      <tr key={row.orderId}>
        <td>{row.orderId}</td>
        <td>{row.dateAdded}</td>
        <td>{row.customerName}</td>
        <td>{row.totalAmount}</td>
        <td>{row.cashier}</td>
        <td>
          <Badge color="green">{row.status}</Badge>
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
            <th>Harga</th>
            <th>Kasir</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
      <Group mt={24} mb={12}>
        <Pagination ml="auto" total={10} />
      </Group>
    </Paper>
  );
}
