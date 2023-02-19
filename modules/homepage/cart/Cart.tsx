import { useState, useEffect } from 'react';
import { Center, Paper, Title, Box, ScrollArea, Button, Flex, Text } from '@mantine/core';
import { useCart } from 'react-use-cart';

import ProductItemCart from './ProductItemCart';
import { convertToRupiah } from '../../../context/helpers';

export default function Cart() {
  const { items, updateItemQuantity, removeItem, emptyCart } = useCart();
  const [allItems, setallItems] = useState([{}]);

  useEffect(() => {
    setallItems(JSON.parse(JSON.stringify(items)));
  }, [items]);

  // console.log(allItems);
  return (
    <Paper h="100vh" pos="sticky" top={0} shadow="md" radius={0} w="100%">
      <Flex h="100%" justify="space-beetwen" direction="column">
        <ScrollArea offsetScrollbars type="auto" style={{ height: '92%' }}>
          <Flex
            p="md"
            pos="sticky"
            top={0}
            bg="#fff"
            justify="space-between"
            mb="lg"
            sx={{ zIndex: 1, alignItems: 'center' }}
          >
            <Title order={3}>Pesanan #232</Title>

            <Button compact variant="subtle" onClick={emptyCart}>
              Hapus Semua Pesanan
            </Button>
          </Flex>

          <Box px="md">
            {allItems?.map((item: any) => {
              const { variants, coord } = item;
              const variant1 = variants?.[0]?.values?.[coord?.[0] || 0];
              const variant2 = variants?.[1]?.values?.[coord?.[1] || 0];
              const variant = [variant1, variant2].filter((v) => v);

              return (
                <ProductItemCart
                  quantity={item.quantity || 0}
                  name={item.name}
                  src={item.src}
                  price={convertToRupiah(item.price)}
                  variants={variant}
                  key={item.id}
                  onAdd={() => updateItemQuantity(item.id, (item.quantity || 0) + 1)}
                  onSubtract={() => updateItemQuantity(item.id, (item.quantity || 0) - 1)}
                  onRemove={() => removeItem(item.id)}
                />
              );
            })}
          </Box>
        </ScrollArea>
        <Button h="7%" w="100%" radius={0} m="auto">
          Lanjut Ke Pembayaran
        </Button>
      </Flex>
    </Paper>
  );
}
