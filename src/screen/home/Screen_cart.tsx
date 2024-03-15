import { View, Text, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LayoutApp from '../../components/LayoutApp'
import HeaderApp from '../../components/HeaderApp'
import { AppLang } from '../../assets/languages'
import { goBack } from '../../root/RootNavigation'
import ViewApp from '../../components/ViewApp'
import { COLORS } from '../../colors/colors'
import { useCartUser, useGetItemDrink } from '../../service/useLocalMater'
import TextApp from '../../components/TextApp'
import TouchApp from '../../components/TouchApp'
import IconApp from '../../components/IconApp'
import ChangeCountItem from '../../components/ChangeCountItem'
import { heightScreen } from '../../data/dataLocal'
import { formatMoney, moneyDiscount } from '../../utils/format'

const Screen_cart = () => {
    const [isLoading, data, onRefresh] = useCartUser();

    return (
        <LayoutApp>
            <HeaderApp
                title={AppLang('gio_hang_cua_ban')}
                left={{
                    show: true,
                    onPress: () => goBack()
                }}
            />
            <ViewApp>
                <ViewApp bg={COLORS.text4} pad5></ViewApp>
                {
                    data && data?.order?.map((item: any, index: number) => (
                        <ItemOrder {...item} key={index} index={index} />
                    ))
                }
                <ViewApp bg={COLORS.text4} pad5></ViewApp>
            </ViewApp>
        </LayoutApp>
    )
}


const ItemOrder = (item: any,index:number) => {

    const [count,setCount] = useState<number>(item?.count)
    const [isLoading, data, onRefresh] = useGetItemDrink(item?.idItem)  
    console.log('====================================');
    console.log(data);
    console.log('====================================');  
    
    return (

        <ViewApp row height={heightScreen*0.18} pad10 borderTW={index === 0 ? 0 :1}>
            <ViewApp flex1 borderR={10} overF='hidden'>
                <Image source={{ uri: item.imgItem }} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
            </ViewApp>
            <ViewApp flex2 justifySB marH10>
                <ViewApp row centerH>
                    <TextApp size18 colorP bold>{item.nameItem}</TextApp>
                    <TouchApp>
                        <IconApp color={COLORS.primary} name='delete' type='MaterialIcons' />
                    </TouchApp>
                </ViewApp>
                <ViewApp row centerH>
                    <ChangeCountItem count={count} setCount={setCount} />
                    <TextApp colorP size18 bold>{formatMoney(moneyDiscount(data?.price, data?.discount)*count)}</TextApp>
                </ViewApp>
            </ViewApp>
        </ViewApp>
    )
}

export default Screen_cart