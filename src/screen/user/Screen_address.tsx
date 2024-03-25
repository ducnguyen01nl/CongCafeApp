import { View, Text } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LayoutApp from '../../components/LayoutApp'
import HeaderApp from '../../components/HeaderApp'
import { AppLang } from '../../assets/languages'
import { goBack, navigate } from '../../root/RootNavigation'
import ViewApp from '../../components/ViewApp'
import { COLORS } from '../../colors/colors'
import TextApp from '../../components/TextApp'
import IconApp from '../../components/IconApp'
import TouchApp from '../../components/TouchApp'
import { useAddressActive, useAddressActive2, useListAddress } from '../../service/useLocalMater'
import ToastService from '../../service/ToastService'
import { select } from 'underscore'
import LoadingApp from '../../components/LoadingApp'
import { Modal } from 'react-native-paper'
import ModalApp from '../../components/ModelApp'
import ButtonApp from '../../components/ButtonApp'
import { addressApi } from '../../api/addressApi'
import { useFocusEffect } from '@react-navigation/native'
const MAX_ADDRESS = 5;

const Screen_address = ({ route }: any) => {

  const { params } = route;
  const modalDelete = useRef<any>()
  const [itemDelete,setItemDelete] = useState<any>()
  const [isLoading, data, onRefresh] = useListAddress()
  const dataAddress = useAddressActive()
  const handleAddAddress = () => {
    if (data.length >= 5) return ToastService.showToast(AppLang('so_luong_dia_chi_da_luu_tren_5'))
    navigate('Screen_add_address',{dataItem:null,onRefreshListAddress: onRefresh})
  }
  const handleDeleteAddress = async() => {
    await addressApi.deleteAddress(itemDelete?.id)
    onRefresh()
    modalDelete.current.close()
  }
  useFocusEffect(
    React.useCallback(() =>{
      onRefresh()
    },[])
  )

  const handleSelectAddress = async(item:any) =>{
    try {
      await addressApi.updateAddress(dataAddress?.id,{active: false})
      await addressApi.updateAddress(item?.id,{active:true})  
      if(!params?.select){
        ToastService.showToast(AppLang('cap_nhat_thong_tin_thanh_cong'),0)
      }
      goBack()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <LayoutApp>
      <HeaderApp
        title={params?.select ? AppLang('chon_dia_chi_da_luu') : AppLang(`danh_sach_dia_chi`)}
        left={{
          show: true,
          onPress: () => goBack()
        }}
      />
      {
        isLoading ? <LoadingApp noBg />
          :
          <>
            <ViewApp>
              <ViewApp backgroundColor={COLORS.text4} pad10 row centerH>
                <TextApp>{AppLang('dia_diem_cua_toi')}</TextApp>
                <TextApp>{`${data.length}/${MAX_ADDRESS}`}</TextApp>
              </ViewApp>
            </ViewApp>

            <ViewApp>
              {
                data.length > 0
                && data.map((item: any) => (
                  <ItemAddress item={item} key={item.id} select={params?.select} onRefresh={onRefresh} 
                    onPressDelete={() =>{
                      setItemDelete(item)
                      modalDelete.current.open()
                    }} 
                    onSelectItem={() =>handleSelectAddress(item)}
                    />
                  ))
              }
            </ViewApp>

            <ViewApp borderW={1}></ViewApp>
            <TouchApp minH={50} row pad10 onPress={handleAddAddress}>
              <IconApp name='plus' type='Entypo' color={COLORS.primary} />
              <TextApp colorP size16>{AppLang('them_dia_chi')}</TextApp>
            </TouchApp>
          </>
      }
      <ModalApp ref={modalDelete} mid>
        <ViewApp w={'90%'} h={'40%'} bgW mid borderR={20} padH10>
          <TextApp colorP size18 bold pV20>{AppLang('ban_co_chac_muon_xoa_dia_chi_nay_k')}</TextApp>
          <ViewApp row w={'80%'} mid>
            <ButtonApp title={AppLang('huy')} mH10 pH10
              onPress={() =>{modalDelete.current.close()}}
            />
              <ButtonApp title={AppLang('xac_nhan')} mH10 pH10 
                onPress={() =>{handleDeleteAddress()}}
              />
          </ViewApp>
        </ViewApp>
      </ModalApp>

    </LayoutApp>
  )
}

const ItemAddress = ({ item, select, onRefresh, onPressDelete, onSelectItem }: any) => {

  return (
    <TouchApp disabled={select ? false : true} key={item.id} w100 minHeight={50} row centerH pad10 borderBW={1}
      onPress={onSelectItem}
    >
      <ViewApp row alignI='center' flex1 marR10>
        <IconApp color={COLORS.primary} name='location' />

        <ViewApp>
          {item.active && !select &&
            // <ViewApp borderW={1} borderC='red' borderR={5} marL={5}>
            <TextApp color='red'>{AppLang('mac_dinh')}</TextApp>
            // </ViewApp>
          }
          <ViewApp row alignCenter>
            <TextApp color1>{item.name}</TextApp>
            <IconApp size={12} name='minus' type='Entypo' />
            <TextApp color1>{item.phone}</TextApp>
          </ViewApp>
          <TextApp color1>{item.address}</TextApp>
        </ViewApp>
      </ViewApp>
      {/* {
        !select && 
      <ViewApp row>
        <TouchApp pad10>
          <IconApp name='pencil' type='Entypo' />
        </TouchApp>
        
        <TouchApp pad10>
          <IconApp name='delete' type='MaterialCommunityIcons' />
        </TouchApp>
      </ViewApp>
      } */}
      {
        select ? <IconApp style={{ paddingHorizontal: 10 }} color={item.active ? COLORS.primary : COLORS.text3} name={item.active ? 'checkbox' : 'checkbox-outline'} />
          : <ViewApp row>
            <TouchApp pad10
              onPress={() => navigate('Screen_add_address', { dataItem: item })}
            >
              <IconApp name='pencil' type='Entypo' />
            </TouchApp>

            <TouchApp pad10
              onPress={onPressDelete}
            >
              <IconApp name='delete' type='MaterialCommunityIcons' />
            </TouchApp>
          </ViewApp>
      }
    </TouchApp>
  )
}



export default Screen_address