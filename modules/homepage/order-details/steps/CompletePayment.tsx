import { Flex, Center, Paper, Table, Text, Title, CopyButton, ActionIcon, Tooltip } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import { IconCopy, IconCheck } from '@tabler/icons';

import { FormValues } from '../DetailModal';
import { convertToRupiah } from '../../../../context/helpers';

interface Props {
  form: UseFormReturnType<FormValues>;
  totalPayment: number;
  transacitonId: string;
}

export default function CompletePayment(props: Props) {
  const { form, totalPayment, transacitonId } = props;

  const offset = (form.values.paymentAmount || 0) - totalPayment;

  return (
    <Center mih={420} sx={{ display: 'flex', flexDirection: 'column' }} mt="2rem">
      <Title my="xl" order={4}>Pembayaran Berhasil 🥳🥳</Title>
      <Table maw={400} horizontalSpacing="xl" withBorder highlightOnHover striped verticalSpacing="md" mb="2rem">
        <tbody>
          <tr>
            <td>Total Tagihan</td>
            <td><Text ta="right">{convertToRupiah(totalPayment)}</Text></td>
          </tr>
          <tr>
            <td>Dibayar</td>
            <td><Text ta="right">{convertToRupiah(form.values.paymentAmount)}</Text></td>
          </tr>
          {offset > 0 && (
            <tr>
              <td>Kembali</td>
              <td align="right">
                <Text color="green" size="md" fw="bold">+ {convertToRupiah(offset)}</Text>
              </td>
            </tr>
          )}
          {offset < 0 && (
            <tr>
              <td>Kurang</td>
              <td align="right">
                <Text color="red" size="md" fw="bold">- {convertToRupiah(Math.abs(offset))}</Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
      <Title order={5}>ID Transaksi</Title>
      <Paper miw={400} mt="xl" mb="md" p="lg" shadow="sm" radius="md" withBorder>
        <Flex
          gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap">
          <Text variant='gradient' fw="bold">{transacitonId || 'ID Transaksi tidak ditemukan'}</Text>
          <CopyButton value={transacitonId} timeout={2000}>
            {({ copied, copy }) => (
              <Tooltip label={copied ? 'Berhasil disalin' : 'Salin'} withArrow position="right">
                <ActionIcon variant="light" size="lg" color={copied ? 'teal' : 'gray'} onClick={copy}>
                  {copied ? <IconCheck size="1.2rem" /> : <IconCopy size="1.2rem" />}
                </ActionIcon>
              </Tooltip>
            )}
          </CopyButton>
        </Flex>
      </Paper>
      <Text color="dimmed" fs="italic" size="sm" mb="xl">Salin ID Transaksi di atas untuk mencetak struk transaksi</Text>
    </Center>
  );
}
