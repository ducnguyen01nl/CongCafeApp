import { View, Text, Image, StatusBar, ScrollView } from 'react-native'
import React, { useState } from 'react'
import LayoutApp from '../../components/LayoutApp'
import ViewApp from '../../components/ViewApp';
import { COLORS } from '../../colors/colors';
import TouchApp from '../../components/TouchApp';
import { Icon } from 'react-native-paper';
import IconApp from '../../components/IconApp';
import Count from '../../components/Count';
import { goBack, navigate } from '../../root/RootNavigation';
import TextApp from '../../components/TextApp';
import { formatMoney, moneyDiscount } from '../../utils/format';
import ButtonApp from '../../components/ButtonApp';
import { AppLang } from '../../assets/languages';

const Screen_item_detail = ({ route }: any) => {
    const { item } = route?.params;
    const [count,setCount] = useState<number>(1)
    return (
        <LayoutApp>
            <ViewApp w100 h={'45%'}>
                <Image source={{ uri: item.img }} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
                <TouchApp square={40} borderR100 mid bg={COLORS.trans}
                    positionTL mar10
                    onPress={() => goBack()}
                >
                    <IconApp color={COLORS.white} name='arrowleft' type='AntDesign' />
                </TouchApp>
                <TouchApp square={40} borderR100 mid bg={COLORS.trans}
                    positionTR mar10
                    onPress={() => navigate('Screen_cart')}
                >
                    <IconApp color={COLORS.white} name='shopping-basket' type='FontAwesome' size={18} />
                    <Count top={0} right={-4} count={6} size={12} />
                </TouchApp>
            </ViewApp>

            <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
                <ViewApp pad10>
                    <ViewApp row alignI='center'>
                        <TextApp size22 colorP bold>{item.name}</TextApp>
                        {item?.discount != 0 && <TextApp color={COLORS.red} bold style={{ backgroundColor: COLORS.Secondary, paddingHorizontal: 5, borderRadius: 5 }}>{`-${item?.discount}%`}</TextApp>}
                    </ViewApp>
                    <ViewApp row>
                        <TextApp size16 colorP bold style={{ textDecorationLine: 'line-through' }}>{formatMoney(item.price)}</TextApp>
                        <TextApp size16 color={COLORS.red} bold>{formatMoney(moneyDiscount(item.price, item.discount))}</TextApp>
                    </ViewApp>
                </ViewApp>
                <ViewApp bg={COLORS.text4} pad5></ViewApp>
                <ViewApp pad10>
                    <TextApp size16 colorP>{item.des}</TextApp>
                </ViewApp>
            </ScrollView>

            <ViewApp row padH10 borderTW={1}>
                <ViewApp row marR10 flex1 alignCenter justifyContent='space-around'>
                    <TouchApp square={30} mid borderR100 bg={ count <= 1 ? COLORS.trans : COLORS.primary}
                        disabled={count <= 1 ? true : false }
                        styleBox={{opacity:count <= 1 ? 0.5 : 1}}
                        onPress={() =>setCount(count - 1)}
                    >
                        <IconApp size={18} color={COLORS.white} name='minus' type='FontAwesome' />
                    </TouchApp>
                    <ViewApp h={30} flex1 marH10 mid borderR={5} bg={COLORS.Secondary}>
                        <TextApp size18 bold>{count}</TextApp>
                    </ViewApp>
                    <TouchApp square={30} mid borderR100 bg={COLORS.primary}
                        onPress={() =>setCount(count + 1)}
                    >
                        <IconApp size={18} color={COLORS.white} name='plus' type='FontAwesome' />
                    </TouchApp>
                </ViewApp>
                <ButtonApp with6 title={`${AppLang('them')} - ${formatMoney(moneyDiscount(item.price, item.discount)*count)}`} />
            </ViewApp>

        </LayoutApp>
    )
}

export default Screen_item_detail