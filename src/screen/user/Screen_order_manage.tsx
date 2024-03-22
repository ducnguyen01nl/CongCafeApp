import { View, Text } from 'react-native'
import React from 'react'
import LayoutApp from '../../components/LayoutApp'
import HeaderApp from '../../components/HeaderApp'
import { AppLang } from '../../assets/languages'
import { goBack, pop } from '../../root/RootNavigation'
import ViewApp from '../../components/ViewApp'
import TopTab from '../order/components/TopTab'

const Screen_order_manage = ({route}:any) => {

  const {idTab} = route?.params;
  return (
    
    <LayoutApp>
      <HeaderApp 
        title={AppLang('don_mua')}
        left={{
          show:true,
          onPress: () => pop()
        }}
        right={{
          show:true,
          icon:'search',
          onPress:() =>{}
        }}
      />
      <ViewApp flex1>
        <TopTab idTab={idTab} />
      </ViewApp>
    </LayoutApp>
  )
}

export default Screen_order_manage