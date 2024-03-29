import { View, Text } from 'react-native'
import React from 'react'
import { useListOrder, useListOrderAllApp } from '../../service/useLocalMater'
import Screen_default from './components/Screen_default'
import { useSelector } from 'react-redux'

const Screen_handle = () => {
  const {user} = useSelector((state:any) => state.user)
  const [isLoading, data, onRefresh] = useListOrder(1)
  const [isLoadingAll, dataAll, onRefreshAll] = useListOrderAllApp(1)
  
  return (
    user?.role == 0 
    ?
    <Screen_default isLoading={isLoadingAll} data={dataAll} onRefresh={onRefreshAll} />
    :
    <Screen_default isLoading={isLoading} data={data} onRefresh={onRefresh} />

  )
}

export default Screen_handle