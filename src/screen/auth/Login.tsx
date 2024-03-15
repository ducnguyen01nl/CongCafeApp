import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import ViewApp from '../../components/ViewApp'
import LayoutApp from '../../components/LayoutApp'
import TextApp from '../../components/TextApp'
import ButtonApp from '../../components/ButtonApp'
import { imgApp } from '../../assets/img'
import { navigate } from '../../root/RootNavigation'
import { AppLang } from '../../assets/languages'

interface FormLogin {
  phone?: string
  email?: string
  password?: string
}
// const REgPhone: RegExp = /^(0[1-9]|84[1-9])[0-9]{8}$/

const Login = () => {

  return (
    <LayoutApp>
      <ViewApp mid flex1>
        <Image source={imgApp.logoApp} style={styles.logo} resizeMode='contain' />
        <TextApp color2>{AppLang(`vui_long_dang_nhap`)}</TextApp>
        <ButtonApp with8 mV20 title={AppLang(`dang_nhap_sdt`)} 
        styleText={{color:'#FFF'}}
          onPress={() =>{
            navigate('Login_phone',)
            
          }}
        />
        <ViewApp style={{flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
          <TextApp style={{textAlign:'center'}}>
            <TouchableOpacity
              onPress={() =>{
                navigate('Login_email',)
              }}
            >
              <TextApp colorP>{AppLang(`dang_nhap_tai_khoan`)}</TextApp>
            </TouchableOpacity>
          </TextApp>
        </ViewApp>
      </ViewApp>

    </LayoutApp>
  )
}

export default Login

const styles = StyleSheet.create({
  logo:{
    width:'40%'
  }
})