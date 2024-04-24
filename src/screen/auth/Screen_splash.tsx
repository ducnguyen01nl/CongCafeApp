import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { imgApp } from '../../assets/img'
import ViewApp from '../../components/ViewApp'
import LayoutApp from '../../components/LayoutApp'
import TextApp from '../../components/TextApp'
import ButtonApp from '../../components/ButtonApp'
import { navigate } from '../../root/RootNavigation'
import { AppLang } from '../../assets/languages'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { userApi } from '../../api/userApi'
import { covertFirebaseTimeStampToString } from '../../utils/format'
import { store } from '../../app/redux/store'
import { setUser } from '../../app/redux/slices/userSlice'
import { useDispatch } from 'react-redux'
import LoadingApp from '../../components/LoadingApp'
import { useFocusEffect } from '@react-navigation/native'

const Screen_lauch = () => {

  const [isReady,setIsReady] = useState<boolean>(false)
  const checkLogin = async () => {
    const userId: any = await AsyncStorage.getItem('userId')
    if (userId) {
      const userInfoResponse: any = await userApi.getUserInfoById(userId);
      if(userInfoResponse) {
        const userInfo = {
          ...userInfoResponse,
          birthday: covertFirebaseTimeStampToString(userInfoResponse?.birthday),
          createAt: covertFirebaseTimeStampToString(userInfoResponse?.createAt),
          updateAt: covertFirebaseTimeStampToString(userInfoResponse?.updateAt)
        };
        store.dispatch(setUser(userInfo))
        setIsReady(true)
      }
    }
    else{
      navigate('Login')
    }
  }

  useEffect(() => {
    checkLogin()
  }, [])

  useEffect(() => {
    if (isReady) {
      navigate('BottomTab')
    }
  }, [isReady]);


  return (
    <ViewApp flex1 mid>
      <Image source={imgApp.logoApp} style={{width:'50%'}} resizeMode='contain'/>
    </ViewApp>
  )
}

export default Screen_lauch