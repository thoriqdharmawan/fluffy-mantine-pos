import { Box, Flex } from '@mantine/core';

import Products from './products/Products';
import Cart from './cart/Cart';

type Props = {};

export default function Homepage({}: Props) {
  return (
    <Flex justify="space-between" w="100%" direction={{base: 'column', md: 'row'}}>
      <Products />

      <Box maw={460} w="100%">
        <Cart />
      </Box>
    </Flex>
  );
}
