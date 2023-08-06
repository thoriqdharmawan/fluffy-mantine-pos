import { useState, useMemo } from 'react'
import { Box } from '@mantine/core'
import { useQuery } from '@apollo/client';

import { GET_INCOMES } from '../../services/incomes/incomes.graphql';
import { useUser } from '../../context/user';

import Incomes from '../../modules/incomes'

import MainLayout from '../../layouts/MainLayout';
import Chips from '../../components/chips/Chips';
import HeaderSection from '../../components/header/HeaderSection';
import client from '../../apollo-client';
import { convertToRupiah } from '../../context/helpers';
import { VARIABLES_DATE } from '../../context/global';

type Props = {};

const getVariableDate = (variant: string = 'NOW') => {
  return VARIABLES_DATE[variant]
}

export default function index({ }: Props) {
  const [filter, setFilter] = useState<string>('NOW')

  const user = useUser()

  const chips = useMemo(() => [
    {
      label: 'Hari ini',
      value: 'NOW',
      checked: filter === 'NOW',
    },
    {
      label: 'Kemarin',
      value: 'YESTERDAY',
      checked: filter === 'YESTERDAY',
    },
    {
      label: 'Bulan ini',
      value: 'THISMONTH',
      checked: filter === 'THISMONTH',
    },
    {
      label: '30 Hari kebelakang',
      value: 'LAST30DAYS',
      checked: filter === 'LAST30DAYS',
    },
  ], [filter])


  const { data, loading } = useQuery(GET_INCOMES, {
    client: client,
    skip: !user.companyId,
    fetchPolicy: 'network-only',
    variables: {
      ...getVariableDate(filter),
      companyId: user.companyId
    }
  })

  const incomesData = useMemo(() => {
    const { count, sum } = data?.transactions_aggregate?.aggregate || {}

    return [
      {
        title: "Pendapatan",
        value: convertToRupiah(sum?.total_amount || 0),
        description: 'Total uang yang didapatkan'
      },
      {
        title: "Total Transaksi",
        value: count || 0,
        description: 'Total transaksi yang telah terjadi'
      },
    ]
  }, [data])

  return (
    <MainLayout>
      <Box p="lg" w="100%">
        <HeaderSection
          title="Pendapatan"
          label="Anda dapat melihat pedapatan penjualan yang telah berjalan"
        />
        <Chips data={chips} onChange={setFilter} />
        <Incomes data={incomesData} loading={loading} />
      </Box>
    </MainLayout>
  );
}
