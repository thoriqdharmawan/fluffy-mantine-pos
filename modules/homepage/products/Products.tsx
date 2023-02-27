import { useEffect, useState } from 'react';
import { Box, Grid, ScrollArea, Text } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import { useCart } from 'react-use-cart';

import { getListProductsMenus } from '../../../services/products';
import { useUser } from '../../../context/user';

import ProductsCard from '../../../components/cards/ProductsCard';
import SearchBar from '../../../components/SearchBar';
import { convertToRupiah } from '../../../context/helpers';

interface ProductInterface {
  data: any[];
  total: number;
  loading: boolean;
}

export default function Products() {
  const { addItem } = useCart();
  const { companyId } = useUser();
  const [search, setSearch] = useState('');
  const [debounce] = useDebouncedValue(search, 200);
  const [products, setProducts] = useState<ProductInterface>({
    data: [],
    total: 0,
    loading: false,
  });

  const getProducts = (withLoading: boolean) => {
    if (withLoading) {
      setProducts((prev: ProductInterface) => ({
        ...prev,
        loading: true,
      }));
    }
    if (companyId) {
      getListProductsMenus({
        fetchPolicy: 'network-only',
        variables: {
          company_id: companyId,
          search: `%${debounce}%`,
        },
      })
        .then(({ data }) => {
          setProducts((prev: ProductInterface) => ({
            ...prev,
            data: data?.products,
            total: data.total.aggregate.count,
            loading: false,
          }));
        })
        .catch((err) => console.error(err.message));
    }
  };

  useEffect(() => {
    getProducts(true);
  }, [debounce, companyId]);

  return (
    <ScrollArea sx={{ height: '100vh', width: '100%' }} offsetScrollbars type="auto">
      <Box
        p="lg"
        sx={(theme) => ({
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        })}
      >
        <SearchBar onChange={(e) => setSearch(e.target.value)} mb="lg" placeholder="Cari Produk" />
        <Grid>
          {products.data.map((product) => {
            return (
              <Grid.Col key={product.id} sm={6} xl={4}>
                <ProductsCard
                  src={product.image}
                  name={product.name}
                  price={convertToRupiah(product?.product_variants?.[0].price)}
                  description={product.description}
                  productVariants={product.product_variants}
                  variants={product.variants}
                  type={product.type}
                  onAddToCart={(productVariant, qty) =>
                    addItem({ ...productVariant, productId: product.id }, qty)
                  }
                />
              </Grid.Col>
            );
          })}
        </Grid>
        <Text m="xl">Tidak ada Produk lagi</Text>
      </Box>
    </ScrollArea>
  );
}
