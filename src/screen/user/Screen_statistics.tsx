import { View, Text } from 'react-native'
import React from 'react'
import LayoutApp from '../../components/LayoutApp'
import HeaderApp from '../../components/HeaderApp'
import { AppLang } from '../../assets/languages'
import { goBack } from '../../root/RootNavigation'

const Screen_statistics = () => {
  return (
    <LayoutApp>
      <HeaderApp 
        title={AppLang('thong_ke_don_hang')}
        left={{
          show:true,
          onPress: () =>goBack()
        }}
      />
      
    </LayoutApp>
  )
}

export default Screen_statistics