import { View, Text, TextInput, FlatList, Image } from 'react-native'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import LayoutApp from '../../components/LayoutApp'
import HeaderApp from '../../components/HeaderApp'
import { AppLang } from '../../assets/languages'
import { goBack, navigate } from '../../root/RootNavigation'
import ViewApp from '../../components/ViewApp'
import IconApp from '../../components/IconApp'
import { COLORS } from '../../colors/colors'
import TouchApp from '../../components/TouchApp'
import { useListDrinks } from '../../service/useLocalMater'
import TextApp from '../../components/TextApp'
import { heightScreen } from '../../data/dataLocal'
import { shadowP } from '../../colors/colors'
import { imgApp } from '../../assets/img'
import { formatMoney, moneyDiscount } from '../../utils/format'
import LoadingApp from '../../components/LoadingApp'

const Screen_search_item = () => {
    const [search, setSearch] = useState<any>(null)
    const [isLoading, data, onRefresh] = useListDrinks()
    const [dataSearch, setDataSearch] = useState<any>()
    const [isReady,setIsReady] = useState<boolean>(false)
    useEffect(() =>{
        setDataSearch(data)
    },[data])
    
    // useEffect(() => {
    //     // setIsReady(true)
        
    //     if(search != null){
    //         console.log('data',dataSearch);
    //         console.log(search);
    //         setTimeout(() => {
    //             const searchLower = search?.toLowerCase()
    //             const filterData = dataSearch?.filter((prev: any) => {
    //                 const dataLower = prev?.name?.toLowerCase()
    //                 return dataLower.includes(searchLower);
    //             });
    //             setDataSearch(filterData)
    //             // setDataSearch(filteredData)
    //         }, 1000)
    //     }
    //     // setIsReady(false)
    // }, [search])
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

    useEffect(() =>{
        setIsReady(true)
        setTimeout(() =>{setIsReady(false)},1000)
    },[filteredData])

    // const dataSearch = () => {
    //     setTimeout(() => {
    //         const searchLower = search?.toLowerCase()
    //         const filteredData = data?.filter((prev: any) => {
    //             const dataLower = prev?.name?.toLowerCase()
    //             return dataLower.includes(searchLower);
    //         });
    //         console.log('Filtered data:', filteredData);
    //         return filteredData
    //     }, 2000)
    // }
    // console.log('search', dataSearch);
    return (
        <LayoutApp>
            <HeaderApp
                title={AppLang('tim_kiem_san_pham')}
                left={{
                    show: true,
                    onPress: () => goBack()
                }}
            />
            <ViewApp row centerH mar10 bg={COLORS.Secondary} padH10 borderR={10}>
                <ViewApp row flex1 alignCenter>
                    <IconApp name='search' />
                    <TextInput placeholder={AppLang('tim_kiem_theo_ten_gia')}
                        value={search}
                        onChangeText={(text: any) => setSearch(text)}
                        style={{color:COLORS.text1,}}
                        placeholderTextColor={COLORS.text1}
                    />
                </ViewApp>
                <TouchApp
                    onPress={() => setSearch('')}
                >
                    {
                        search &&<IconApp name='x-circle' type='Feather' />
                    }
                    
                </TouchApp>
            </ViewApp>
            <ViewApp flex1>
                {   
                    isReady ? <LoadingApp noBg />
                    :
                    filteredData.length > 0 ?
                        <FlatList
                            data={filteredData}
                            renderItem={({ item }) => (
                                <ItemDrinkHoz {...item} key={item.id} />
                            )}
                            contentContainerStyle={{ paddingBottom: 150 }}
                        />
                    : <ViewApp flex1 mid>
                        <TextApp>{AppLang('khong_co_san_pham')}</TextApp>
                    </ViewApp>
                }
            </ViewApp>
        </LayoutApp>
    )
}


const ItemDrinkHoz = (item: any) => {
    return (
        <TouchApp marH10 marV5 borderR={10} bgW overF='hidden' h={heightScreen * 0.2} row styleBox={{ ...shadowP }}
            onPress={() => navigate('Screen_item_detail', { item: item })}
        >
            <ViewApp flex1 >
                <Image source={{ uri: item?.img }} style={{ width: '100%', height: '100%', position: 'relative' }} resizeMode='cover' />
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

export default Screen_search_item