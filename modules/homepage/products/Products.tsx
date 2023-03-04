import { useState } from 'react';
import { Box, Grid, ScrollArea, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useQuery } from '@apollo/client';

import { GET_LIST_PRODUCTS_MENUS } from '../../../services/products';
import { getPrices } from '../../../context/helpers';
import { useUser } from '../../../context/user';
import client from '../../../apollo-client';

import SearchBar from '../../../components/SearchBar';
import ProductCardV2 from '../../../components/cards/ProductCardV2';
import DetailProduct from './detail/DetailProduct';
import { Empty } from '../../../components/empty-state';
import Loading from '../../../components/loading/Loading';

export default function Products() {
  const { companyId } = useUser();
  const [search, setSearch] = useState('');
  const [detail, setDetail] = useState({
    open: false,
    id: '',
  });
  const [debounce] = useDebouncedValue(search, 500);

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
              const { max, min } = product?.product_variants_aggregate?.aggregate || {};
              const prices = getPrices(max?.price, min?.price);

              return (
                <Grid.Col key={product.id} sm={6} lg={4} xl={3}>
                  <ProductCardV2
                    key={product.id}
                    src={product.image}
                    name={product.name}
                    price={prices}
                    onClick={() => setDetail({ open: true, id: product.id })}
                  />
                </Grid.Col>
              );
            })}
            {loading &&
              new Array(12).fill(0).map((i, idx) => {
                return (
                  <Grid.Col key={`${i}${idx}`} sm={6} lg={4} xl={3}>
                    <Loading width="100%" height={242} count={1} />
                  </Grid.Col>
                );
              })}
          </Grid>
          {!loading && data?.total.aggregate.count === 0 && (
            <Empty
              title={debounce ? EMPTY_SEARCH.title : EMPTY_PRODUCT.title}
              label={debounce ? EMPTY_SEARCH.label : EMPTY_PRODUCT.label}
            />
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

const EMPTY_PRODUCT = {
  title: 'Tidak Ada Produk',
  label:
    'Anda belum menambahkan produk apapun ke sistem. Daftar produk yang telah ditambahkan akan muncul di sini',
};

const EMPTY_SEARCH = {
  title: 'Produk Tidak Ditemukan',
  label:
    'Maaf, produk yang Anda cari tidak ditemukan. Silakan periksa kembali kata kunci pencarian Anda atau cobalah kata kunci lain.',
};
