import { useState } from 'react'
import { Box, Center, Button, TextInput, Select, NumberInput } from '@mantine/core'
import { useMutation, useQuery } from '@apollo/client';
import { useDebouncedValue } from '@mantine/hooks';
import { isNotEmpty, useForm } from '@mantine/form';

import { useUser } from '../../context/user';
import { GET_LIST_EMPLOYEES } from '../../services/employee';

import client from '../../apollo-client';
import { START_WORK } from '../../services/attendace';
import { showNotification } from '@mantine/notifications';
import { IconCheck, IconExclamationMark } from '@tabler/icons';

interface Props {
  onWork: () => void;
}

export default function CheckIn(props: Props) {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState<boolean>(false)
  const [debounce] = useDebouncedValue(search, 500)

  const [employees, setEmployees] = useState([])

  const { companyId } = useUser()
  const { onWork } = props

  const form = useForm({
    initialValues: {
      employee: undefined,
      money_in_drawer_start: undefined,
      note: ''
    },

    validate: {
      employee: isNotEmpty('Bagian ini diperlukan'),
      money_in_drawer_start: isNotEmpty('Bagian ini diperlukan'),
    },
  });

  const [startWork] = useMutation(START_WORK, { client })

  const { error } = useQuery(GET_LIST_EMPLOYEES, {
    skip: !companyId,
    client: client,
    variables: {
      companyId,
      where: {
        companyId: companyId ? { _eq: companyId } : undefined,
        _or: debounce ? { name: { _ilike: `%${debounce}%` }, username: { _ilike: `%${debounce}%` } } : undefined
      }
    },
    onCompleted: (data) => {
      setEmployees(data?.employees.map((emp: any) => ({ value: emp.id, label: emp.name })))
    }
  })

  if (error) {
    console.error(error)
  }

  const handleStartWork = () => {
    const { hasErrors } = form.validate()

    if (!hasErrors) {
      setLoading(true)
      const { values } = form

      startWork({
        variables: {
          companyId,
          employeeId: values.employee,
          money_in_drawer_start: values.money_in_drawer_start,
          note: values.note,
        }
      }).then(() => {
        onWork()
        showNotification({
          title: 'Yukk Semangat Bekerja 💪💪',
          message: 'Semoga yang kita kerjakan menjadi berkah, Aamiin 🤲',
          icon: <IconCheck />,
          color: 'green',
        });
      }).catch(() => {
        showNotification({
          title: 'Gagal memulai pekerjaan',
          message: 'Silahkan coba lagi',
          icon: <IconExclamationMark />,
          color: 'red',
        });
      }).finally(() => setLoading(false))
    }
  }

  return (
    <Center w="100%" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box w="100%" maw={400}>

        <Select
          mb="md"
          label="Nama"
          placeholder="Pilih Nama Kamu"
          searchable
          onSearchChange={setSearch}
          data={employees}
          {...form.getInputProps('employee')}
        />

        <NumberInput
          mb="md"
          icon="Rp"
          min={0}
          label="Uang di Laci"
          placeholder="Masukan Jumlah Uang di Laci saat ini"
          withAsterisk
          hideControls
          parser={(value: any) => value.replace(/\$\s?|(,*)/g, '')}
          formatter={(value: any) =>
            !Number.isNaN(parseFloat(value)) ? `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : ''
          }
          {...form.getInputProps('money_in_drawer_start')}
        />
        <TextInput
          label="Catatan"
          placeholder="Tambahkan Catatan"
          mb="md"
          {...form.getInputProps('note')}
        />

        <Button loading={loading} onClick={handleStartWork} size='md' mt="lg">
          Mulai Bekerja 💪💪
        </Button>
      </Box>
    </Center>
  )
}
