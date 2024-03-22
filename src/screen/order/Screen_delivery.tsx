import { View, Text } from 'react-native'
import React from 'react'
import { useListOrder } from '../../service/useLocalMater'
import Screen_default from './components/Screen_default'

const Screen_delivery = () => {
  const [isLoading, data, onRefresh] = useListOrder(2)
  
  return (
    <Screen_default isLoading={isLoading} data={data} onRefresh={onRefresh} />

  )
}

export default Screen_delivery