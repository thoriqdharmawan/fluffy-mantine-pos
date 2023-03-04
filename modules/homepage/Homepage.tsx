import { useState } from 'react';
import { Box, Flex } from '@mantine/core';
import { useQuery } from '@apollo/client';
import dayjs from 'dayjs';

import { GET_TOTAL_TRANSACTIONS_TODAY } from '../../services/transactions';
import client from '../../apollo-client';

import Products from './products/Products';
import Cart from './cart/Cart';
import DetailModal from './order-details/DetailModal';

export default function Homepage() {
  const [detail, setDetail] = useState({
    open: false,
    data: [],
  });

  const { data, refetch } = useQuery(GET_TOTAL_TRANSACTIONS_TODAY, {
    client: client,
    variables: {
      gte: dayjs().format('YYYY-MM-DD'),
      lte: dayjs().add(1, 'day').format('YYYY-MM-DD'),
    },
  });

  const handleNextPayment = (items: any) => {
    setDetail({
      open: true,
      data: items,
    });
  };

  const transacitonNumber = `#${(data?.total.aggregate.count || 0) + 1}`;

  return (
    <>
      <Flex justify="space-between" w="100%" direction={{ base: 'column', md: 'row' }}>
        <Products />

        <Box maw={460} w="100%">
          <Cart onNextToPayment={handleNextPayment} transacitonNumber={transacitonNumber} />
        </Box>
      </Flex>

      <DetailModal
        open={detail.open}
        onClose={() => setDetail((prev) => ({ ...prev, open: false }))}
        data={detail.data}
        refetchTotalTransaction={refetch}
        transactionNumber={transacitonNumber}
      />
    </>
  );
}
