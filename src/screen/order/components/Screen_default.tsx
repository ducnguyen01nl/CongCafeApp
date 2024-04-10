import { View, Text, ScrollView, Image, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ViewApp from '../../../components/ViewApp'
import TouchApp from '../../../components/TouchApp'
import { COLORS, shadowP } from '../../../colors/colors'
import { useGetTableById, useListOrder } from '../../../service/useLocalMater'
import { number } from 'yup'
import LoadingApp from '../../../components/LoadingApp'
import TextApp from '../../../components/TextApp'
import { AppLang } from '../../../assets/languages'
import { imgApp } from '../../../assets/img'
import IconApp from '../../../components/IconApp'
import { formatMoney } from '../../../utils/format'
import ButtonApp from '../../../components/ButtonApp'
import ModalApp from '../../../components/ModelApp'
import { orderApi } from '../../../api/orderApi'
import ToastService from '../../../service/ToastService'
import { useIsFocused } from '@react-navigation/native'
import { navigate } from '../../../root/RootNavigation'
import { formatDateTimestampAll, titleTypeItem } from '../../../data/dataLocal'
import { useSelector } from 'react-redux'
import App from '../../../../App'

const Screen_default = ({ isLoading, data, onRefresh }: any) => {
  const refModal = useRef<any>()
  const [itemActive, setItemActive] = useState<any>()


  const focus = useIsFocused()
  useEffect(() => {
    onRefresh()
  }, [focus])

  const handleCancelOrder = async () => {
    try {
      await orderApi.updateOrder(itemActive?.id, { status: 4, updateAt: new Date() })
      refModal.current.close()
      ToastService.showToast(AppLang('huy_don_hang_thanh_cong'), 0)
      onRefresh()
    } catch (error) {
      console.log(error);

    }

  }
  //mua lại
  const handleRepurchase = () => {
    navigate('Screen_request_order', { repurchase: itemActive })

  }

  return (
    // <ScrollView style={{ flex: 1 }}>
    // isLoading ? <LoadingApp noBg />
    //   :
    <>
      {
        data.length > 0
          ?
          <FlatList
            data={data}
            renderItem={({ item, index }) => (
              <ItemOrder item={item} key={index} onPress={() => { }}
                onPressButton={() => {
                  setItemActive(item)
                  refModal?.current.open()
                }} />
            )}
            contentContainerStyle={{ paddingBottom: 70 }}
          />
          : <ViewApp mid flex1>
            <TextApp size18 colorP bold pV10>{AppLang('khong_co_don_hang')}</TextApp>
            <Image source={imgApp.boxNothing} style={{ width: '60%', height: '40%' }} resizeMode='contain' />
          </ViewApp>
      }
      <ModalApp ref={refModal} mid>
        <ViewApp w={'90%'} h={'40%'} bgW mid borderR={20} padH10>
          <TextApp colorP size18 bold pV20>{AppLang(itemActive?.status == 0 ? 'ban_co_chac_muon_huy_don_nay_k' : 'ban_co_chac_muon_mua_lai_don_nay_k')}</TextApp>
          <ViewApp row w={'80%'} mid>
            <ButtonApp title={AppLang('huy')} mH10 pH10
              onPress={() => { refModal.current.close() }}
            />
            <ButtonApp title={AppLang('xac_nhan')} mH10 pH10
              onPress={() => { itemActive?.status == 0 ? handleCancelOrder() : handleRepurchase() }}
            />
          </ViewApp>
        </ViewApp>
      </ModalApp>
    </>
    // </ScrollView>

  )
}


const ItemOrder = ({ item, onPress, onPressButton }: any) => {
  const { user } = useSelector((state: any) => state.user)
  const totalCount = item?.orderList?.reduce((count: number, item: any) => count + item.count, 0)
  return (
    <TouchApp minHeight={'30%'} mar10 borderR={20} bgW
      onPress={() => navigate('Screen_order_detail', { item: item })}
      styleBox={{ ...shadowP }}
    >
      {/* <ViewApp pad5 bg={COLORS.Secondary} /> */}
      <ViewApp flex1 pad10>
        {user?.role == 1 && item?.orderList.map((item: any, index: number) => (
          <ViewApp key={index} row centerH marB10>
            <ViewApp row alignCenter flex1>
              <Image source={{ uri: item?.imgItem }}
                style={{ width: 40, height: 40, borderRadius: 5 }}
              />
              <TextApp colorP>{item?.nameItem}</TextApp>
            </ViewApp>
            <TextApp pad5 color2>{`x${item?.count}`}</TextApp>
          </ViewApp>
        ))
        }
        <ViewApp row centerH padV10>
          <TextApp style={{ flex: 1 }} color1>{`${AppLang('ma_don')}: ${item?.id}`}</TextApp>
          <TextApp color1>{formatDateTimestampAll(item?.createAt)}</TextApp>
        </ViewApp>

        <ViewApp row centerH padV10 borderTW={1} borderBW={1}>
          <TextApp color1>{`${totalCount} ${AppLang('san_pham')}`}</TextApp>
          <ViewApp row mid>
            <IconApp color={COLORS.orange} name='dollar-sign' type='FontAwesome5' />
            <TextApp color1>{`${AppLang('thanh_tien')}:`}</TextApp>
            <TextApp bold color={COLORS.orange}>{formatMoney(item?.totalPrice)}</TextApp>
          </ViewApp>
        </ViewApp>

        <ViewApp row centerH padV10 borderBW={1}>
          <TextApp color1>{`${AppLang('hinh_thuc')}:`}</TextApp>
          <ViewApp row mid>
            <TextApp color1>{item?.type == 1 ? AppLang('tai_quan') : AppLang('tai_nha')}</TextApp>
          </ViewApp>
        </ViewApp>
      </ViewApp>
      {
        user?.role == 1 &&
        <ViewApp marH10 row alignCenter>
          <IconApp color='#009197' name={'shipping-fast'} type='FontAwesome5' />
          <TextApp pV10 color={'#009197'}>{AppLang(titleTypeItem(item?.status))}</TextApp>
        </ViewApp>
      }
      {
        user?.role == 1 &&
        <ViewApp row centerH marH10 padH20>

          {
            // item?.status == 3
            //   ? <ButtonApp with4 title={AppLang('danh_gia')}
            //     onPress={() => onPressButton(item)}
            //   />
            //   : <ViewApp>
            //   </ViewApp>
          }
          <ViewApp />

          {
            item?.status == 1 || item?.status == 2 ? null
              :
              <ButtonApp with4 title={AppLang(item?.status == 0 ? 'huy' : 'mua_lai')}
                onPress={() => onPressButton(item)}
              />
          }
        </ViewApp>
      }
    </TouchApp>
  )
}




export default Screen_default