import { useState, useEffect } from 'react';
import { Paper, Title, Box, ScrollArea, Button, Flex } from '@mantine/core';
import { useCart } from 'react-use-cart';

import { convertToRupiah, getVariants } from '../../../context/helpers';
import ProductItemCart from './ProductItemCart';

interface Props {
  onNextToPayment: (allItems: any) => void;
  totalTransaction: number;
}

export default function Cart(props: Props) {
  const { onNextToPayment, totalTransaction } = props;
  const { items, updateItemQuantity, removeItem, emptyCart } = useCart();
  const [allItems, setallItems] = useState([{}]);

  useEffect(() => {
    setallItems(JSON.parse(JSON.stringify(items)));
  }, [items]);

  return (
    <Paper h="100vh" pos="sticky" top={0} shadow="md" radius={0} w="100%">
      <Box component={ScrollArea} h="calc(100vh - 70px)">
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
          <Title order={3}>Pesanan #{totalTransaction + 1}</Title>

          <Button compact variant="subtle" onClick={emptyCart}>
            Hapus Semua Pesanan
          </Button>
        </Flex>

        <Box px="md">
          {allItems?.map((item: any, i) => {
            const { variants, coord } = item;

            const variant = getVariants(variants, coord);

            return (
              <ProductItemCart
                quantity={item.quantity || 0}
                name={item.name}
                src={item.src}
                price={convertToRupiah(item.price)}
                variants={variant}
                key={i}
                onAdd={() => updateItemQuantity(item.id, (item.quantity || 0) + 1)}
                onSubtract={() => updateItemQuantity(item.id, (item.quantity || 0) - 1)}
                onRemove={() => removeItem(item.id)}
              />
            );
          })}
        </Box>
      </Box>
      <Button
        h="70px"
        w="100%"
        m="auto"
        radius={0}
        onClick={() => onNextToPayment(allItems)}
        sx={{
          '&:active': {
            transform: 'translateY(0px)',
          },
        }}
      >
        Lanjut Ke Pembayaran
      </Button>
    </Paper>
  );
}
