import { useState } from 'react';
import { ActionIcon, Button, Paper, Image, Flex, Title, Text, NumberInput } from '@mantine/core';
import { IconPlus, IconMinus, IconShoppingCart } from '@tabler/icons';

import SelectVariants from './SelectVariants';

export default function ProductsCard() {
  const [total, setTotal] = useState<number>(0);

  return (
    <Paper shadow="lg" radius="lg" p="xl" w={320}>
      <Image
        radius="md"
        height={160}
        width="100%"
        mb="md"
        src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
        alt="Random unsplash image"
      />
      <Title order={4} mb="sm">
        Kopi Hitam
      </Title>

      <Text fz="sm" mb="sm">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, distinctio. dipisicing
        elit. Animi, distinctio.
      </Text>

      <SelectVariants title="Ukuran" variants={['S', 'M', 'L']} />
      <SelectVariants title="Rasa" variants={['Manis', 'Pahit']} />

      <Title order={6} mb="xs">
        Jumlah
      </Title>
      <Flex align="center" gap="xs" mb="sm">
        <ActionIcon
          disabled={total <= 0}
          onClick={() => setTotal((prev) => prev - 1)}
          radius="lg"
          variant="default"
        >
          <IconMinus size={12} />
        </ActionIcon>
        <NumberInput
          value={total}
          radius="xl"
          ta="right"
          min={0}
          onChange={(number: number) => setTotal(number)}
          styles={{ input: { textAlign: 'center' } }}
          defaultValue={0}
          hideControls
        />
        <ActionIcon onClick={() => setTotal((prev) => prev + 1)} variant="default" radius="lg">
          <IconPlus size={12} />
        </ActionIcon>
      </Flex>
      <Button mt="sm" w="100%" radius="lg" leftIcon={<IconShoppingCart size={18} />}>
        Tambah ke Keranjang
      </Button>
    </Paper>
  );
}
