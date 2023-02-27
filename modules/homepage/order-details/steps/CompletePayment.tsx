import { Box, Button, Center, Title } from '@mantine/core';

interface Props {
  onClose: () => void;
}

export default function CompletePayment(props: Props) {
  const { onClose } = props;

  return (
    <Center h={400} sx={{ display: 'flex', flexDirection: 'column' }}>
      <Title mb="xl">Yeayy!!, Pembayaran Berhasil</Title>
      <Button>Cetak Bukti Pembayaran</Button>
      <Button onClick={onClose}>Keluar</Button>
    </Center>
  );
}
