import { View, Text, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import QRCode from 'react-native-qrcode-svg';
import ViewApp from '../../components/ViewApp';
import LayoutApp from '../../components/LayoutApp';
import HeaderApp from '../../components/HeaderApp';
import { AppLang } from '../../assets/languages';
import { goBack, navigate } from '../../root/RootNavigation';
import InputCustom from '../../components/input/InputCustom';
import TextApp from '../../components/TextApp';
import ButtonApp from '../../components/ButtonApp';
import App from '../../../App';

const Screen_qr_code = () => {
    const [table,setTable] = useState<any>()
    const [floor,setFloor] = useState<any>()
    const data = {
        id:'abc',
        numberTable:6
    }
    const hangleCreateQR = () =>{
        navigate('Screen_show_qr_code',{numberTable:table,floor:floor})
        
    }

  return (
    <LayoutApp>
        <HeaderApp 
            title={AppLang('ma_qr')}
            left={{
                show:true,
                onPress:() => goBack()
            }}
        />
        <ViewApp flex1 mid>
            <ViewApp row mid>
                <TextApp size22 mV20 colorP>{AppLang('nhap_so_ban')}</TextApp>
                <TextInput onChangeText={text => setTable(text)} style={{borderWidth:1,width:'20%',height:50,borderRadius:10,fontSize:16,textAlign:'center',fontWeight:'bold'}} keyboardType='number-pad' />
            </ViewApp>
            <ViewApp row mid>
                <TextApp size22 mV20 colorP>{AppLang('nhap_so_tang')}</TextApp>
                <TextInput onChangeText={text => setFloor(text)} style={{borderWidth:1,width:'20%',height:50,borderRadius:10,fontSize:16,textAlign:'center',fontWeight:'bold'}} keyboardType='number-pad' />
            </ViewApp>
            <ButtonApp title={AppLang('tao_ma_qr')} 
                onPress={hangleCreateQR}
            />
        </ViewApp>

        {/* <QRCode 
            value={JSON.stringify(data)}
        /> */}
    </LayoutApp>
)
}

export default Screen_qr_code