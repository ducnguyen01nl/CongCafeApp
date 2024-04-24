import { View, Text, TextInput, FlatList, Image } from 'react-native'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import LayoutApp from '../components/LayoutApp'
import ViewApp from '../components/ViewApp'
import IconApp from '../components/IconApp'
import TouchApp from '../components/TouchApp'
import TextApp from '../components/TextApp'
import { AppLang } from '../assets/languages'
import { COLORS } from '../colors/colors'
import { useListDrinks } from '../service/useLocalMater'
import { imgApp } from '../assets/img'
import { heightScreen } from '../data/dataLocal'
import { shadowP } from '../colors/colors'
import { navigate } from '../root/RootNavigation'
import { formatMoney } from '../utils/format'
import { drinksApi } from '../api/drinksApi'
import { userApi } from '../api/userApi'
import ModalApp from '../components/ModelApp'
import ButtonApp from '../components/ButtonApp'

const DrinksAdmin = () => {
  const [isLoading, data, onRefresh] = useListDrinks()
  const [search, setSearch] = useState<any>(null)
  const [itemActive, setItemActive] = useState<any>()
  const refModal = useRef<any>()


  useEffect(() => {
    onRefresh()
  }, [data])

  const filteredData = useMemo(() => {
    if(search){
        const searchLower = search.toLowerCase();
        return data.filter((item:any) => {
            const dataLower = item.name.toLowerCase();
            return dataLower.includes(searchLower);
        });
    }
    else {
        return data
    }
}, [search, data]);

  const handleDelete = async () => {
    await drinksApi.deleteItemDrink(itemActive?.id)
    refModal.current.close()
  }
  return (
    <LayoutApp>
      <ViewApp row pad10>
        <TouchApp row pad10 alignCenter
          borderW={1}
          borderR={10}
          onPress={() => navigate('Screen_add_drinks')}
        >
          <IconApp size={30} name='pluscircleo' color={COLORS.primary} type='AntDesign' />
          <TextApp colorP>{AppLang('them_mat_hang')}</TextApp>
        </TouchApp>
        <ViewApp flex1/>
      </ViewApp>
      <ViewApp row marH10 borderR={10} padH10 alignCenter bg={COLORS.Secondary}>
        <IconApp name='search' />
        <TextInput placeholder={AppLang('tim_kiem_theo_ten_gia')}
          value={search}
          onChangeText={(text: any) => setSearch(text)}
          style={{color:COLORS.text1}}
          placeholderTextColor={COLORS.text1}
        />
      </ViewApp>
      <ViewApp flex1 marT10>
        {
          // isReady ? <LoadingApp noBg />
          //   :
          data.length > 0 ?
            <FlatList
              data={filteredData}
              renderItem={({ item }) => (
                <ItemDrinkHoz item={item} key={item.id} onDelete={() => {
                  setItemActive(item)
                  refModal.current.open()
                }} />
              )}
              contentContainerStyle={{ paddingBottom: 150 }}
            />
            : <ViewApp flex1 mid>
              <TextApp>{AppLang('khong_co_san_pham')}</TextApp>
            </ViewApp>
        }
      </ViewApp>

      <ModalApp ref={refModal} mid>
        <ViewApp w={'90%'} h={'40%'} bgW mid borderR={20} padH10>
          <TextApp colorP size18 bold pV20>{AppLang('ban_co_chac_muon_xoa_mat_hang_nay_k')}</TextApp>
          <ViewApp row w={'80%'} mid>
            <ButtonApp title={AppLang('huy')} mH10 pH10
              onPress={() => { refModal.current.close() }}
            />
            <ButtonApp title={AppLang('xac_nhan')} mH10 pH10
              onPress={() => { handleDelete() }}
            />
          </ViewApp>
        </ViewApp>
      </ModalApp>
    </LayoutApp>
  )
}


const ItemDrinkHoz = ({ item, onDelete }: any) => {


  const handleSetActive = async () => {
    if (item?.status) {
      await drinksApi.updateDrinks(item?.id, {
        status: false
      })
    }
    else {
      await drinksApi.updateDrinks(item?.id, {
        status: true
      })
    }
  }
  return (
    <TouchApp marH10 marV5 borderR={10} bgW overF='hidden' h={heightScreen * 0.16} row styleBox={{ ...shadowP }}
      onPress={() => { }}
    >
      <ViewApp flex3 pad10 alignCenter row>
        <ViewApp square={80} borderR={10} overF='hidden' >
          <Image source={{ uri: item?.img }} style={{ width: '100%', height: '100%', position: 'relative' }} resizeMode='cover' />
        </ViewApp>
        <ViewApp>
          <TextApp color1 bold>{`${AppLang('ten')}: ${item?.name}`}</TextApp>
          <TextApp color1 bold>{`${AppLang('gia')}: ${item?.price}`}</TextApp>
          <TextApp color1 bold>{`${AppLang('giam_gia')}: ${item?.discount}%`}</TextApp>

        </ViewApp>

      </ViewApp>
      <ViewApp flex1 mid justifyC='space-around'>
        <TouchApp
          onPress={handleSetActive}
          pad10
        >
          <IconApp size={30} name={item?.status ? 'toggle-on' : 'toggle-off'} color={item?.status ? COLORS.blue : 'gray'} type='FontAwesome' />
        </TouchApp>
        <ViewApp row>
          <TouchApp
            pad10
            onPress={() => navigate('Screen_add_drinks', { dataItem: item })}
          >
            <IconApp size={26} name={'pencil'} type='Entypo' />
          </TouchApp>
          <TouchApp
            pad10
            onPress={onDelete}
          >
            <IconApp size={26} name={'delete'} type='MaterialCommunityIcons' />
          </TouchApp>
        </ViewApp>
      </ViewApp>
    </TouchApp>
  )
}


export default DrinksAdmin