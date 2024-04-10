import React, { useEffect } from 'react'
import LayoutApp from '../../components/LayoutApp';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setTable } from '../../app/redux/slices/tableSlice';
import TextApp from '../../components/TextApp';
import { AppLang } from '../../assets/languages';
import { navigate } from '../../root/RootNavigation';
import ViewApp from '../../components/ViewApp';
const Screen_qr_screen = ({route}:any) => {
  const {totalPrice} = route?.params

const dispatch = useDispatch()
const handleScanner = (value:any) =>{
  console.log(JSON.parse(value.data));
  dispatch(setTable(JSON.parse(value.data)))
  navigate('Screen_request_order',{totalPrice:totalPrice})
}

return(
  <ViewApp flex1 mid>
    <TextApp colorP size18 bold>{AppLang('hay_quet_ma_qr_tren_ban')}</TextApp>
    <QRCodeScanner 
      onRead={(value:any) => handleScanner(value)}
      flashMode={RNCamera.Constants.FlashMode.torch}
      // topContent={
      // }
    />
  </ViewApp>
)



}


export default Screen_qr_screen