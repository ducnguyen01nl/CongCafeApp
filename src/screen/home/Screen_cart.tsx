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
import { ScrollView } from 'react-native'
import ButtonApp from '../../components/ButtonApp'
import { array, number } from 'yup'
import LoadingApp from '../../components/LoadingApp'

const Screen_cart = () => {
    const [isLoading, data, onRefresh] = useCartUser();

    const [totalPrice,setTotalPrice] = useState<number>(0);
    const [itemPrices, setItemPrices] = useState<number[]>([]); // Mảng lưu giá trị của từng mục
    const totalPriceCart = itemPrices.reduce((total,current) =>total + current,0)
    // const [isReady, setIsReady] = useState<boolean>(false); // State để kiểm soát việc hiển thị trang
    // if(itemPrices.length == data?.order?.length){
    //     setIsReady(true)
    // }
    
    const handleOrder = () =>{

    }

    return (
        
        <LayoutApp>
            <HeaderApp
                title={AppLang('gio_hang_cua_ban')}
                left={{
                    show: true,
                    onPress: () => goBack()
                }}
            />
            <ScrollView
            >
                <ViewApp bg={COLORS.text4} pad5></ViewApp>
                {
                    data && data?.order?.map((item: any, index: number) => (
                        <ItemOrder key={index} item={item} index={index} itemPrices={itemPrices} setItemPrices={setItemPrices} />
                    ))
                }
                <ViewApp bg={COLORS.text4} pad5></ViewApp>
            </ScrollView>
            <ViewApp w100 mid padH10 borderTW={1}>
                {
                    itemPrices.length == data?.order?.length
                    ? <ButtonApp with8 title={`${AppLang('dat_hang')} - ${formatMoney(totalPriceCart)} `} 
                    onPress={handleOrder}
                />
                : <ButtonApp with8>
                    <LoadingApp noBg />
                </ButtonApp>
                }
                
            </ViewApp>
        </LayoutApp>
    )
}


const ItemOrder = ({item,index,itemPrices,setItemPrices}:any) => {

    const [count,setCount] = useState<number>(item?.count)
    const [isLoading, data, onRefresh] = useGetItemDrink(item?.idItem)

    useEffect(() => {
        if (data && data.price !== undefined) {
            // Tính toán giá trị và cập nhật mảng giá trị của từng mục
            const newItemPrice = moneyDiscount(data.price, data.discount) * count;
            setItemPrices((prevItemPrices: number[]) => {
                const updatedItemPrices = [...prevItemPrices];
                updatedItemPrices[index] = newItemPrice;
                return updatedItemPrices;
            });
        }
    }, [count, data]);

    
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