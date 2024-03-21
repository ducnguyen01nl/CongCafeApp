import { View, Text } from 'react-native'
import React from 'react'
import LayoutApp from '../../components/LayoutApp'
import HeaderApp from '../../components/HeaderApp'
import { AppLang } from '../../assets/languages'
import { goBack } from '../../root/RootNavigation'

const Screen_order_manage = () => {
  return (
    
    <LayoutApp>
      <HeaderApp 
        title={AppLang('don_mua')}
        left={{
          show:true,
          onPress: () => goBack()
        }}
        right={{
          show:true,
          icon:'search',
          onPress:() =>{}
        }}
      />
    </LayoutApp>
  )
}

export default Screen_order_manage