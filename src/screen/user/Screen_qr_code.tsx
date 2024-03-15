import { View, Text } from 'react-native'
import React from 'react'
import QRCode from 'react-native-qrcode-svg';
import ViewApp from '../../components/ViewApp';

const Screen_qr_code = () => {
  return (
    <ViewApp flex1 mid>

        <QRCode 
            value='06'
        />
    </ViewApp>
)
}

export default Screen_qr_code