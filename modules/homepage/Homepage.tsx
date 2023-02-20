import { useState } from 'react';
import { Box, Flex, Modal } from '@mantine/core';

import Products from './products/Products';
import Cart from './cart/Cart';
import DetailModal from './order-details/DetailModal';

export default function Homepage() {
  const [detail, setDetail] = useState({
    open: false,
    data: [],
  });
  
  const handleNextPayment = (items: any) => {
    setDetail({
      open: true,
      data: items,
    });
  };

  return (
    <>
      <Flex justify="space-between" w="100%" direction={{ base: 'column', md: 'row' }}>
        <Products />

        <Box maw={460} w="100%">
          <Cart onNextToPayment={handleNextPayment} />
        </Box>
      </Flex>

      <DetailModal
        open={detail.open}
        onClose={() => setDetail((prev) => ({ ...prev, open: false, data: [] }))}
        data={detail.data}
      />
    </>
  );
}
