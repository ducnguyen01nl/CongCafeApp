import { View, Text, TextInput, FlatList, Image, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LayoutApp from '../components/LayoutApp'
import ViewApp from '../components/ViewApp'
import TouchApp from '../components/TouchApp'
import { goBack, navigate } from '../root/RootNavigation'
import IconApp from '../components/IconApp'
import TextApp from '../components/TextApp'
import { AppLang } from '../assets/languages'
import { COLORS } from '../colors/colors'
import InputSelect from '../components/input/InputSelect'
import { DATA_FILTER_DATE, DATA_FILTER_TYPE, formatDateTimestamp, formatDateTimestampAll, widthScreen } from '../data/dataLocal'
import { useGetListNews } from '../service/useLocalMater'
import Swiper from 'react-native-swiper'
import { shadowP } from '../colors/colors'
import ListNews from './news/components/ListNews'
import { useFocusEffect } from '@react-navigation/native'
import LoadingApp from '../components/LoadingApp'
import { coverDateTimeStamp } from '../utils/format'
import { isToday, isWithinInterval, subMonths, subDays } from 'date-fns';
import InputCustom from '../components/input/InputCustom'
import { useSelector } from 'react-redux'

const NewsAdmin = () => {
  // const [search, setSearch] = useState<any>(null)
  const {user} = useSelector((state:any) => state.user)
  const _input = useRef<any>({})
  const [isLoading, data, onRefresh] = useGetListNews()

  useFocusEffect(
    React.useCallback(() => {
      onRefresh()
    }, [])
  )

  useEffect(() => {
    _input.current['date'].setValue(DATA_FILTER_TYPE[0])
    _input.current['type'].setValue(DATA_FILTER_DATE[0])
  }, [])

  const handleSearch = () => {
    dataSearch()
    onRefresh()
  }

  // const disabledLoadingFirst = () => {
  //   if (search == null && _input.current['date']?.getValue() == null && _input.current['type']?.getValue() == null) {
  //     return true
  //   }
  //   return false
  // }

  const dataSearch = () => {
    const date = _input.current['date']?.getValue()
    const type = _input.current['type']?.getValue()
    const search = _input.current['search']?.getValue()

    if (search && search != '' || date || type) {
      const filteredData = data.filter((item: any) => {
        const dateItem: any = coverDateTimeStamp(item.updateAt)
        const condition1 = item.title.toLowerCase().includes(search ? search?.toLowerCase() : '')
        const condition2 = () => {
          switch (date?.value) {
            case 0:
              return item
            case 1:
              return isToday(dateItem)
            case 2:
              return isWithinInterval(dateItem, { start: subDays(new Date(), 7), end: new Date() })
            case 3:
              return isWithinInterval(dateItem, { start: subMonths(new Date(), 1), end: new Date() })
          }
        }
        const condition3 = () => {
          if(type?.value == 0){
            return item
          }
          else{
            return item?.type == type.value
          }
          // switch (type?.value) {
          //   case 0:
          //     return item
          //   case 1:
          //     return item?.type == 1
          //   case 2:
          //     return item?.type == 2
          //   case 3:
          //     return item?.type == 3
          // }
        }

        return condition1 && condition2() && condition3()
      })
      console.log(true);
      return filteredData
    }
    else {
      console.log(false);
      return data
    }
  }

  return (
    <LayoutApp>
      <ViewApp row padV10 padL={user.role == 0 ? 10 : 0}>
        {
          user.role == 0 &&
          <TouchApp row pad10 alignCenter
            borderW={1}
            borderR={10}
            borderC={COLORS.text1}
            onPress={() => navigate('Screen_add_news')}
          >
            <IconApp size={30} name='pluscircleo' color={COLORS.primary} type='AntDesign' />
            <TextApp colorP>{AppLang('them')}</TextApp>
        </TouchApp>
        }

        <ViewApp flex1 row marH10 borderR={10} padH10 alignCenter bg={COLORS.white} borderW={1} borderC={COLORS.text1}>
          <IconApp name='search' />
          <InputCustom
            isUpdate
            propsInput={{
              placeholder: AppLang('tim_kiem_theo_tieu_de'),
            }}
            styleInput={{
              width: '100%',
              borderWidth: 0,
              marginVertical: 5
            }}
            styleBox={{
              flex:1,
              marginBottom:0,
              marginLeft:10
            }}
            ref={ref => _input.current['search'] = ref}
          />
        </ViewApp>
      </ViewApp>
      <ViewApp row padH10>
        <InputSelect
          required
          placeholder={AppLang(`ngay`)}
          data={DATA_FILTER_DATE}
          icon={{ name: 'caret-down' }}
          ref={ref => (_input.current['date'] = ref)}
          styleBox={{ flex: 1 }}
          style={{ paddingHorizontal: 10 }}
        />
        <InputSelect
          required
          placeholder={AppLang(`loai`)}
          data={DATA_FILTER_TYPE}
          icon={{ name: 'caret-down' }}
          ref={ref => (_input.current['type'] = ref)}
          styleBox={{ flex: 1, marginHorizontal: 10 }}
        />
        <TouchApp borderW={1} square={50} borderR={10} mid borderC={COLORS.text1}
          onPress={handleSearch}
        >
          <IconApp size={30} name='filter-list-alt' type='MaterialIcons' />
        </TouchApp>
      </ViewApp>
      <ViewApp pad5 backgroundColor={COLORS.Secondary} marT10 />
      {
        isLoading ? <LoadingApp noBg />
          : <ListNews data={dataSearch()} onRefresh={onRefresh} />
      }

      {/* <FlatList
        data={data}
        style={{ backgroundColor: COLORS.Secondary }}
        renderItem={({ item }) => (
          <ItemNews {...item} />
        )}
      /> */}
    </LayoutApp>
  )
}


export default NewsAdmin