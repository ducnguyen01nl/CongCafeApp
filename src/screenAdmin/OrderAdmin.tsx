import { View, Text, Image, StyleSheet } from 'react-native'
import React, { useRef } from 'react'
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
import { useListOrderAll } from '../service/useLocalMater'
import TopTab from '../screen/order/components/TopTab'

const OrderAdmin = () => {
    const { user } = useSelector((state: any) => state.user)
    const [isLoading, data, onRefresh] = useListOrderAll();
    const refToast = useRef<any>();
    const _langue = useRef<any>();
    const countOrder = (status: number) => {
        return data.filter((item: any) => item.status == status).length
    }
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
                                <Image style={{ width: '100%', height: '100%' }} source={user?.img ? { uri: user.img } : imgApp.userDefault} resizeMode='cover' />
                            </TouchApp>
                            <ViewApp mid>
                                <TextApp colorP bold size16>{`${AppLang('xin_chao')} ${user.userName}`}</TextApp>
                            </ViewApp>
                        </ViewApp>

                        <ViewApp row w={'28%'} justifyC='flex-end'>

                            <TouchApp square={40} borderR={20} mid>
                                <IconApp color={COLORS.primary} size={26} name='bell' type='FontAwesome5' />
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