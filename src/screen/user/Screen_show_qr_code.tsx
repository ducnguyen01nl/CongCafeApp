import { View, Text } from 'react-native'
import React from 'react'
import ViewApp from '../../components/ViewApp'
import QRCode from 'react-native-qrcode-svg'
import TextApp from '../../components/TextApp'
import { AppLang } from '../../assets/languages'
import LayoutApp from '../../components/LayoutApp'
import HeaderApp from '../../components/HeaderApp'
import { goBack } from '../../root/RootNavigation'

const Screen_show_qr_code = ({route}:any) => {
    const param = route?.params;
  return (
    <LayoutApp>
        <HeaderApp 
            title={''}
            left={{
                show:true,
                onPress:() => goBack()
            }}
        />
    <ViewApp flex1 mid>
        <QRCode 
            value={JSON.stringify(param)}
            size={200}
        />
        <TextApp pV10 size22 colorP bold>{`${AppLang('ban_so')} ${param.numberTable} - ${AppLang('tang')} ${param.floor}`}</TextApp>
    </ViewApp>
    </LayoutApp>
  )
}

export default Screen_show_qr_code