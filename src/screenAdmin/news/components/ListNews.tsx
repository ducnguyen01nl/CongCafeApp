import { View, Text, TextInput, FlatList, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React, { useRef, useState } from 'react'

import Swiper from 'react-native-swiper'
import { COLORS } from '../../../colors/colors'
import ViewApp from '../../../components/ViewApp'
import { AppLang } from '../../../assets/languages'
import TextApp from '../../../components/TextApp'
import { DATA_FILTER_DATE, DATA_FILTER_TYPE_2, formatDateTimestampAll, widthScreen } from '../../../data/dataLocal'
import TouchApp from '../../../components/TouchApp'
import IconApp from '../../../components/IconApp'
import ModalApp from '../../../components/ModelApp'
import ButtonApp from '../../../components/ButtonApp'
import { newsApi } from '../../../api/newsApi'
import { navigate } from '../../../root/RootNavigation'
import { coverDateTimeStamp } from '../../../utils/format'
import { useSelector } from 'react-redux'

const ListNews = ({ data, onRefresh }: any) => {
  const refModal = useRef<any>()
  const [itemActive, setItemActive] = useState<any>()

  //sắp xếp theo ngày
  const dataSort = [...data].sort((a, b): any => {
    const dateA: any = coverDateTimeStamp(a?.updateAt)
    const dateB: any = coverDateTimeStamp(b?.updateAt)
    return dateB - dateA
    // if (dateA && dateB) {
    //   return dateB - dateA;
    // } else {
    //   return null // hoặc giá trị mặc định tùy thuộc vào trường hợp của bạn
    // }
  })

  const handleDeleteNews = async () => {
    await newsApi.deleteItemNews(itemActive?.id)
    onRefresh()
    refModal.current.close()
  }

  const handleUpdateNews = () => {
    navigate('Screen_add_news', { data: itemActive })
    refModal.current.close()
  }
  return (
    <>
      <FlatList
        data={dataSort}
        onRefresh={onRefresh}
        refreshing={false}
        style={{ backgroundColor: COLORS.Secondary }}
        contentContainerStyle={{ paddingBottom: 150 }}
        renderItem={({ item }) => (
          <ItemNews key={item?.id} item={item}
            onOpenModal={() => {
              setItemActive(item)
              refModal.current.open()
            }
            }
          />
        )}
      />
      <ModalApp
        ref={refModal}
        mid
      >
        <ViewApp bgW mid mar20 borderR={10} w={'80%'} padV20>
          <TextApp size18>{AppLang('chon_tac_vu')}</TextApp>
          <ViewApp row>
            <ButtonApp styleButton={[styles.styleButton, { borderColor: 'red' }]}
              styleText={styles.styleText} title={AppLang('xoa')}
              onPress={() => { handleDeleteNews() }}
            />
            <ButtonApp styleButton={styles.styleButton}
              styleText={styles.styleText} title={AppLang('sua')}
              onPress={() => { handleUpdateNews() }}
            />

          </ViewApp>
        </ViewApp>

      </ModalApp>
    </>
  )
}

const styles = StyleSheet.create({
  styleButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    paddingHorizontal: 10,
    margin: 10
  },
  styleText: {
    color: COLORS.text2
  }
})

const ItemNews = ({ item, onOpenModal }: any) => {
  const {user} = useSelector((state:any) => state.user)
  const [expanded, setExpanded] = useState<boolean>(false)

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <ViewApp key={item?.id} pad10 marV5 borderW={1} borderR={10} bgW>
      <ViewApp row centerH borderBW={1} padV5>
        <TextApp colorP bold>{DATA_FILTER_TYPE_2[item?.type - 1]?.name}</TextApp>
        <ViewApp row>
          <TextApp color1>{formatDateTimestampAll(item?.updateAt)}</TextApp>
          {
            user.role == 0 &&
            <TouchApp onPress={onOpenModal}>
              <IconApp size={20} name='dots-three-vertical' type='Entypo' />
            </TouchApp>
          }
        </ViewApp>
      </ViewApp>
      <ViewApp marV10>
        <TextApp colorP size22>{item?.title}</TextApp>
        <TextApp numberOfLines={expanded ? undefined : 5} color1>{item?.content}
        </TextApp>
        {
          item?.content.length > 250 && <TouchApp onPress={toggleExpand}><TextApp color2>{expanded ? AppLang('an_bot') : AppLang('xem_them')}</TextApp></TouchApp>
        }

      </ViewApp>
      {
        item?.images.length > 0 &&
        <Swiper
          index={0}
          loop={false}
          // showsPagination={false}
          style={{ height: widthScreen * 0.5 }}
        >
          {
            item?.images.map((item: any, index: number) => (
              <TouchableWithoutFeedback key={index}>
                <ViewApp w={'100%'} height={widthScreen * 0.5} borderR={20} padH5>
                  <Image source={{ uri: item }} key={index} style={{ width: '100%', height: '100%', borderRadius: 20 }} resizeMode='cover' />
                </ViewApp>
              </TouchableWithoutFeedback>
            ))
          }
        </Swiper>
      }
    </ViewApp>

  )
}

export default ListNews