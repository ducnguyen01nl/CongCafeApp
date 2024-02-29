import { Image, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import ViewApp from '../../components/ViewApp'
import LayoutApp from '../../components/LayoutApp'
import TextApp from '../../components/TextApp'
import ButtonApp from '../../components/ButtonApp'
import { imgApp } from '../../assets/img'
import { navigate } from '../../root/RootNavigation'

interface FormLogin {
  phone?: string
  email?: string
  password?: string
}
const REgPhone: RegExp = /^(0[1-9]|84[1-9])[0-9]{8}$/

const Login = () => {


  const formik = useFormik({
    initialValues:{
      phone:'',
      email:'',
      password:''
    },
    validationSchema: Yup.object({
      phone: Yup.string().trim().matches(REgPhone,'Số điện thoại không đúng định dạng').required('Số điện thoại không được để trống'),
      email: Yup.string().trim().lowercase().email('Phải là địa chỉ email').required('Không dược để trống'),
      password: Yup.string().trim().min(6, 'Phải nhiều hơn 6 kí tự').required('Không dược để trống'),
    }),
    onSubmit: (values) => {
      console.log('form',values);
      
    }

  })

  return (
    <LayoutApp>
      <ViewApp mid flex1>
        <Image source={imgApp.logoApp} style={styles.logo} resizeMode='contain' />
        <TextApp color2>Vui lòng đăng nhập để sửu dụng dịch vụ</TextApp>
        <ButtonApp with8 mV20 title='Đăng nhập bằng số điện thoại' 
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
              <TextApp colorP>Đăng nhập tài khoản </TextApp>
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