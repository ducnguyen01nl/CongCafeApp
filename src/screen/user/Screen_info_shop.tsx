import { View, Text, Image, ScrollView } from 'react-native'
import React from 'react'
import LayoutApp from '../../components/LayoutApp'
import HeaderApp from '../../components/HeaderApp'
import { AppLang } from '../../assets/languages'
import { goBack } from '../../root/RootNavigation'
import ViewApp from '../../components/ViewApp'
import TextApp from '../../components/TextApp'
import { imgApp } from '../../assets/img'

const Screen_info_shop = () => {
  return (
    <LayoutApp>
        <HeaderApp 
            title={AppLang('thong_tin_cua_hang')}
            left={{
                show:true,
                onPress:() => goBack()
            }}
        />

        <ScrollView style={{flex:1, margin:10}}>
            <TextApp color1 size18 bold mV5>{`${AppLang('gioi_thieu_CCP').toUpperCase()}`}</TextApp>
            <TextApp color2 size18 mV5>{`${AppLang('gioi_thieu_shop')}`}</TextApp>
            <TextApp color1 bold size18 mV5>{`${AppLang('dia_chi')}:`}</TextApp>
            <TextApp color1 size16 mV5>{AppLang('dia_chi_shop')}</TextApp>
            <Image source={imgApp.shop1} style={{width:'100%',borderRadius:20, marginVertical:10}} />

            <TextApp color1 bold size18 mV5>{`${AppLang('dien_thoai')}:`}</TextApp>
            <TextApp color1 size16 mV5>{`+84911866498`}</TextApp>
            <TextApp color1 bold size18 mV5>{`${AppLang('gio_mo_cua')}:`}</TextApp>
            <TextApp color1 size16 mV5>{AppLang('gio_hoat_dong_shop')}</TextApp>
            <Image source={imgApp.shop2} style={{width:'100%',borderRadius:20, marginVertical:10}} />

            <TextApp color1 size18 bold mV5>{`${AppLang('khong_gian_CCP').toUpperCase()}`}</TextApp>
            <TextApp color2 size18 mV5>{`${AppLang('khong_gian_noi_dung')}`}</TextApp>
            <Image source={imgApp.shop3} style={{width:'100%',borderRadius:20, marginVertical:10}} />
            
        </ScrollView>

    </LayoutApp>
  )
}

export default Screen_info_shop