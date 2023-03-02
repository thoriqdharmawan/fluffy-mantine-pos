import { useState } from 'react';
import { Box, Grid, ScrollArea, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';

import { GET_LIST_PRODUCTS_MENUS } from '../../../services/products';
import { useUser } from '../../../context/user';

import ProductsCard from '../../../components/cards/ProductsCard';
import SearchBar from '../../../components/SearchBar';
import { convertToRupiah } from '../../../context/helpers';
import { useQuery } from '@apollo/client';
import client from '../../../apollo-client';
import ProductCardV2 from '../../../components/cards/ProductCardV2';
import DetailProduct from './detail/DetailProduct';

export default function Products() {
  const { companyId } = useUser();
  const [search, setSearch] = useState('');
  const [detail, setDetail] = useState({
    open: false,
    id: '',
  });
  const [debounce] = useDebouncedValue(search, 200);

  const { data, loading } = useQuery(GET_LIST_PRODUCTS_MENUS, {
    client: client,
    variables: {
      company_id: companyId,
      search: `%${debounce}%`,
    },
  });

  return (
    <>
      <ScrollArea sx={{ height: '100vh', width: '100%' }} offsetScrollbars type="auto">
        <Box
          p="lg"
          sx={(theme) => ({
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
          })}
        >
          <SearchBar
            onChange={(e) => setSearch(e.target.value)}
            mb="lg"
            placeholder="Cari Produk"
          />
          <Grid>
            {data?.products.map((product: any) => {
              return (
                <Grid.Col key={product.id} sm={6} lg={4} xl={3}>
                  <ProductCardV2
                    key={product.id}
                    src={product.image}
                    name={product.name}
                    price={convertToRupiah(product?.product_variants?.[0].price)}
                    // onClick={() => handleClickProduct(product.id)}
                    onClick={() => setDetail({ open: true, id: product.id })}
                  />
                </Grid.Col>
              );
            })}
          </Grid>
          {!loading && data?.total.aggregate.count === 0 && (
            <Text m="xl">Tidak ada Produk lagi</Text>
          )}
        </Box>
      </ScrollArea>

      <DetailProduct
        open={detail.open}
        id={detail.id}
        onClose={() => setDetail({ open: false, id: '' })}
      />
    </>
  );
}
