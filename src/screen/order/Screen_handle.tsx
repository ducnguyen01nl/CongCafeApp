import { View, Text } from 'react-native'
import React from 'react'
import { useListOrder } from '../../service/useLocalMater'
import Screen_default from './components/Screen_default'

const Screen_handle = () => {
  const [isLoading, data, onRefresh] = useListOrder(1)
  
  return (
    <Screen_default isLoading={isLoading} data={data} onRefresh={onRefresh} />

  )
}

export default Screen_handle