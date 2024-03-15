import { View, Text } from 'react-native'
import React from 'react'
import LayoutApp from '../../components/LayoutApp'
import HeaderApp from '../../components/HeaderApp'
import { AppLang } from '../../assets/languages'
import { goBack, navigate } from '../../root/RootNavigation'
import ViewApp from '../../components/ViewApp'
import { COLORS } from '../../colors/colors'
import TextApp from '../../components/TextApp'
import IconApp from '../../components/IconApp'
import TouchApp from '../../components/TouchApp'
import { useListAddress } from '../../service/useLocalMater'
import ToastService from '../../service/ToastService'
const MAX_ADDRESS = 5;

const Screen_address = ({route}:any) => {

  const {select} = route?.params;

  const [isLoading, data, onRefresh] = useListAddress()

  const handleAddAddress = () =>{
    if(data.length >= 5) ToastService.showToast(AppLang('so_luong_dia_chi_da_luu_tren_5'))
    navigate('Screen_add_address')
  }

  return (
    <LayoutApp>
      <HeaderApp
        title={select ? AppLang('chon_dia_chi_da_luu') : AppLang(`danh_sach_dia_chi`)}
        left={{
          show: true,
          onPress: () => goBack()
        }}
      />
      
      <ViewApp>
        <ViewApp backgroundColor={COLORS.text4} pad10 row centerH>
          <TextApp>{AppLang('dia_diem_cua_toi')}</TextApp>
          <TextApp>{`${data.length}/${MAX_ADDRESS}`}</TextApp>
        </ViewApp>
      </ViewApp>

      <ViewApp>
        {
          data.length > 0 
          && data.map((item:any) =>(
            <ItemAddress {...item} key={item.id}/>
          ))
        }
      </ViewApp>

      <ViewApp borderW={1}></ViewApp>
      <TouchApp minH={50} row pad10 onPress={handleAddAddress}>
        <IconApp name='plus' type='Entypo' color={COLORS.primary} />
        <TextApp colorP size16>{AppLang('them_dia_chi')}</TextApp>
      </TouchApp>
    </LayoutApp>
  )
}

const ItemAddress = (item:any) => {
  console.log('item',item);
  
  return(
    <ViewApp key={item.id} w100 minHeight={50} row centerH pad10>
      <ViewApp row alignI='center'>
        <IconApp name='location' />

        <ViewApp>
          <TextApp>{item.name}</TextApp>
          <TextApp>{item.address}</TextApp>
        </ViewApp>
      </ViewApp>

      <ViewApp row>
        <TouchApp pad10>
          <IconApp name='pencil' type='Entypo' />
        </TouchApp>
        
        <TouchApp pad10>
          <IconApp name='delete' type='MaterialCommunityIcons' />
        </TouchApp>
      </ViewApp>
    </ViewApp>
  )
}



export default Screen_address