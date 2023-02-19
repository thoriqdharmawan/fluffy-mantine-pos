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

type Props = {
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
  quantity,
  src,
  name,
  price,
  variants,
  onAdd,
  onSubtract,
  onRemove,
}: Props) {
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
              <Badge sx={{textTransform: 'capitalize'}} key={i}>{v}</Badge>
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
        />
        <ActionIcon onClick={onAdd} radius="lg" variant="light" color="blue">
          <IconPlus size={12} />
        </ActionIcon>
      </Flex>

      <TextInput placeholder="Tambahkan Catatan.." variant="filled" />
    </Paper>
  );
}
