import { Box, Flex } from '@mantine/core';

import ProductsCard from '../../../components/cards/ProductsCard';
import SearchBar from '../../../components/SearchBar';

export default function Products() {
  return (
    <Box p="lg" bg="#F8F8F8">
      <SearchBar mb="lg" placeholder='Cari Produk' />
      <Flex gap="xl" wrap="wrap" justify="center">
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
        <ProductsCard />
      </Flex>
    </Box>
  );
}
