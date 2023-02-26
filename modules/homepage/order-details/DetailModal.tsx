import { useMemo, useState } from 'react';
import { Stepper, Button, Group, Modal } from '@mantine/core';

import { useForm } from '@mantine/form';

import DetailOrders from './steps/DetailOrders';
import CompletePayment from './steps/CompletePayment';
import PaymentMethod from './steps/payment-method/PaymentMethod';
import PayNow from './steps/PayNow';

type Props = {
  open: boolean;
  onClose: () => void;
  data: any[];
};

interface Customer {
  name: string;
  phone: string;
  address: string;
  note: string;
}

export interface FormValues {
  paymentAmount: number;
  paymentType: string | undefined;
  paymentMethod: string | undefined;
  discount: number;
  discountType: string;
  customer: Customer;
}

export default function DetailModal({ open, onClose, data }: Props) {
  const [active, setActive] = useState(0);

  const form = useForm<FormValues>({
    initialValues: {
      paymentAmount: 0,
      paymentType: undefined,
      paymentMethod: undefined,
      discount: 0,
      discountType: '',
      customer: {
        name: 'GUEST',
        phone: '',
        address: '',
        note: '',
      },
    },
  });

  console.log('values : ', form.values);

  const nextStep = () => setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () => setActive((current) => (current > 0 ? current - 1 : current));

  const totalPayment = useMemo(() => {
    return data.reduce((acc, cur) => acc + cur.itemTotal, 0);
  }, [data]);

  const STEPS = [
    {
      label: 'Detail Pesanan',
      description: 'Pesanan yang akan dibuat',
      components: <DetailOrders products={data} totalPayment={totalPayment} />,
    },
    {
      label: 'Metode Pembayaran',
      description: 'Pilih metode pembayaran',
      components: <PaymentMethod totalPayment={totalPayment} form={form} />,
    },
    {
      label: 'Bayar Pesanan',
      description: 'Pastikan pesanan sudah sesuai',
      components: <PayNow totalPayment={totalPayment} />,
    },
  ];

  const handleClose = () => {
    onClose();
    setActive(0);
    form.reset()
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
        <Stepper.Completed>
          <CompletePayment />
        </Stepper.Completed>
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
