import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { Children, useEffect, useRef, useState, useReducer } from 'react'
import LayoutApp from '../components/LayoutApp'
import { useSelector } from 'react-redux'
import ViewApp from '../components/ViewApp'
import { COLORS } from '../colors/colors'
import { imgApp } from '../assets/img'
import TextApp from '../components/TextApp'
import { useInfoUserCurrent } from '../service/useLocalMater'
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
type Props = {}

const User = (props: Props) => {
  const { user, userLoading } = useSelector((state: any) => state.user)
  const [isLoading, data, onRefresh] = useInfoUserCurrent();
  const refToast = useRef<any>();
  const _langue = useRef<any>();
  const auth = getAuth()
  // console.log('dataCurrent', data);

  // useEffect(() => {    
  //   if (user) {
  //     const fetchData = async () => {
  //       try {
  //         const userInfo = await userApi.getUserInfoById(user);
  //         console.log(userInfo);
  //         setUserInfo(userInfo)
  //       } catch (error) {
  //         console.error('Error fetching user info', error);
  //       }
  //     }
  //     fetchData();
  //     console.log('11',userInfo);

  //   }

  // }, [user])

  const handleLogOut = async () => {

    try {
      await signOut(auth);
      console.log('User signed out successfully');
      ToastService.showToast('Đăng xuất thành công')
      navigate('Login_email')
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const changeLanguage = (language:any) => {
    console.log('====================================');
    console.log('change',language);
    console.log('====================================');
    i18n.locale = language
    forceUpdate()
    _langue.current.close()
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
        <TouchApp style={styles.blockHeader} onPress={() => navigate('Screen_info_user',{data:data})}>
          <ViewApp row alignItems='center'>

            <ViewApp square={60} overF='hidden' mid styleBox={styles.imageUser}>
              <Image source={data?.imgUrl ? {uri:data?.imgUrl} : imgApp.userDefault} style={{height:'100%', width:'100%'}} resizeMode='cover' />
            </ViewApp>

            <ViewApp>
              <TextApp color4 size18 bold>{data.userName}</TextApp>
              <TextApp color4 >{data.phone}</TextApp>
            </ViewApp>

          </ViewApp>
          <ViewApp row>
            <TextApp color4>Chỉnh sửa</TextApp>
            <IconApp type='Entypo' name='chevron-right' color={COLORS.text4} />
          </ViewApp>
        </TouchApp>

        <ViewApp pad20 row>
          <TouchApp
            flex1
            mid
            borderW={1}
            borderC={COLORS.transparent}
            onPress={() =>{}}
          >
            <IconApp style={styles.iconOrder} size={38} type='MaterialCommunityIcons' name='clipboard-clock-outline'/>
            <TextApp colorW>Đang xử lý</TextApp>
            <Count top={-10} right={'30%'} count={10}/>
          </TouchApp>
          <TouchApp
            flex1
            mid
            borderW={1}
            borderC={COLORS.transparent}
            onPress={() =>{}}
          >
            <IconApp style={styles.iconOrder} size={38} type='MaterialCommunityIcons' name='truck-fast-outline'/>
            <TextApp colorW>Đang giao</TextApp>
            <Count top={-10} right={'30%'} count={10}/>
          </TouchApp>
          <TouchApp
            flex1
            mid
            borderW={1}
            borderC={COLORS.transparent}
            onPress={() =>{}}
          >
            <IconApp style={styles.iconOrder} size={38} type='MaterialCommunityIcons' name='star-outline'/>
            <TextApp colorW>Đánh giá</TextApp>
            <Count top={-10} right={'30%'} count={10}/>
          </TouchApp>

        </ViewApp>

        <ViewApp flex1 backgroundColor={COLORS.text4}
          borderTopLeftRadius={40}
          borderTopRightRadius={40}
          pad20
        >
          <ScrollView
            style={{ marginBottom:50}}
          >
            <ItemTitle title='Tài khoản'>
              <ItemChildren title='Hồ sơ' icon='user' first onPress={()=>navigate('Screen_info_user',{data:data})}/>
              <ItemChildren title='Danh sách địa chỉ' icon='map-marker'/>
              <ItemChildren title='Đổi mật khẩu' icon='lock'/>
            </ItemTitle>

            <ItemTitle title='Ứng dụng'>
              <ItemChildren title={i18n.t('ngon_ngu')} icon='user' first onPress={() => _langue.current.open()}/>
            </ItemTitle>
            
            <ItemTitle title='Trung tâm trợ giúp'>
              <ItemChildren title='Câu hỏi thường gặp' icon='comments' first/>
              <ItemChildren title='Phản hồi & hỗ trợ' icon='headset' type='FontAwesome5'/>
            </ItemTitle>

            <ButtonApp title='Đăng xuất' styleButton={{ borderRadius: 10 }}
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

const ItemTitle = ({ title,children}: any) => {
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
          <IconApp name={icon} type= {type ? type :'FontAwesome'} color={COLORS.primary} />
          <TextApp color2>{title}</TextApp>
        </ViewApp>

        <IconApp type='Entypo' name='chevron-right' color={COLORS.text3} />

      </TouchableOpacity>
    </ViewApp>
  )
}

const Count = ({right, left, top, bottom,count}:any) =>{

  return(
    <ViewApp
      positionA
      top={top}
      right={right}
      left={left}
      bottom={bottom}
      backgroundColor={'#B22830'}
      borderR100
    >
      <TextApp colorW size14>{count}</TextApp>
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
  iconOrder:{
    color:'white',
    position:"relative"
  }
})
