import { View, Text, ScrollView, Image, FlatList } from 'react-native'
import React, { useRef, useState } from 'react'
import ViewApp from '../../components/ViewApp'
import TouchApp from '../../components/TouchApp'
import { COLORS } from '../../colors/colors'
import { useListOrder, useListOrderAll, useListOrderAllApp } from '../../service/useLocalMater'
import { number } from 'yup'
import LoadingApp from '../../components/LoadingApp'
import TextApp from '../../components/TextApp'
import { AppLang } from '../../assets/languages'
import { imgApp } from '../../assets/img'
import IconApp from '../../components/IconApp'
import { formatMoney } from '../../utils/format'
import ButtonApp from '../../components/ButtonApp'
import ModalApp from '../../components/ModelApp'
import Screen_default from './components/Screen_default'
import { useSelector } from 'react-redux'

const Screen_confirm = () => {

  const {user} = useSelector((state:any) => state.user)
  const [isLoading, data, onRefresh] = useListOrder(0)
  const [isLoadingAll, dataAll, onRefreshAll] = useListOrderAllApp(0)
  
  return (
    user?.role == 0 
    ?
    <Screen_default isLoading={isLoadingAll} data={dataAll} onRefresh={onRefreshAll} />
    :
    <Screen_default isLoading={isLoading} data={data} onRefresh={onRefresh} />

  )
}

export default Screen_confirm