import { View, StyleSheet, Image, ScrollView } from 'react-native'
import React, { useRef } from 'react'
import ViewApp from '../../components/ViewApp'
import HeaderApp from '../../components/HeaderApp'
import LayoutApp from '../../components/LayoutApp'
import { goBack, navigate } from '../../root/RootNavigation'
import { COLORS } from '../../colors/colors'
import { imgApp } from '../../assets/img'
import TextApp from '../../components/TextApp'
import TextInputForm from '../../components/TextIputForm'
import ButtonApp from '../../components/ButtonApp'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import auth from '@react-native-firebase/auth'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setUserLoading } from '../../app/redux/slices/userSlice'
import LoadingApp from '../../components/LoadingApp'
import { userApi } from '../../api/userApi'
import ToastService from '../../service/ToastService'
import ToastMessage from '../../components/ToastMessage'
import I18n from 'react-native-i18n'
import { AppLang } from '../../assets/languages'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { convertFirebaseTimestamp } from '../../components/convertData'
import { covertFirebaseTimeStampToString } from '../../utils/format'
import moment from 'moment'
const Login_email = () => {
  const toastRef:any = useRef(null)
  const formik = useFormik({
    initialValues: {
      email:'admin@gmail.com',
      password:'12345678',
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().lowercase().email(AppLang(`phai_la_email`)).required(AppLang(`email_khong_duoc_trong`)),
      password: Yup.string().trim().min(6, AppLang(`mat_khau_phai_nhieu_hon_6`)).required(AppLang(`mat_khau_khong_duoc_trong`)),
    }),
    onSubmit: (values) => {
      console.log('value', values);

    }
  })
  const {user,userLoading} = useSelector((state:any) => state.user);
  const dispatch = useDispatch();

  const handleLogin = async() => {
    formik.validateForm().then(async(errors) => {
      if (errors.email) {
        // toastRef.current?.show(errors.email);
        ToastService.showToast(errors.email)
      } else if(errors.password){
        ToastService.showToast(errors.password)
      }
      else {
        // try {
          dispatch(setUserLoading(true));
          // await signInWithEmailAndPassword(auth,formik.values.email,formik.values.password)
          // .then(async(userCredential) => {
          //   const userInfo = await userApi.getUserInfoByUid(userCredential.user.uid)
          //   dispatch(setUser(userInfo?.user_id))
          //   navigate('BottomTab')
          // })
          // .catch((error) => {
          //   ToastService.showToast('Tài khoản hoặc mật khẩu không đúng')
          //     console.log(error.message);
          // })
          await auth().signInWithEmailAndPassword(formik.values.email,formik.values.password)
          .then(async(userCredential) => {
              const userInfo:any = await userApi.getUserInfoByUid(userCredential.user.uid)
              userInfo.birthday = covertFirebaseTimeStampToString(userInfo?.birthday)
              userInfo.createAt = covertFirebaseTimeStampToString(userInfo?.createAt)
              userInfo.updateAt = covertFirebaseTimeStampToString(userInfo?.updateAt)
              // console.log(userInfo);
              
              dispatch(setUser(userInfo))
              AsyncStorage.setItem('userId',userInfo?.user_id)
              navigate('BottomTab')
            })
          .catch(error => {
            if(error.code === 'auth/invalid-credential'){
              console.log('Tài khoản mật khẩu không đúng');
              return ToastService.showToast(AppLang(`tai_khoan_mk_sai`))
            }
            if(error.code === 'auth/network-request-failed'){
              console.log('không có kết nối mạng');
              return ToastService.showToast(AppLang('khong_co_ket_noi_mang'))
            }
            console.error(error);
          });
          dispatch(setUserLoading(false));
          
        // } catch (error) {
        //   dispatch(setUserLoading(false));
        // }
      }
    });


  }

  return (
    <LayoutApp>
      <HeaderApp title={AppLang(`dang_nhap`)}
        left={{
          show: true,
          onPress: () => goBack()
        }}
      />
      <View style={{ height: 10, backgroundColor: COLORS.text4 }}></View>
      <ScrollView style={{flex:1}} contentContainerStyle={{justifyContent:"center",alignItems:'center'}} showsVerticalScrollIndicator={false}>
        <Image source={imgApp.logoApp} style={styles.logo} resizeMode='contain' />
        <TextApp size30 bold color1>{AppLang(`xin_chao`)}</TextApp>
        <TextApp mV10 color2>{AppLang(`vui_long_dang_nhap_sdt`)}</TextApp>

        <ViewApp style={{width:'80%'}} >
              <TextInputForm placeholder='Email'
                onChangeText={formik.handleChange('email')}
                value={formik.values.email}
                onBlur={formik.handleBlur('email')}
              />
              <TextInputForm placeholder={AppLang(`mat_khau`)} look
                onChangeText={formik.handleChange('password')}
                value={formik.values.password}
                onBlur={formik.handleBlur('password')}
                  />

          <ButtonApp bR={20} title={AppLang(`dang_nhap`)}
            onPress={handleLogin}
          />
        </ViewApp>
      </ScrollView>
      {/* <ToastMessage ref={toastRef} /> */}
      {userLoading && <LoadingApp />}
    </LayoutApp>
  )
}

const styles = StyleSheet.create({
  logo: {
    width: '30%',
  }
})

export default Login_email