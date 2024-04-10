import { View, Text, Image, ScrollView, Button } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import LayoutApp from '../../components/LayoutApp'
import HeaderApp from '../../components/HeaderApp'
import { AppLang } from '../../assets/languages'
import ViewApp from '../../components/ViewApp'
import TextApp from '../../components/TextApp'
import IconApp from '../../components/IconApp'
import { useAddressById, useGetItemDrink, useGetTableById, useGetTokenById } from '../../service/useLocalMater'
import { goBack, navigate } from '../../root/RootNavigation'
import { COLORS } from '../../colors/colors'
import { formatDateTimestamp, formatDateTimestampAll, heightScreen, titleStatus, titleTypeItem } from '../../data/dataLocal'
import { formatMoney, moneyDiscount } from '../../utils/format'
import LoadingApp from '../../components/LoadingApp'
import ButtonApp from '../../components/ButtonApp'
import { orderApi } from '../../api/orderApi'
import ModalApp from '../../components/ModelApp'
import ToastService from '../../service/ToastService'
import { useSelector } from 'react-redux'
import { pushNotificationApi } from '../../api/pushNotificationApi'
import App from '../../../App'


const Screen_order_detail = ({ route }: any) => {
    const { item } = route?.params;
    console.log('====item================================');
    console.log(item);
    console.log('====================================');
    const { user } = useSelector((state: any) => state.user)
    const addressTable = item?.idAddress?.split("-").map(Number)
    const tokenUser = useGetTokenById(item?.idUser)

    const [isLoadingTable, dataTable, onRefreshTable] = useGetTableById(item?.idTable)

    const [isLoading, data, onRefresh] = useAddressById(item?.idAddress)
    const refModal = useRef<any>()

    const handleCancelOrder = async () => {
        try {
            await orderApi.updateOrder(item?.id, { status: 4, updateAt: new Date() })
            refModal.current.close()
            ToastService.showToast(AppLang('huy_don_hang_thanh_cong'), 0)
            onRefresh()
            goBack()
        } catch (error) {
            console.log(error);

        }
    }
    const handleConfirm = async() => {
        switch(item?.status){
            case 0:
                await orderApi.updateOrder(item?.id,{status:1, updateAt: new Date()})
                pushNotificationApi.pushNotification(tokenUser?.tokenFCM,{
                    title:'Cộng Cà Phê',
                    body:`${AppLang('don_hang_ma')} ${item?.id} ${AppLang('dang_xu_ly2')}`
                })
                break;
            case 1:
                await orderApi.updateOrder(item?.id,{status:2, updateAt: new Date()})
                pushNotificationApi.pushNotification(tokenUser?.tokenFCM,{
                    title:'Cộng Cà Phê',
                    body:`${AppLang('don_hang_ma')} ${item?.id} ${AppLang('dang_giao_hang')}`
                })
                break;
            case 2:
                await orderApi.updateOrder(item?.id,{status:3, updateAt: new Date()})
                pushNotificationApi.pushNotification(tokenUser?.tokenFCM,{
                    title:'Cộng Cà Phê',
                    body:`${AppLang('don_hang_ma')} ${item?.id} ${AppLang('da_giao_thanh_cong')}`
                })
                break;
        }
        goBack()
    }

    const titleButton = (status:number) =>{
        switch(status){
            case 0:
                return 'xac_nhan'
            case 1:
                return 'xu_ly_xong'
            case 2:
                return 'giao_thanh_cong'
        }
    }

    return (

        isLoading ? <LoadingApp noBg />
            :
            <LayoutApp>
                <HeaderApp
                    title={AppLang('thong_tin_don_hang')}
                    left={{
                        show: true,
                        onPress: () => goBack()
                    }}
                />
                <ScrollView>
                    <ViewApp>
                        {
                            user?.role == 1 &&
                            <ViewApp row centerH padH10 padV20 bg={item?.status == 4 ? COLORS.orange : COLORS.blue}>
                                <ViewApp>
                                    <TextApp size16 colorW bold>{AppLang(titleTypeItem(item?.status))}</TextApp>
                                    {
                                        item?.status == 4 ? <TextApp colorW>{`${AppLang('vao')} ${formatDateTimestampAll(item?.updateAt)}`}</TextApp>
                                            : <TextApp colorW>{`${AppLang('cam_on_da_mua_sam_CCP')}`}</TextApp>
                                    }

                                </ViewApp>
                                {
                                    item?.status == 4 ? <IconApp color={COLORS.white} size={40} name='restore' type='MaterialIcons' />
                                        : <IconApp color={COLORS.white} size={40} name='thumbs-o-up' type='FontAwesome' />
                                }

                            </ViewApp>
                        }
                    </ViewApp>
                    <ViewApp pad10>
                        <ViewApp row>
                            <IconApp color={COLORS.blue} name='location' />
                            <TextApp color1 bold size16>{AppLang('dia_diem_nhan_hang')}</TextApp>
                        </ViewApp>
                        {
                            item?.type == 0
                                ?
                                <ViewApp padL={24}>
                                    <TextApp color1>{data?.name}</TextApp>
                                    <TextApp color1>{data?.phone}</TextApp>
                                    <TextApp color1>{data?.address}</TextApp>

                                </ViewApp>
                                :
                                <ViewApp padL={24}>
                                    <TextApp color1>{AppLang('cua_hang_cong_cafe')}</TextApp>
                                    <TextApp color1>{`${AppLang('ban_so')} ${addressTable[0]} - ${AppLang('tang')} ${addressTable[1]}`}</TextApp>

                                </ViewApp>

                        }
                    </ViewApp>
                    <ViewApp pad5 bg={COLORS.Secondary} />
                    <TextApp size16 pH10 pV5 bold color1>{AppLang('danh_sach_do_uong')}</TextApp>
                    <ViewApp>
                        {
                            item?.orderList.map((prev: any, index: number) => (
                                <ItemOrder item={prev} key={index} index={index} />
                            ))
                        }
                    </ViewApp>
                    <ViewApp pad5 bg={COLORS.Secondary} />
                    <ViewApp pad10>
                        <TextApp color1>{ `${AppLang('luu_y')}: ${item?.message ? item?. message : AppLang('khong_co')}`}</TextApp>
                    </ViewApp>
                    <ViewApp pad5 bg={COLORS.Secondary} />
                    <ViewApp pad10>
                        <ViewApp row centerH>
                            <TextApp color1 bold size16>{AppLang('thanh_tien')}</TextApp>
                            <TextApp color={COLORS.orange} bold size16>{formatMoney(item?.totalPrice)}</TextApp>
                        </ViewApp>
                        {
                            user?.role == 1 && <TextApp color1>{AppLang('vui_long_thanh_toan_khi_nhan_hang')}</TextApp>
                        }

                    </ViewApp>
                    <ViewApp pad5 bg={COLORS.Secondary} />
                    <ViewApp>
                        <ItemTime title={AppLang('ma_don')} date={item?.id} />
                        <ItemTime title={AppLang('thoi_gian_dat_hang')} date={formatDateTimestampAll(item?.createAt)} />
                        {
                            item?.status != 0 && <ItemTime title={`${AppLang('thoi_gian')} ${AppLang(titleStatus(item?.status))}`} date={formatDateTimestampAll(item?.updateAt)} />
                        }
                    </ViewApp>
                    <ViewApp pad5 bg={COLORS.Secondary} />
                </ScrollView>
                {
                    user?.role == 1
                        ?
                        <ViewApp row borderTW={1} padH10>
                            <ViewApp flex1 marH5>
                                {
                                    item?.status == 3 && <ButtonApp title={AppLang('danh_gia')} />
                                }
                            </ViewApp>
                            <ViewApp flex1 marH5>
                                {
                                    item?.status == 0 && <ButtonApp title={AppLang('huy')} onPress={() => refModal.current.open()} />
                                }
                                {
                                    (item?.status == 3 || item?.status == 4) && <ButtonApp title={AppLang('mua_lai')}  onPress={() =>navigate('Screen_request_order', { repurchase: item })}/>
                                }
                            </ViewApp>
                        </ViewApp>
                        :
                        <ViewApp row borderTW={1} padH10>
                            <ViewApp flex1 marH5>
                                {
                                    item?.status == 0 && <ButtonApp title={AppLang('huy')} onPress={() => refModal.current.open()} />

                                }
                            </ViewApp>
                            <ViewApp flex1 marH5>
                                <ButtonApp title={AppLang(titleButton(item?.status))} 
                                    onPress={handleConfirm}
                                />
                            </ViewApp>
                        </ViewApp>

                }
                <ModalApp ref={refModal} mid>
                    <ViewApp w={'90%'} h={'40%'} bgW mid borderR={20} padH10>
                        <TextApp colorP size18 bold pV20>{AppLang('ban_co_chac_muon_huy_don_nay_k')}</TextApp>
                        <ViewApp row w={'80%'} mid>
                            <ButtonApp title={AppLang('huy')} mH10 pH10
                                onPress={() => { refModal.current.close() }}
                            />
                            <ButtonApp title={AppLang('xac_nhan')} mH10 pH10
                                onPress={() => { handleCancelOrder() }}
                            />
                        </ViewApp>
                    </ViewApp>
                </ModalApp>
            </LayoutApp>

    )
}




const ItemOrder = ({ item, index }: any) => {

    // const [isLoading, data, onRefresh] = useGetItemDrink(item?.idItem)


    return (

        <ViewApp row height={heightScreen * 0.12} padH20 padV10 borderTW={index === 0 ? 0 : 1}>
            <ViewApp flex1 borderR={10} overF='hidden'>
                <Image source={{ uri: item.imgItem }} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
            </ViewApp>
            <ViewApp flex3 justifySB marH10 row>
                <ViewApp justifySB>
                    <ViewApp row centerH>
                        <TextApp size18 colorP bold>{item.nameItem}</TextApp>
                    </ViewApp>
                    <ViewApp row centerH>
                        <ViewApp row>
                            <TextApp color='#FF7428' style={{ textDecorationLine: 'line-through' }} size16 bold>{formatMoney(item?.price)}</TextApp>
                            <TextApp colorP size16 bold>{formatMoney(moneyDiscount(item?.price, item?.discount))}</TextApp>
                        </ViewApp>
                    </ViewApp>
                </ViewApp>
                <ViewApp mid>
                    <TextApp size16 color2>{`x${item?.count}`}</TextApp>
                </ViewApp>
            </ViewApp>
        </ViewApp>
    )
}

const ItemTime = ({ title, date }: any) => {
    return (
        <ViewApp row centerH pad10>
            <TextApp style={{ flex: 1 }} color1>{title}</TextApp>
            <TextApp color1 bold>{date}</TextApp>
        </ViewApp>
    )
}
export default Screen_order_detail