import { Box, Button, Center, Title } from '@mantine/core';

export default function CompletePayment() {
  return (
    <Center h={400} sx={{display: 'flex', flexDirection: 'column'}}>
      <Title mb="xl">Yeayy!!, Pembayaran Berhasil</Title>
      <Button>Cetak Bukti Pembayaran</Button>
    </Center>
  );
}
