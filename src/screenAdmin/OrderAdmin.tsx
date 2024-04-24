import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useEffect, useRef } from 'react'
import LayoutApp from '../components/LayoutApp'
import ViewApp from '../components/ViewApp'
import { COLORS } from '../colors/colors'
import LinearGradient from 'react-native-linear-gradient'
import TouchApp from '../components/TouchApp'
import { navigate } from '../root/RootNavigation'
import IconApp from '../components/IconApp'
import TextApp from '../components/TextApp'
import { AppLang } from '../assets/languages'
import { useSelector } from 'react-redux'
import { imgApp } from '../assets/img'
import Count from '../components/Count'
import { useGetListNotification, useGetListToken, useListOrderAll } from '../service/useLocalMater'
import TopTab from '../screen/order/components/TopTab'
import messaging from '@react-native-firebase/messaging'
import axios from 'axios'
import { pushNotificationApi } from '../api/pushNotificationApi'
import AsyncStorage from '@react-native-async-storage/async-storage'

const OrderAdmin = () => {
    const { user } = useSelector((state: any) => state.user)
    const [isLoading, data, onRefresh] = useListOrderAll();
    const refToast = useRef<any>();
    const _langue = useRef<any>();
    const countOrder = (status: number) => {
        return data.filter((item: any) => item.status == status).length
    }
    const { token } = useSelector((state: any) => state.token)
    const [isLoadingNo, dataNo, onRefreshNo] = useGetListNotification()
    const [isLoadingToken, dataToken, onRefreshToken] = useGetListToken()

    const handlePushNotification = () => {
        pushNotificationApi.pushNotification('cJos7CrvS66crRlTy3in9I:APA91bEFKge3Qa_7hWI8-LvkvOxEK2YXB0V4RfkKzKew2m1tE60XvWct3NlIWoBLK-UFwy1czLqMVJMksMPFgaMfeVSj9JGVflic8ZAJSH9Zp4dG-ByyReZEnds26s8tXwwO9iSnfAjx',{
            title:'Cộng Cà Phê',
            body:'Đơn hàng mã xxxxxxxxx của bạn đã được xác nhận'
        })
        // pushNotificationApi.pushNotification()
    }

    
useEffect(() => {
    if (dataNo.length > 0 && token) {
        handleUpdateTokenFCM();
    }
}, [dataNo, token]);

const handleUpdateTokenFCM = async () => {
    const userId: any = await AsyncStorage.getItem('userId')
    try {
        const tokenCurrent = dataNo.find((state: any) => state.tokenFCM === token);
        if (tokenCurrent) {

            if (tokenCurrent.userId === userId) {
                return null;
            } else {
                await pushNotificationApi.updateTokenFCM(tokenCurrent.id, {
                    userId: userId
                });
            }
        } else {
            await pushNotificationApi.addTokenFCM(token,user)
        }

    } catch (error) {
        console.log(error, 'getToken');
    }
};


    return (
        <LayoutApp>
            <ViewApp bg={COLORS.primary} backgroundColor={'#ECF6F8'}>
                <ViewApp
                >
                    <ViewApp pad10 row centerH>
                        <ViewApp row flex2>
                            <TouchApp borderW={3} square={50} borderC={COLORS.primary} borderR={10} mid overF='hidden'
                                onPress={() => navigate('Screen_info_user')}
                            >
                                <Image style={{ width: '100%', height: '100%' }} source={user?.img ? { uri: user?.img } : imgApp.userDefault} resizeMode='cover' />
                            </TouchApp>
                            <ViewApp mid>
                                <TextApp colorP bold size16>{`${AppLang('xin_chao')} ${user?.userName}`}</TextApp>
                            </ViewApp>
                        </ViewApp>

                        <ViewApp row w={'28%'} justifyC='flex-end'>

                            <TouchApp square={40} borderR={20} mid
                                onPress={handlePushNotification}
                            >
                                {/* <IconApp color={COLORS.primary} size={26} name='bell' type='FontAwesome5' /> */}
                            </TouchApp>
                        </ViewApp>
                    </ViewApp>
                </ViewApp>
            </ViewApp>
            <ViewApp flex1 bg='#ECF6F8'>
                <TopTab />
            </ViewApp>
        </LayoutApp>
    )
}

export default OrderAdmin


const styles = StyleSheet.create({
    imageUser: {
        borderWidth: 3,
        borderColor: COLORS.Secondary,
        borderRadius: 100,
    },
    blockHeader: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 20
    },
    blockItemMain: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 5
    },
    itemChildren: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        paddingVertical: 20,
        borderColor: COLORS.text3
    },
    iconOrder: {
        color: COLORS.primary,
        position: "relative"
    }
})