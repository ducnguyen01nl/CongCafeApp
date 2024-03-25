import { Dimensions, FlatList, Image, ImageBackground, ScrollView, StatusBar, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LayoutApp from '../components/LayoutApp'
import ViewApp from '../components/ViewApp'
import { imgApp } from '../assets/img'
import IconApp from '../components/IconApp'
import { COLORS, shadowP } from '../colors/colors'
import TextApp from '../components/TextApp'
import { AppLang } from '../assets/languages'
import TouchApp from '../components/TouchApp'
import { goBack, navigate } from '../root/RootNavigation'
import { formatMoney, moneyDiscount } from '../utils/format'
import { DATA_TYPE_ITEMS } from '../data/dataLocal'
import ListViewItems from './home/components/ListViewItems'
import { drinksApi } from '../api/drinksApi'
import { useSelector } from 'react-redux'
import { useAddressActive, useAddressActive2, useCartUser, useGetItemDrink } from '../service/useLocalMater'
import moment from 'moment'
import { useFocusEffect } from '@react-navigation/native'
import LoadingApp from '../components/LoadingApp'
import {LinearGradient} from 'react-native-linear-gradient'

type Props = {}

const data = [
  {
    name: 'Cốt dừa cà phê',
    des:
      `1.Tên hàng hóa: Cốt dừa cà phê
     2.Xuất xứ: Việt Nam
     3.Định lượng 400ml(140oz)
     4.Thành phần: Cốt dừa, cà phê, sữa đặc, đá bi
     5.HSD và bảo quản: Sản phẩm được làm trong ngày khi có đơn đặt hàng và sử dụng trực tiếp không cần chế biến`,
    star: '4.5',
    price: 55000,
    img: imgApp.imgDemo,
    type: 0,
    status: true,
    discount: 20,
    createAt: new Date(),
    updateAt: new Date(),
  },

]


const Home = (props: Props) => {

  const { user } = useSelector((state: any) => state.user)
  const [isLoading, data, onRefresh] = useCartUser()
  console.log(data);

  const [isLoadingAddress, dataAddress, onRefreshAddress] = useAddressActive2()
  useFocusEffect(
    React.useCallback(() => {
      onRefreshAddress()
      onRefresh()
    }, [])
  )

  return (

    !isLoadingAddress &&
    <LayoutApp>
      <ViewApp h={'24%'} bg={COLORS.primary} backgroundColor={'#ECF6F8'}>
        <LinearGradient
          colors={[COLORS.primary,'#ECF6F8']}
        >
          <ViewApp pad10 row centerH>
            <ViewApp row flex2>
              <TouchApp borderW={3} square={50} borderC={COLORS.Secondary} borderR={10} mid overF='hidden'
                onPress={() => navigate('Screen_info_user')}
              >
                <Image style={{ width: '100%', height: '100%' }} source={user.img ? { uri: user.img } : imgApp.userDefault} resizeMode='cover' />
              </TouchApp>
              <TouchApp row alignCenter marH10
                onPress={() => navigate('Screen_address', { select: true })}
              >
                <IconApp size={24} name='location' color={COLORS.Secondary} />
                <ViewApp flex1 padR={25}>
                  <TextApp color={COLORS.Secondary}>{dataAddress?.name}</TextApp>
                  <TextApp numberOfLines={1} color={COLORS.Secondary}>{dataAddress?.address}</TextApp>
                </ViewApp>
              </TouchApp>
            </ViewApp>

            <ViewApp row w={'28%'} justifyC='flex-end'>
              {/* <TouchApp square={40} borderR={20} mid onPress={() => {
              }}>
                <IconApp color={COLORS.Secondary} size={26} name='search' />
              </TouchApp> */}

              <TouchApp square={40} borderR={20} mid
                onPress={() => navigate('Screen_qr_screen')}
              >
                <IconApp color={COLORS.Secondary} size={26} name='qrcode' type='AntDesign' />
              </TouchApp>

              <TouchApp square={40} borderR={20} mid>
                <IconApp color={COLORS.Secondary} size={26} name='bell' type='FontAwesome5' />
              </TouchApp>
            </ViewApp>
          </ViewApp>

          <ViewApp row centerH mar20>
            <TouchApp row flex1 mid bg={COLORS.yl} padV10 borderR={10} borderC={COLORS.yl} borderW={3} marR={20}
              onPress={() => navigate('Screen_cart')}
            >
              <IconApp size={20} color={COLORS.white} name='shopping-basket' type='FontAwesome' />
              <TextApp bold size16 color={COLORS.white}>{data?.order?.length}</TextApp>
            </TouchApp>
            {/* <TouchApp flex3 row mid bg={COLORS.yl} padV10 borderR={10} borderC={COLORS.yl} borderW={3}
              onPress={() => navigate('Screen_request_order')}
            >
              <TextApp bold size16 colorW>{`${AppLang('trang_thanh_toan')}`}</TextApp>
            </TouchApp> */}
            <TouchApp flex3 row centerH pad10 bgW borderR={20} borderC={COLORS.yl} borderW={3}
              onPress={() => navigate('Screen_search_item')}
            >
              <TextApp size14 color2>{`${AppLang('tim_kiem')}`}</TextApp>
              <IconApp color={COLORS.primary} size={26} name='search' />
            </TouchApp>
          </ViewApp>
        </LinearGradient>

      </ViewApp>

      <ViewApp style={{ flex: 1, backgroundColor: '#ECF6F8' }}>
        <ListViewItems />

      </ViewApp>


    </LayoutApp>
  )
}

export default Home

const styles = StyleSheet.create({
  banner: {
    height: '50%'
  }
})


const ItemDrink = (item: any) => {
  return (
    <TouchApp key={item.id} borderR={10}
      mar10 mid w={150} styleBox={{ ...shadowP }}
      h={'90%'} flexDirection='column'
      overF='hidden' bgW>
      <Image source={item.img} style={{ width: '100%', flex: 3 }} resizeMode='cover' />
      <ViewApp flex1>
        <TextApp colorP size16>{item.name}</TextApp>
        <TextApp bold colorP>{`${formatMoney(item.price)}đ`}</TextApp>

      </ViewApp>
    </TouchApp>
  )
}