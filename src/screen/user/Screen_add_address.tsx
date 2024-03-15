import { View, Text } from 'react-native'
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
import { useAddressVN } from '../../service/useLocalMater'

const Screen_add_address = () => {

  // const [data,setData] = useState<any>()
  const _input = useRef<any>({})
  const [isLoading, data, onRefresh] = useAddressVN()
  console.log('====================================');
  console.log(data);
  console.log('====================================');
  const conscious = () => {
    const cons:any[] = [];
    if(Array.isArray(data)){
      data.map((data:any) =>{
        cons.push({name:data.Name, value:data.Id})
      })

    }
    return cons

  }
  const district = useCallback(() => {
    if(Array.isArray(data) && _input.current['conscious']){
     return data.find((prev:any) => prev.Id == _input.current['conscious']?.getValue()?.value)
    }
    return []

  },[_input.current['conscious']])
  console.log(conscious);
  // response.data.map((data:any) =>{conscious.push({name:data.Name,value:data.Id})})    

  return (
    <LayoutApp>
        <HeaderApp 
            title={AppLang('them_dia_chi')}
            left={{
                show:true,
                onPress: () => goBack()
            }}
            right={{
                show:true,
                type:true
            }}
        />
        <ViewApp>
            <ViewApp bg={COLORS.text4} pad10>
              <TextApp>{AppLang('lien_he')}</TextApp>
            </ViewApp>
            <ViewApp marV10>
              <InputCustom 
                isUpdate
                styleInput={{
                  borderWidth:0,
                  borderBottomWidth:1,
                  borderColor:COLORS.text3
                }}
                propsInput={{
                  placeholder: AppLang(`ho_va_ten`),
                    placeholderTextColor: "#A4A4A4",
                    color: COLORS.text2
                }}
              />
              <InputCustom 
                isUpdate
                styleInput={{
                  borderWidth:0,
                  borderBottomWidth:1,
                  borderColor:COLORS.text3
                }}
                propsInput={{
                  placeholder: AppLang(`sdt`),
                    placeholderTextColor: "#A4A4A4",
                    color: COLORS.text2
                }}
              />
            </ViewApp>
            <ViewApp bg={COLORS.text4} pad10>
              <TextApp>{AppLang('dia_chi')}</TextApp>
            </ViewApp>
            <ViewApp marV10>
              <InputSelect 
                placeholder={AppLang('tinh/TP')}
                data={conscious()}
                icon={{ name: 'caret-down' }}
                ref={ref => _input.current['conscious'] = ref}
              />
            </ViewApp>
            <ViewApp marV10>
              <InputSelect 
                placeholder={AppLang('quan/huyen')}
                data={district()}
                icon={{ name: 'caret-down' }}
              />
            </ViewApp>
        </ViewApp>
    </LayoutApp>
  )
}

export default Screen_add_address