import { View, Text, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LayoutApp from '../../components/LayoutApp'
import HeaderApp from '../../components/HeaderApp'
import { AppLang } from '../../assets/languages'
import { goBack, navigate } from '../../root/RootNavigation'
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
import ModalApp from '../../components/ModelApp'
import { userRef } from '../../firebase/firebaseConfig'
import { imgApp } from '../../assets/img'
import { userApi } from '../../api/userApi'

const Screen_cart = () => {
    const [isLoading, data, onRefresh] = useCartUser();
    const [itemPrices, setItemPrices] = useState<number[]>([]); // Mảng lưu giá trị của từng mục
    const totalPriceCart = itemPrices.reduce((total, current) => total + current, 0)
    const refModal = useRef<any>()
    const modalDelete = useRef<any>()
    const onPressDelete = async (item: any) => {
        const listOrder = data?.order;
        const listNewOrder = listOrder?.filter((prev: any) => prev.idItem !== item.idItem)
        console.log(listNewOrder);

        await userApi.deleteDrinksToCart(data.id, {
            order: listNewOrder
        })
        onRefresh()
    }
    const handleDeleteAll = async () => {
        await userApi.deleteDrinksToCart(data.id, {
            order: []
        })
        onRefresh()
        modalDelete.current.close()
    }

    return (
        <LayoutApp>
            <HeaderApp
                title={AppLang('gio_hang_cua_ban')}
                left={{
                    show: true,
                    onPress: () => goBack()
                }}
                right={{
                    show: data?.order?.length > 0 ? true : false,
                    type: true,
                    title: AppLang('xoa'),
                    onPress: () => {
                        modalDelete.current.open()
                    }
                }}
            />
            {
                isLoading ? <LoadingApp noBg />
                    :
                    data?.order?.length > 0 ?
                        <ScrollView
                        >
                            <ViewApp bg={COLORS.text4} pad5></ViewApp>
                            {
                                data?.order?.map((item: any, index: number) => (
                                    <ItemOrder key={index} item={item} index={index} itemPrices={itemPrices} setItemPrices={setItemPrices} onPressDelete={() => onPressDelete(item)} />
                                ))

                            }
                            <ViewApp bg={COLORS.text4} pad5></ViewApp>
                        </ScrollView>
                        :
                        <ViewApp mid flex1>
                            <TextApp size18 colorP bold pV10>{AppLang('gio_hang_cua_ban_dang_trong')}</TextApp>
                            <Image source={imgApp.boxNothing} style={{ width: '60%', height: '40%' }} resizeMode='contain' />
                        </ViewApp>

            }
            <ViewApp w100 mid padH10 borderTW={1}>
                {/* {
                    itemPrices.length == data?.order?.length
                    ?  */}
                {
                    data?.order?.length > 0
                        ?
                        <ButtonApp with8 title={`${AppLang('dat_hang')} - ${formatMoney(totalPriceCart)} `}
                            onPress={() => refModal.current.open()}
                        />
                        : null
                }

                {/* : <ButtonApp with8>
                    <LoadingApp noBg />
                </ButtonApp>
                } */}

            </ViewApp>

            <ModalApp ref={refModal} mid>
                <ViewApp w={'90%'} h={'50%'} bgW mid borderR={20}>
                    <TextApp colorP size22 bold pV20>{AppLang('chon_loai_dat_hang')}</TextApp>
                    <ViewApp flex1 pad20 row>
                        <TouchApp flex1 borderW={5} marH10 mid h={'80%'} borderR={20} borderC={COLORS.primary}
                            onPress={() => {
                                refModal.current.close(),
                                    navigate('Screen_request_order', { totalPrice: totalPriceCart })
                            }}
                        >
                            <Image style={{ width: '80%' }} source={imgApp.iconDelivery} resizeMode='contain' />
                            <TextApp colorP bold>{AppLang('dat_online')}</TextApp>
                        </TouchApp>
                        <TouchApp flex1 borderW={5} marH10 mid h={'80%'} borderR={20} borderC={COLORS.primary}>
                            <Image style={{ width: '80%' }} source={imgApp.iconTable} resizeMode='contain' />
                            <TextApp colorP bold>{AppLang('dung_tai_quan')}</TextApp>
                        </TouchApp>
                    </ViewApp>
                </ViewApp>
            </ModalApp>
            <ModalApp ref={modalDelete} mid>
                <ViewApp w={'90%'} h={'40%'} bgW mid borderR={20} padH10>
                    <TextApp colorP size18 bold pV20>{AppLang('ban_co_chac_muon_xoa_tat_ca_k')}</TextApp>
                    <ViewApp row w={'80%'} mid>
                        <ButtonApp title={AppLang('huy')} mH10 pH10
                            onPress={() => { modalDelete.current.close() }}
                        />
                        <ButtonApp title={AppLang('xac_nhan')} mH10 pH10
                            onPress={() => { handleDeleteAll() }}
                        />
                    </ViewApp>
                </ViewApp>
            </ModalApp>
        </LayoutApp>
    )
}


const ItemOrder = ({ item, index, itemPrices, setItemPrices, onPressDelete }: any) => {

    const [count, setCount] = useState<number>(item?.count)
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

        <ViewApp row height={heightScreen * 0.18} pad10 borderTW={index === 0 ? 0 : 1}>
            <ViewApp flex1 borderR={10} overF='hidden'>
                <Image source={{ uri: item.imgItem }} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
            </ViewApp>
            <ViewApp flex2 justifySB marH10>
                <ViewApp row centerH>
                    <TextApp size18 colorP bold>{item.nameItem}</TextApp>
                    <TouchApp
                        onPress={onPressDelete}
                    >
                        <IconApp color={COLORS.primary} name='delete' type='MaterialIcons' />
                    </TouchApp>
                </ViewApp>
                <ViewApp row centerH>
                    <ChangeCountItem count={count} setCount={setCount} />
                    <TextApp colorP size18 bold>{formatMoney(moneyDiscount(data?.price, data?.discount) * count)}</TextApp>
                </ViewApp>
            </ViewApp>
        </ViewApp>
    )
}

export default Screen_cart