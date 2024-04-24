import { View, Text, FlatList } from 'react-native'
import React from 'react'
import LayoutApp from '../../components/LayoutApp';
import HeaderApp from '../../components/HeaderApp';
import { goBack } from '../../root/RootNavigation';
import ViewApp from '../../components/ViewApp';
import TextApp from '../../components/TextApp';
import { formatDateTimestampAll } from '../../data/dataLocal';
import { AppLang } from '../../assets/languages';
import IconApp from '../../components/IconApp';
import { COLORS } from '../../colors/colors';
import { formatMoney } from '../../utils/format';

const Screen_list_order_statistics = ({ route }: any) => {
    const { data, title } = route?.params
    console.log(data);

    return (
        <LayoutApp>
            <HeaderApp
                title={title}
                left={{
                    show: true,
                    onPress: () => goBack()
                }}
            />
                {
                    data.length > 0
                    ?
                    <FlatList
                        data={data}
                        renderItem={({ item }) => (
                            <ItemOrder item={item} />
                        )}
                        contentContainerStyle={{paddingBottom:50}}
                    />
                    : <ViewApp flex1 mid><TextApp size18>{AppLang('khong_co_hoa_don')}</TextApp></ViewApp>
                }

        </LayoutApp>
    )
}

const ItemOrder = ({item}:any) => {
    console.log(item);
    const totalCount = item?.orderList?.reduce((count: number, item: any) => count + item.count, 0)
    return (
        <ViewApp mar10 borderR={10} backgroundColor={COLORS.Secondary}>
            <ViewApp flex1 pad10>
                <ViewApp row centerH padV10>
                    <TextApp style={{ flex: 1 }} color1>{`${AppLang('ma_don')}: ${item?.id}`}</TextApp>
                    <TextApp color1>{formatDateTimestampAll(item?.createAt)}</TextApp>
                </ViewApp>
            
                <ViewApp row centerH padV10 borderTW={1} borderBW={1}>
                    <TextApp color1>{`${totalCount} ${AppLang('san_pham')}`}</TextApp>
                    <ViewApp row mid>
                        <IconApp color={COLORS.orange} name='dollar-sign' type='FontAwesome5' />
                        <TextApp color1>{`${AppLang('thanh_tien')}:`}</TextApp>
                        <TextApp bold color={COLORS.orange}>{formatMoney(item?.totalPrice)}</TextApp>
                    </ViewApp>
                </ViewApp>

                <ViewApp row centerH padV10 borderBW={1}>
                    <TextApp color1>{`${AppLang('hinh_thuc')}:`}</TextApp>
                    <ViewApp row mid>
                        <TextApp color1>{item?.type == 1 ? AppLang('tai_quan') : AppLang('tai_nha')}</TextApp>
                    </ViewApp>
                </ViewApp>
            </ViewApp>
        </ViewApp>
    )
}

export default Screen_list_order_statistics