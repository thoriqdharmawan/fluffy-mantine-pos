import { useMemo, useState } from 'react';
import { Stepper, Button, Flex, Modal } from '@mantine/core';
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

const getNextLabel = (active: number) => {
  switch (active) {
    case 0:
      return 'Lanjut ke Metode Pembayaran';
    case 1:
      return 'Lanjut ke Pembayaran';
    case 2:
      return 'Buat Pesanan';
    default:
      return 'Selanjutnya';
  }
};

export default function DetailModal({ open, onClose, data }: Props) {
  const [active, setActive] = useState(0);
  const [error, setError] = useState(false);

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

  const makeError = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 5000);
  };

  const nextStep = () => {
    if (active === 1 && !form.values.paymentMethod) {
      makeError();
      return;
    }

    if (active === 2 && !form.values.paymentAmount) {
      makeError();
      return;
    }

    setError(false);
    setActive((current) => (current < 3 ? current + 1 : current));
  };
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
      components: <PaymentMethod totalPayment={totalPayment} form={form} error={error} />,
    },
    {
      label: 'Bayar Pesanan',
      description: 'Pastikan pesanan sudah sesuai',
      components: <PayNow totalPayment={totalPayment} form={form} error={error} />,
    },
  ];

  const handleClose = () => {
    onClose();
    setActive(0);
    form.reset();
    setError(false);
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

      <Flex hidden={active === 3} justify="space-between" align="center" mt="xl">
        <Button variant="default" onClick={prevStep}>
          Kembali
        </Button>
        <Button onClick={nextStep}>{getNextLabel(active)}</Button>
      </Flex>
    </Modal>
  );
}
