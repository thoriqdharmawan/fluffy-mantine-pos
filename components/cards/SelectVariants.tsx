import { Box, Chip, Title } from '@mantine/core';

type Props = {
  title: string;
  variants: string[];
};

export default function SelectVariants({ title, variants }: Props) {
  return (
    <Box mb="md">
      <Title order={6} mb="xs">
        {title}
      </Title>
      <Chip.Group position="left">
        {variants?.map((variant, idx) => (
          <Chip key={idx} value={variant}>
            {variant}
          </Chip>
        ))}
      </Chip.Group>
    </Box>
  );
}
