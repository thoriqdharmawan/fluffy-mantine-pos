import { Box, Tabs } from '@mantine/core';

import Cash from './Cash'

export default function PaymentMethod() {
  return (
    <Box p="md">
      <Tabs defaultValue="cash">
        <Tabs.List grow>
          <Tabs.Tab value="cash">Cash</Tabs.Tab>
          <Tabs.Tab value="noncash">Non Cash</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="cash" pt="xs">
          <Cash />
        </Tabs.Panel>

        <Tabs.Panel value="noncash" pt="xs">
          Non Cash
        </Tabs.Panel>
      </Tabs>
    </Box>
  );
}
