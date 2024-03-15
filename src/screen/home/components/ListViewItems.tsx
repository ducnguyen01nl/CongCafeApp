import { View, Text, ScrollView, Image } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { DATA_TYPE_ITEMS, heightScreen, widthScreen } from '../../../data/dataLocal'
import { COLORS } from '../../../colors/colors'
import TouchApp from '../../../components/TouchApp'
import TextApp from '../../../components/TextApp'
import ViewApp from '../../../components/ViewApp'
import { imgApp } from '../../../assets/img'
import { FlatList } from 'react-native-gesture-handler'
import { shadowP } from '../../../colors/colors'
import { formatMoney, moneyDiscount } from '../../../utils/format'
import { useListDrinks } from '../../../service/useLocalMater'
import LoadingApp from '../../../components/LoadingApp'
import { navigate } from '../../../root/RootNavigation'

const ListViewItems = () => {
    const [active, setActive] = useState<any>(0);
    const refList = useRef<any>();
    const [isLoading, data, onRefresh] = useListDrinks();

    const listDrinkByType = useCallback(() =>{
        if(data){
            return data.filter((state:any) => state.type == active)
        }
    },[data,active])

    const handleChangeTypeItem = (value:any,index:number) => {
        setActive(value)
        onRefresh()
        refList.current.scrollTo({x:index*70,animated:true})
    }

    return (
        <ViewApp>
            <ScrollView
                ref={refList}
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ alignItems: 'center', height: 70 }}
            >
                {DATA_TYPE_ITEMS.map((item: any,index:number) => (
                    <TouchApp key={item?.value} bg={active == item?.value ? COLORS.primary : COLORS.text2} borderR={15} pad10 marH5
                        onPress={() => {handleChangeTypeItem(item.value,index)}}
                    >
                        <TextApp colorW bold={active == item.value ? true : false}>{item.name}</TextApp>
                    </TouchApp>
                ))}

            </ScrollView>

            {
                isLoading ? <ViewApp mid marT={50}><LoadingApp noBg /></ViewApp> 
                :
            <FlatList
                data={listDrinkByType()}
                renderItem={({ item }) => (
                    <ItemDrinkHoz {...item} key={item.id} />
                )}
                contentContainerStyle={{ paddingBottom: 150 }}
                onRefresh={onRefresh}
            />
            }


        </ViewApp>
    )
}

const ItemDrinkHoz = (item: any) => {
    return (
        <TouchApp marH10 marV5 borderR={10} bgW overF='hidden' h={heightScreen * 0.2} row styleBox={{ ...shadowP }}
            onPress={() => navigate('Screen_item_detail',{item:item})}
        >
            <ViewApp flex1 >
                <Image source={{uri:item?.img}} style={{ width: '100%', height: '100%', position: 'relative' }} resizeMode='cover' />
                {item?.discount != 0 && <Image source={imgApp.iconDiscount} style={{ width: 30, height: 30, position: 'absolute', right: 5, top: 5 }} />}
            </ViewApp>
            <ViewApp flex2 pad10 padV10 justifyContent='space-between'>
                <ViewApp>
                    <ViewApp row alignI='center'>
                        {item?.discount != 0 && <TextApp color={COLORS.red} bold style={{ backgroundColor: COLORS.Secondary, paddingHorizontal: 5, borderRadius: 5 }}>{`-${item?.discount}%`}</TextApp>}
                        <TextApp colorP size18 bold>{item?.name}</TextApp>
                    </ViewApp>
                    <TextApp color2 size14 numberOfLines={2} ellipsizeMode='tail'>{item?.des}</TextApp>

                </ViewApp>
                <ViewApp row centerH>
                    <ViewApp row alignI='center'>
                        <Image source={imgApp.iconStar} style={{ width: 20, height: 20 }} />
                        <TextApp color2 size16>{item?.star}</TextApp>
                    </ViewApp>
                    <ViewApp>
                        <TextApp color={item?.discount != 0 ? COLORS.red : COLORS.primary} bold size16 style={{ textDecorationLine: item?.discount != 0 ? 'line-through' : 'none' }}>{formatMoney(item?.price)}</TextApp>
                        {item?.discount != 0 && <TextApp size16 colorP bold>{formatMoney(moneyDiscount(item?.price, item?.discount))}</TextApp>}
                    </ViewApp>
                </ViewApp>
            </ViewApp>
        </TouchApp>
    )
}

export default ListViewItems