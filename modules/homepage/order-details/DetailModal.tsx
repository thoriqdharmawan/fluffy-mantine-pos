import { useState } from 'react';
import { Stepper, Button, Group, Modal } from '@mantine/core';

import DetailOrders from './steps/DetailOrders';
import CompletePayment from './steps/CompletePayment';
import PaymentMethod from './steps/payment-method/PaymentMethod';
import PayNow from './steps/PayNow';

type Props = {
  open: boolean;
  onClose: () => void;
  data: any[];
};

export default function DetailModal({ open, onClose, data }: Props) {
  const [active, setActive] = useState(0);
  
  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const STEPS = [
    {
      label: 'Detail Pesanan',
      description: 'Pesanan yang akan dibuat',
      components: <DetailOrders products={data} />,
    },
    {
      label: 'Metode Pembayaran',
      description: 'Pilih metode pembayaran',
      components: <PaymentMethod />,
    },
    {
      label: 'Bayar Pesanan',
      description: 'Pastikan pesanan sudah sesuai',
      components: <PayNow />,
    },
  ];

  const handleClose = () => {
    onClose();
    setActive(0);
  };

  return (
    <Modal size={940} opened={open} onClose={handleClose}>
      <Stepper active={active} breakpoint="sm">
        {STEPS.map((step, i) => {
          return (
            <Stepper.Step key={i} label={step.label} description={step.description}>
              {step.components}
            </Stepper.Step>
          );
        })}
        <Stepper.Completed><CompletePayment /></Stepper.Completed>
      </Stepper>

      <Group position="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Back
        </Button>
        <Button onClick={nextStep}>Next step</Button>
      </Group>
    </Modal>
  );
}
