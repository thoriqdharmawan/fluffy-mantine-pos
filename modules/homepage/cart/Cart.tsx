import { useState, useEffect } from 'react';
import { Paper, Title, Box, ScrollArea, Button, Flex } from '@mantine/core';
import { useCart } from 'react-use-cart';

import ProductItemCart from './ProductItemCart';
import { convertToRupiah, getVariants } from '../../../context/helpers';
interface Props {
  onNextToPayment: (allItems: any) => void;
}

export default function Cart(props: Props) {
  const { onNextToPayment } = props;
  const { items, updateItemQuantity, removeItem, emptyCart } = useCart();
  const [allItems, setallItems] = useState([{}]);

  useEffect(() => {
    setallItems(JSON.parse(JSON.stringify(items)));
  }, [items]);

  return (
    <Paper h="100vh" pos="sticky" top={0} shadow="md" radius={0} w="100%">
      <Flex h="100%" justify="space-beetwen" direction="column">
        <ScrollArea offsetScrollbars type="auto" style={{ height: '92%' }}>
          <Flex
            p="md"
            pos="sticky"
            top={0}
            justify="space-between"
            mb="lg"
            sx={(theme) => ({
              zIndex: 1,
              alignItems: 'center',
              backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : '#fff',
            })}
          >
            <Title order={3}>Pesanan #232</Title>

            <Button compact variant="subtle" onClick={emptyCart}>
              Hapus Semua Pesanan
            </Button>
          </Flex>

          <Box px="md">
            {allItems?.map((item: any) => {
              const { variants, coord } = item;

              const variant = getVariants(variants, coord);

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
        <Button onClick={() => onNextToPayment(allItems)} h="7%" w="100%" radius={0} m="auto">
          Lanjut Ke Pembayaran
        </Button>
      </Flex>
    </Paper>
  );
}
