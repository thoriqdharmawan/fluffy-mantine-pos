import {useEffect, useState} from 'react'
import { useOs } from '@mantine/hooks';

import MainLayout from '../../layouts/MainLayout'

type Props = {}

export default function index({}: Props) {
  const [os, setOs] = useState('')
  const detected = useOs();

  useEffect(() => {
    setOs(detected)
  }, [])

  return (
    <MainLayout>
      <h1>OS: {os}</h1>
    </MainLayout>
  )
}