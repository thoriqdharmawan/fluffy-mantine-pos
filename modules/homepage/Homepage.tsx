import { Grid } from '@mantine/core';

import Products from './products/Products';
import Cart from './cart/Cart';

type Props = {};

export default function Homepage({}: Props) {
  return (
    <Grid w="100%">
      <Grid.Col sm={12} md={9}>
        <Products />
      </Grid.Col>
      <Grid.Col sm={12} md={3}>
        <Cart />
      </Grid.Col>
    </Grid>
  );
}
