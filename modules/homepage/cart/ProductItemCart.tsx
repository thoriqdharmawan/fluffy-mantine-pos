import { useMemo } from 'react';
import {
  Box,
  Flex,
  Image,
  Title,
  Text,
  NumberInput,
  TextInput,
  Badge,
  ActionIcon,
  Paper,
} from '@mantine/core';
import { IconPlus, IconMinus, IconTrash } from '@tabler/icons';
import { useCart } from 'react-use-cart';

type Props = {
  id: string;
  name: string;
  src: string;
  price: string;
  quantity: number;
  variants: string[];
  onAdd: () => void;
  onSubtract: () => void;
  onRemove: () => void;
};

export default function ProductItemCart({
  id,
  quantity,
  src,
  name,
  price,
  variants,
  onAdd,
  onSubtract,
  onRemove,
}: Props) {
  const { getItem } = useCart();

  const availableStock =
    useMemo(() => {
      return getItem(id)?.stock;
    }, [id]) || 0;

  return (
    <Paper mb="xl" h="auto">
      <Flex justify="start" mb="sm">
        <Image radius="sm" src={src} withPlaceholder width={60} height={60} mr="sm" />
        <Box>
          <Title order={5}>{name}</Title>
          <Text color="dimmed" size="md">
            {price}
          </Text>
          <Flex mt="sm" gap="sm">
            {variants.map((v, i) => (
              <Badge sx={{ textTransform: 'capitalize' }} key={i}>
                {v}
              </Badge>
            ))}
          </Flex>
        </Box>
      </Flex>
      <Flex align="center" mb="sm" justify="end">
        <ActionIcon onClick={onRemove} radius="lg" variant="light" color="red" mr="sm">
          <IconTrash size={12} />
        </ActionIcon>
        <ActionIcon onClick={onSubtract} radius="lg" variant="light" color="blue">
          <IconMinus size={12} />
        </ActionIcon>

        <NumberInput
          value={quantity}
          radius="xl"
          ta="right"
          size="sm"
          styles={{ input: { textAlign: 'center' } }}
          defaultValue={0}
          hideControls
          variant="unstyled"
          w={60}
          max={availableStock}
        />
        <ActionIcon
          onClick={onAdd}
          disabled={quantity >= availableStock}
          radius="lg"
          variant="light"
          color="blue"
        >
          <IconPlus size={12} />
        </ActionIcon>
      </Flex>

      <TextInput placeholder="Tambahkan Catatan.." variant="filled" />
    </Paper>
  );
}
