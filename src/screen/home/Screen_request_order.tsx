import { View, Text, ScrollView, Image, TextInput } from 'react-native'
import React, { useRef, useState } from 'react'
import LayoutApp from '../../components/LayoutApp'
import HeaderApp from '../../components/HeaderApp'
import { AppLang } from '../../assets/languages'
import { goBack, navigate } from '../../root/RootNavigation'
import ViewApp from '../../components/ViewApp'
import TouchApp from '../../components/TouchApp'
import IconApp from '../../components/IconApp'
import { COLORS } from '../../colors/colors'
import TextApp from '../../components/TextApp'
import { userApi } from '../../api/userApi'
import { useAddressActive, useAddressActive2, useCartUser, useGetItemDrink } from '../../service/useLocalMater'
import { heightScreen } from '../../data/dataLocal'
import { formatMoney, moneyDiscount } from '../../utils/format'
import InputCustom from '../../components/input/InputCustom'
import ButtonApp from '../../components/ButtonApp'
import { useFocusEffect } from '@react-navigation/native'
import LoadingApp from '../../components/LoadingApp'
import { orderApi } from '../../api/orderApi'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useSelector } from 'react-redux'

const Screen_request_order = ({ route }: any) => {
    const { totalPrice } = route?.params
    const [isLoading, data, onRefresh] = useCartUser();
    const [isLoadingActive, addressActive, onRefreshActive] = useAddressActive2()
    const refMessage = useRef<any>()
    const [message, setMessage] = useState<string>()
    const {table} = useSelector((state:any) => state.table)
    console.log(table?.numberTable);
    
    useFocusEffect(
        React.useCallback(() => {
            onRefreshActive()
        }, [goBack])
    )

    const handleRequestOrder = async () => {
            await orderApi.addOrder({
                idUser: data?.userId,
                idAddress: table ?  `${table?.numberTable}-${table?.floor}` : addressActive?.id,
                totalPrice: totalPrice,
                createAt: new Date(),
                updateAt: new Date(),
                status: 0,
                type: table ? 1 : 0,
                message: message ? message : '',
                orderList: data?.order,
            })
        navigate('BottomTab')
    }

    return (
        <LayoutApp>
            <HeaderApp
                title={AppLang('don_dat_hang')}
                left={{
                    show: true,
                    onPress: () => goBack()
                }}
            />
            <ViewApp bg={COLORS.text4} pad5 />
            {
                isLoading ? <LoadingApp noBg />
                    :
                    <>
                        <ScrollView style={{ flex: 1 }}>
                            <TouchApp bg={COLORS.Secondary} row centerH pad10
                                onPress={() => navigate('Screen_address', { select: true })}
                            >
                                <ViewApp flex1 row padH10>
                                    <IconApp size={24} name='location' color={COLORS.red} />
                                    <ViewApp>
                                        <TextApp color1>{AppLang('dia_chi_nhan_hang')}</TextApp>
                                        {
                                            table
                                                ? <ViewApp>
                                                    <TextApp color1>{AppLang('cua_hang_cong_cafe')}</TextApp>
                                                    <TextApp color1>{`${AppLang('ban_so')} ${table.numberTable} - ${AppLang('tang')} ${table.floor}`}</TextApp>
                                                </ViewApp>
                                                :
                                                <ViewApp row alignCenter>
                                                    <TextApp color1>{addressActive?.name}</TextApp>
                                                    <IconApp size={12} name='minus' type='Entypo' />
                                                    <TextApp color1>{addressActive?.phone}</TextApp>
                                                </ViewApp>
                                        }
                                        {
                                            !table && <TextApp color1>{addressActive?.address}</TextApp>
                                        }
                                        
                                    </ViewApp>
                                </ViewApp>
                                {
                                    !table && <IconApp name='chevron-right' type='Entypo' />
                                }
                                
                            </TouchApp>
                            <ViewApp bg={COLORS.text4} pad5 />
                            <TextApp colorP size18 pad10>{AppLang('danh_sach_do_uong')}</TextApp>
                            {
                                data && data?.order?.map((item: any, index: number) => (
                                    <ItemOrder key={index} item={item} index={index} />
                                ))
                            }
                            <ViewApp row centerH padH10 height={50} borderTW={1} borderBW={1}>
                                <TextApp color1>{`${AppLang('tin_nhan')}: `}</TextApp>
                                <TextInput
                                    placeholder={AppLang('luu_y_cho_cua_hang')}
                                    placeholderTextColor={COLORS.text2}
                                    style={{ textAlign: "right", flex: 1 }}
                                    onChangeText={text => setMessage(text)}
                                />
                            </ViewApp>
                            <ViewApp bg={COLORS.text4} pad5 />
                        </ScrollView>
                        <ViewApp row borderTW={1} padH10>
                            <ViewApp flex1 mid>
                                <TextApp colorP bold>{AppLang('tong_thanh_toan')}</TextApp>
                                <TextApp color='#FF7428' bold size16>{formatMoney(totalPrice)}</TextApp>
                            </ViewApp>
                            <ButtonApp styleButton={{ flex: 1 }} title={AppLang('dat_hang')}
                                onPress={handleRequestOrder}
                            />
                        </ViewApp>
                    </>
            }
        </LayoutApp>
    )
}


const ItemOrder = ({ item, index }: any) => {

    const [isLoading, data, onRefresh] = useGetItemDrink(item?.idItem)

    return (

        <ViewApp row height={heightScreen * 0.15} padH20 padV10 borderTW={index === 0 ? 0 : 1}>
            <ViewApp flex1 borderR={10} overF='hidden'>
                <Image source={{ uri: item.imgItem }} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
            </ViewApp>
            <ViewApp flex3 justifySB marH10>
                <ViewApp row centerH>
                    <TextApp size18 colorP bold>{item.nameItem}</TextApp>
                </ViewApp>
                <ViewApp row centerH>
                    <ViewApp>
                        <TextApp color='#FF7428' style={{ textDecorationLine: 'line-through' }} size16 bold>{formatMoney(data?.price)}</TextApp>
                        <TextApp color2 size16 bold>{formatMoney(moneyDiscount(data?.price, data?.discount))}</TextApp>
                    </ViewApp>
                    <TextApp color2>{`x${item?.count}`}</TextApp>
                </ViewApp>
            </ViewApp>
        </ViewApp>
    )
}

export default Screen_request_order