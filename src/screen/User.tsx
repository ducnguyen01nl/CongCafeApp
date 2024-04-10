import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Children, useEffect, useRef, useState, useReducer } from 'react'
import LayoutApp from '../components/LayoutApp'
import { useDispatch, useSelector } from 'react-redux'
import ViewApp from '../components/ViewApp'
import { COLORS } from '../colors/colors'
import { imgApp } from '../assets/img'
import TextApp from '../components/TextApp'
import { useInfoUserCurrent, useListOrder, useListOrderAll } from '../service/useLocalMater'
import IconApp from '../components/IconApp'
import ButtonApp from '../components/ButtonApp'
import ToastMessage from '../components/ToastMessage'
import { navigate } from '../root/RootNavigation'
import { signOut, getAuth } from 'firebase/auth'
import ToastService from '../service/ToastService'
import TouchApp from '../components/TouchApp'
import LoadingApp from '../components/LoadingApp'
import i18n from '../assets/languages/i18n'
import RNRestart from 'react-native-restart'
import InputSelect from '../components/input/InputSelect'
import ModalApp from '../components/ModelApp'
import { AppLang } from '../assets/languages'
import { useFocusEffect } from '@react-navigation/native'
import Count from '../components/Count'
import AsyncStorage from '@react-native-async-storage/async-storage'
type Props = {}

const User = (props: Props) => {
  const { user, userLoading } = useSelector((state: any) => state.user)
  const [isLoading, data, onRefresh] = useListOrderAll();
  const refToast = useRef<any>();
  const _langue = useRef<any>();
  const auth = getAuth()

  const countOrder = (status: number) => {
    return data.filter((item: any) => item.status == status).length
  }
  useEffect(() => {
    onRefresh()
  }, [data])

  const handleLogOut = async () => {

    try {
      await signOut(auth);
      console.log('User signed out successfully');
      ToastService.showToast(AppLang(`dang_xuat_thanh_cong`), 0)
      await AsyncStorage.removeItem("userId")
      navigate('Login')
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const changeLanguage = (language: any) => {
    i18n.locale = language
    forceUpdate()
    _langue.current.close()
    navigate('Screen_splash')
    // setTimeout(() =>{
    //   // CodePush.restartApp()
    //   RNRestart.Restart()
    // },500)
  };


  return (
    <LayoutApp
      style={{ backgroundColor: COLORS.primary }}
    >
      {/* {isLoading ? <LoadingApp />
      : */}
      <ViewApp bg={COLORS.primary} flex1>
        <TouchApp style={styles.blockHeader} onPress={() => navigate('Screen_info_user')} w100 row>
          <ViewApp row alignItems='center' flex3>

            <ViewApp square={60} overF='hidden' mid styleBox={styles.imageUser}>
              <Image source={user?.img ? { uri: user?.img } : imgApp.userDefault} style={{ height: '100%', width: '100%' }} resizeMode='cover' />
            </ViewApp>

            <ViewApp flex1>
              <TextApp color4 size18 bold>{user?.userName}</TextApp>
              <TextApp color4 >{user?.phone}</TextApp>
            </ViewApp>

          </ViewApp>
          <ViewApp row flex1>
            <TextApp color4>{AppLang(`chinh_sua`)}</TextApp>
            <IconApp type='Entypo' name='chevron-right' color={COLORS.text4} />
          </ViewApp>
        </TouchApp>

        {
          user?.role == 1 &&
          <ViewApp pad20 row>
            <TouchApp
              flex1
              mid
              borderW={1}
              borderC={COLORS.transparent}
              onPress={() => { navigate('Screen_order_manage', { idTab: 0 }) }}
            >
              <IconApp style={styles.iconOrder} size={38} type='MaterialCommunityIcons' name='archive-check-outline' />
              <TextApp colorW size12>{AppLang(`cho_xac_nhan`)}</TextApp>
              <Count top={-10} right={'20%'} count={countOrder(0)} />
            </TouchApp>
            <TouchApp
              flex1
              mid
              borderW={1}
              borderC={COLORS.transparent}
              onPress={() => { navigate('Screen_order_manage', { idTab: 1 }) }}
            >
              <IconApp style={styles.iconOrder} size={38} type='MaterialCommunityIcons' name='clipboard-clock-outline' />
              <TextApp colorW size12>{AppLang(`dang_xu_ly`)}</TextApp>
              <Count top={-10} right={'20%'} count={countOrder(1)} />
            </TouchApp>
            <TouchApp
              flex1
              mid
              borderW={1}
              borderC={COLORS.transparent}
              onPress={() => { navigate('Screen_order_manage', { idTab: 2 }) }}
            >
              <IconApp style={styles.iconOrder} size={38} type='MaterialCommunityIcons' name='truck-fast-outline' />
              <TextApp colorW size12>{AppLang('dang_giao')}</TextApp>
              <Count top={-10} right={'20%'} count={countOrder(2)} />
            </TouchApp>
            <TouchApp
              flex1
              mid
              borderW={1}
              borderC={COLORS.transparent}
              onPress={() => { navigate('Screen_order_manage', { idTab: 3 }) }}
            >
              <IconApp style={styles.iconOrder} size={38} type='MaterialCommunityIcons' name='star-outline' />
              <TextApp colorW size12>{AppLang(`hoan_thanh2`)}</TextApp>
              <Count top={-10} right={'20%'} count={countOrder(3)} />
            </TouchApp>

          </ViewApp>
        }

        <ViewApp flex1 backgroundColor={COLORS.text4}
          borderTopLeftRadius={40}
          borderTopRightRadius={40}
          pad20
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ marginBottom: 50 }}
          >
            <ItemTitle title={AppLang(`tai_khoan`)}>
              <ItemChildren title={AppLang(`thong_tin_tai_khoan`)} icon='user' first onPress={() => navigate('Screen_info_user')} />
              {
                user?.role == 1 && <ItemChildren title={AppLang(`danh_sach_dia_chi`)} icon='map-marker' onPress={() => navigate('Screen_address', { select: false })} />
              }
              <ItemChildren title={AppLang(`doi_mat_khau`)} icon='lock' onPress={() => navigate('Screen_change_password')} />
            </ItemTitle>

            <ItemTitle title={AppLang(`ung_dung`)}>
              <ItemChildren title={i18n.t('ngon_ngu')} icon='user' first onPress={() => _langue.current.open()} />
              {
                user?.role == 0 && <ItemChildren title={i18n.t('qr_code')} icon='qrcode' type='AntDesign' onPress={() => { navigate('Screen_qr_code') }} />
              }
              
            </ItemTitle>

            <ItemTitle title={AppLang(`trung_tam_tro_giup`)}>
              <ItemChildren title={AppLang(`cau_hoi_thuong_gap`)} icon='comments' first />
              <ItemChildren title={AppLang(`phan_hoi_ho_tro`)} icon='headset' type='FontAwesome5' />
            </ItemTitle>

            <ButtonApp title={AppLang(`dang_xuat`)} styleButton={{ borderRadius: 10 }}
              onPress={handleLogOut}
            />
          </ScrollView>

        </ViewApp>
        <ModalApp ref={_langue} mid>
          <BoxChangeLang onChange={changeLanguage} />
        </ModalApp>

      </ViewApp>
      {/* }  */}
      <ToastMessage ref={refToast} />
    </LayoutApp>
  )
}

const ItemTitle = ({ title, children }: any) => {
  return (
    <ViewApp >
      <TextApp size18 bold color1>{title}</TextApp>
      <ViewApp w100 bgW borderR={10} marT10 marB={25}>
        {children}
      </ViewApp>
    </ViewApp>
  )
}


const ItemChildren = ({ title, icon, type, first, onPress }: any) => {
  return (
    <ViewApp marH20 borderTW={first ? 0 : 1}>
      <TouchableOpacity style={styles.itemChildren} onPress={onPress}>
        <ViewApp row alignCenter>
          <IconApp name={icon} type={type ? type : 'FontAwesome'} color={COLORS.primary} />
          <TextApp color2>{title}</TextApp>
        </ViewApp>

        <IconApp type='Entypo' name='chevron-right' color={COLORS.text3} />

      </TouchableOpacity>
    </ViewApp>
  )
}

const BoxChangeLang = ({ onChange }: any) => {
  return (
    <ViewApp w={'80%'} h={'40%'} bgW borderR={5} pad5>
      <ViewApp>
        <ScrollView>
          <ViewApp mid h={30} marV={25}>
            <TextApp size22 bold>{i18n.t('thay_doi_ngon_ngu')}</TextApp>
          </ViewApp>
          <TouchApp onPress={() => onChange('vi')} mid padV20 borderBW={1}>
            <TextApp size18>{i18n.t('tieng_viet')}</TextApp>
          </TouchApp>
          <TouchApp onPress={() => onChange('en')} mid padV20 borderBW={1}>
            <TextApp size18>{i18n.t('tieng_anh')}</TextApp>
          </TouchApp>
        </ScrollView>
      </ViewApp>
    </ViewApp>
  )
}


export default User

const styles = StyleSheet.create({
  imageUser: {
    borderWidth: 3,
    borderColor: COLORS.Secondary,
    borderRadius: 100,
  },
  blockHeader: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20
  },
  blockItemMain: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5
  },
  itemChildren: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    paddingVertical: 20,
    borderColor: COLORS.text3
  },
  iconOrder: {
    color: 'white',
    position: "relative"
  }
})
