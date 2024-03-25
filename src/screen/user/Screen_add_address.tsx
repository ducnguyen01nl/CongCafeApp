import { View, Text, ScrollView } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import LayoutApp from '../../components/LayoutApp'
import HeaderApp from '../../components/HeaderApp'
import { AppLang } from '../../assets/languages'
import { goBack } from '../../root/RootNavigation'
import ViewApp from '../../components/ViewApp'
import { COLORS } from '../../colors/colors'
import TextApp from '../../components/TextApp'
import InputCustom from '../../components/input/InputCustom'
import axios from 'axios'
import InputSelect from '../../components/input/InputSelect'
import { addressApi } from '../../api/addressApi'
import { useAddressVN, useListAddress } from '../../service/useLocalMater'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { regPhone2 } from '../../data/dataLocal'
import { validatePhone } from '../../utils/validate'
import ToastService from '../../service/ToastService'
import TouchApp from '../../components/TouchApp'

const Screen_add_address = ({ route }: any) => {

  const { dataItem } = route?.params
  const [active, setActive] = useState<boolean>(dataItem?.active)
  const parts = dataItem?.address.split(',').map((part: any) => part.trim())
  const consciousPart = parts?.pop();
  const districtPart = parts?.pop();
  const wardsPart = parts?.pop();
  const remaining = parts?.join(', '); // Ghép lại phần còn lại


  useEffect(() => {
    if(dataItem){
      _input.current['conscious'].setValue({ name: consciousPart })
      _input.current['district'].setValue({ name: districtPart })
      _input.current['wards'].setValue({ name: wardsPart })
    }
  }, [])

  // const [data,setData] = useState<any>()
  const _input = useRef<any>({})
  const [consciousActive, setConsciousActive] = useState<any>()
  const [districtActive, setDistrictActive] = useState<any>()
  const [isLoading, data, onRefresh] = useAddressVN()
  const [isLoadingList, dataList, onRefreshList] = useListAddress()

  //get tinh tp
  const conscious = () => {
    const cons: any[] = [];
    if (Array.isArray(data)) {
      data.map((data: any) => {
        cons.push({ name: data.Name, value: data.Id })
      })

    }
    return cons
  }

  //get quan huyen
  const district = useCallback(() => {
    const dis: any[] = []
    if (Array.isArray(data)) {
      const listDisOrigin = data.find((prev: any) => prev.Id == consciousActive?.value)?.Districts
      if (Array.isArray(listDisOrigin)) {
        listDisOrigin.map((data: any) => {
          dis.push({ name: data.Name, value: data.Id })
        })
      }
      return dis
    }
    return []
  }, [consciousActive])

  //get xa phuong
  const wards = useCallback(() => {
    const wards: any[] = []
    if (Array.isArray(district())) {
      const listDisOrigin = data.find((prev: any) => prev.Id == consciousActive?.value)?.Districts
      const listWardsOrigin = listDisOrigin?.find((prev: any) => prev.Id == districtActive?.value)?.Wards
      if (Array.isArray(listWardsOrigin)) {
        listWardsOrigin.map((data: any) => {
          wards.push({ name: data.Name, value: data.Id })
        })
      }
      return wards
    }
    return []
  }, [districtActive])

  const handleAddAddress = async () => {

    const userId: any = await AsyncStorage.getItem('userId')
    const nameAddress = _input.current['name'].getValue();
    const phoneAddress = _input.current['phone'].getValue();
    const conscious = _input.current['conscious'].getValue()?.name;
    const district = _input.current['district'].getValue()?.name;
    const wards = _input.current['wards'].getValue()?.name;
    const house = _input.current['house'].getValue();
    const newAddress = `${house}, ${wards}, ${district}, ${conscious}`

    if (!nameAddress) return ToastService.showToast(AppLang('vui_long_nhap_ho_ten'))
    if (!phoneAddress) return ToastService.showToast(AppLang('vui_long_nhap_sdt'))
    if (!validatePhone(phoneAddress)) return ToastService.showToast(AppLang('sdt_sai_dinh_dang'))
    if (!conscious) return ToastService.showToast(AppLang('vui_long_chon_tinh_tp'))
    if (!district) return ToastService.showToast(AppLang('vui_long_chon_quan_huyen'))
    if (!wards) return ToastService.showToast(AppLang('vui_long_chon_phuong_xa'))
    if (!house) return ToastService.showToast(AppLang('vui_long_nhap_dia_chi_nha'))

    if (dataItem) {
      await addressApi.updateAddress(dataItem?.id, {
        name: nameAddress,
        phone: phoneAddress,
        idUser: userId,
        active: active,
        address: newAddress
      })
    }
    else {
      await addressApi.addNewAddress({
        name: nameAddress,
        phone: phoneAddress,
        idUser: userId,
        active: false,
        address: newAddress
      })
    }
    if(dataItem?.active == false && active == true){
      const idItemActive = dataList.find((prev:any) => prev.active == true)?.id
      // Promise.all([
      // ])
      await addressApi.updateAddress(idItemActive,{active: false})
      await addressApi.updateAddress(dataItem?.id,{active:true})  
    }
    goBack()

  }

  return (
    <LayoutApp>
      <HeaderApp
        title={dataItem ? AppLang('sua_dia_chi') : AppLang('them_dia_chi')}
        left={{
          show: true,
          onPress: () => goBack()
        }}
        right={{
          show: true,
          type: true,
          onPress: () => handleAddAddress()
        }}
      />
      <ScrollView>
        <ViewApp bg={COLORS.text4} pad10>
          <TextApp>{AppLang('lien_he')}</TextApp>
        </ViewApp>
        <ViewApp marV10>
          <InputCustom
            isUpdate
            styleInput={{
              borderWidth: 0,
              borderBottomWidth: 1,
              borderColor: COLORS.text3
            }}
            propsInput={{
              valueInit: dataItem?.name,
              placeholder: AppLang(`ho_va_ten`),
              placeholderTextColor: "#A4A4A4",
              color: COLORS.text1
            }}
            ref={ref => _input.current['name'] = ref}
          />
          <InputCustom
            isUpdate
            styleInput={{
              borderWidth: 0,
              borderBottomWidth: 1,
              borderColor: COLORS.text3
            }}
            propsInput={{
              valueInit: dataItem?.phone,
              placeholder: AppLang(`sdt`),
              placeholderTextColor: "#A4A4A4",
              keyboardType: 'number-pad',
              color: COLORS.text1
            }}
            ref={ref => _input.current['phone'] = ref}
          />
        </ViewApp>
        <ViewApp bg={COLORS.text4} pad10>
          <TextApp>{AppLang('dia_chi')}</TextApp>
        </ViewApp>
        <ViewApp padT10 padH5>
          <InputSelect
            placeholder={AppLang('tinh_TP')}
            data={conscious()}
            icon={{ name: 'caret-down' }}
            ref={ref => _input.current['conscious'] = ref}
            onSelectItem={(e) => setConsciousActive(e)}
          />
        </ViewApp>
        <ViewApp padH5>
          <InputSelect
            placeholder={AppLang('quan_huyen')}
            data={district()}
            icon={{ name: 'caret-down' }}
            ref={ref => _input.current['district'] = ref}
            onSelectItem={(e) => setDistrictActive(e)}
          />
        </ViewApp>
        <ViewApp padH5>
          <InputSelect
            placeholder={AppLang('phuong_xa')}
            data={wards()}
            icon={{ name: 'caret-down' }}
            ref={ref => _input.current['wards'] = ref}
          />
        </ViewApp>
        <ViewApp padH5>
          <InputCustom
            isUpdate
            styleInput={{
              borderColor: COLORS.text1
            }}
            propsInput={{
              placeholder: AppLang(`so_nha_cu_the`),
              placeholderTextColor: "#A4A4A4",
              color: COLORS.text1,
              valueInit: remaining
            }}
            ref={ref => _input.current['house'] = ref}
          />
        </ViewApp>
        {
          dataItem &&
          <ViewApp mid opacity={dataItem?.active ? 0.5 : 1} >
            <TouchApp disabled={dataItem?.active} borderW={1} borderC='red' bgR={active} w={'70%'} mid borderR={5}
              onPress={() => setActive(!active)}
            >
              <TextApp pV10 bold color={active ? 'white' : 'red'}>{active ? AppLang('dang_mac_dinh') : AppLang('dat_lam_mac_dinh')}</TextApp>
            </TouchApp>

          </ViewApp>
        }

      </ScrollView>
    </LayoutApp>
  )
}

export default Screen_add_address