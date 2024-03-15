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
import { navigate } from '../root/RootNavigation'
import { formatMoney } from '../utils/format'
import { DATA_TYPE_ITEMS } from '../data/dataLocal'
import ListViewItems from './home/components/ListViewItems'
import { drinksApi } from '../api/drinksApi'
import { useSelector } from 'react-redux'

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

  const {user} = useSelector((state:any) => state.user)
  console.log('====================================');
  console.log(user);
  console.log('====================================');

  return (
    <LayoutApp>
      <ViewApp h={'24%'} bg={COLORS.primary}>
        <ViewApp pad10 row centerH>
          <ViewApp row>
            <TouchApp borderW={3} square={50} borderC={COLORS.Secondary} borderR={10} mid overF='hidden'
              onPress={() => navigate('Screen_info_user')}
            >
              <Image style={{ width: '100%', height:'100%' }} source={user.img ? {uri:user.img} : imgApp.userDefault} resizeMode='cover' />
            </TouchApp>
            <TouchApp row alignCenter marH10>
              <IconApp size={24} name='location' color={COLORS.Secondary} />
              <ViewApp>
                <TextApp color={COLORS.Secondary}>{`Nguyên`}</TextApp>
                <TextApp color={COLORS.Secondary}>{`96 Định Công, Hà Nội`}</TextApp>
              </ViewApp>
            </TouchApp>
          </ViewApp>

          <ViewApp row>
            <TouchApp square={40} borderR={20} mid onPress={() => {
              data.map((item:any) =>{
                drinksApi.addNewDrinks(item)
              })
            }}>
              <IconApp color={COLORS.Secondary} size={26} name='search' />
            </TouchApp>
            
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
          <TouchApp row flex1 mid bgW padV10 borderR={10} borderC={COLORS.yl} borderW={3} marR={20}>
            <IconApp color={COLORS.yl} name='shopping-basket' type='FontAwesome' />
            <TextApp bold size16 color={COLORS.yl}>{`10`}</TextApp>
          </TouchApp>
          <TouchApp flex3 row mid bg={COLORS.yl} padV10 borderR={10} borderC={COLORS.yl} borderW={3}>
            <TextApp bold size16 colorW>{`${AppLang('trang_thanh_toan')} - 100000`}</TextApp>
          </TouchApp>
        </ViewApp>

      </ViewApp>

      <ViewApp style={{ flex: 1,backgroundColor:'#ECF6F8' }}>

        {/* <ViewApp h={heightScreen * 0.35} >

          <TextApp colorP size18 pad10 style={{ textTransform: 'uppercase' }}>{AppLang('moi_nhat')}</TextApp>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ alignItems: 'center' }}
          >
            {
              data.map((item: any,index:number) => (
                <ItemDrink {...item} key={index}/>
              ))
            }
          </ScrollView>

        </ViewApp> */}
        
        {/* <TextApp colorP size18 pad10 style={{ textTransform: 'uppercase' }}>{AppLang('danh_sach_do_uong')}</TextApp> */}
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
      mar10 mid w={150} styleBox={{...shadowP}}
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