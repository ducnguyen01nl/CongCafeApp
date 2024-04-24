import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LayoutApp from '../../components/LayoutApp'
import HeaderApp from '../../components/HeaderApp'
import { goBack } from '../../root/RootNavigation'
import { AppLang } from '../../assets/languages'
import ViewApp from '../../components/ViewApp'
import TouchApp from '../../components/TouchApp'
import TextApp from '../../components/TextApp'
import ImagePickerModal from '../../components/ImagePickerModel'
import { StyleSheet } from 'react-native'
import { COLORS } from '../../colors/colors'
import { imgApp } from '../../assets/img'
import InputCustom from '../../components/input/InputCustom'
import InputSelect from '../../components/input/InputSelect'
import { DATA_TYPE_ITEMS, DATA_TYPE_ITEMS2 } from '../../data/dataLocal'
import ToastMessage from '../../components/ToastMessage'
import ToastService from '../../service/ToastService'
import { drinksApi } from '../../api/drinksApi'
import { date } from 'yup'

const Screen_add_drinks = ({route}:any) => {
    const { dataItem } = route?.params
    const _input = useRef<any>({})
    const refModalImage = useRef<any>();
    const refModal = useRef<any>();
    const [choseImage, setChoseImage] = useState<any>(dataItem ? dataItem?.img : null);

    useEffect(() =>{
       if(dataItem?.id){
        _input.current['type'].setValue(DATA_TYPE_ITEMS2[dataItem?.type])
       } 
    },[])


    const handlSaveInfo = async () => {
        // refModal.current.close()
        const name = _input.current['name'].getValue();
        const des = _input.current['des'].getValue();
        const discount = _input.current['discount'].getValue();
        const price = _input.current['price'].getValue();
        const type = _input.current['type'].getValue();

        if(!choseImage) return ToastService.showToast(AppLang('hinh_anh_mat_hang_trong'))
        if(!name) return ToastService.showToast(AppLang('ten_mat_hang_trong'))
        if(!des) return ToastService.showToast(AppLang('mo_ta_mat_hang_trong'))
        if(!discount) return ToastService.showToast(AppLang('giam_gia_mat_hang_trong'))
        if(!price) return ToastService.showToast(AppLang('don_gia_mat_hang_trong'))
        if(!type) return ToastService.showToast(AppLang('loai_mat_hang_trong'))

        const pathArray = choseImage.split('/');
        const fileName = pathArray[pathArray.length - 1];
        const urlImageUpload = choseImage !== dataItem?.img
        ? await drinksApi.updateFile(choseImage, fileName)
        : dataItem?.img;

        if(dataItem){
            await drinksApi.updateDrinks(dataItem?.id,{
                name:name,
                des:des,
                discount:Number(discount),
                img:urlImageUpload,
                price:Number(price),
                type:type?.value,
                updateAt:new Date()
            })
        }
        else{
            await drinksApi.addNewDrinks({
                name:name,
                des:des,
                discount:Number(discount),
                img:urlImageUpload,
                price:Number(price),
                type:type?.value,
                status:true,
                star:5,
                createAt:new Date(),
                updateAt:new Date()

            })
        }
        goBack()

    }

    return (
        <LayoutApp>
            <HeaderApp
                title={AppLang('them_mat_hang')}
                left={{
                    show: true,
                    onPress: () => goBack()
                }}
                right={{
                    show: true,
                    type: true,
                    title: dataItem ? AppLang('luu') : AppLang('them'),
                    onPress:() => {handlSaveInfo()}
                }}
            />
            <ScrollView style={{ flex: 1 }}>
                <ViewApp mid marT={30} marB10>
                    <TouchApp square={100} overF='hidden' mid styleBox={styles.image}
                        onPress={() => { refModalImage.current.open() }}
                    >
                        <Image source={choseImage ? { uri: choseImage } : imgApp.userDefault} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
                    </TouchApp>
                    <TextApp color2>{AppLang(`chon_anh_mat_hang`)}</TextApp>
                </ViewApp>
                <ImagePickerModal ref={refModalImage} onSelected={(img: any) => setChoseImage(img)} />
                <ViewApp pad10>
                    <InputCustom
                        isUpdate
                        required
                        label={AppLang(`ten_mat_hang`)}
                        propsInput={{
                            placeholder: AppLang(`ten_mat_hang`),
                            valueInit:dataItem?.name,
                            placeholderTextColor: COLORS.text2,
                            color: COLORS.text1
                        }}
                        ref={ref => (_input.current['name'] = ref)}
                    />
                    <InputCustom
                        isUpdate
                        required
                        label={`${AppLang(`giam_gia`)} (%)`}
                        propsInput={{
                            placeholder: AppLang(`giam_gia`),
                            placeholderTextColor: COLORS.text2,
                            keyboardType: 'number-pad',
                            valueInit:dataItem?.discount && String(dataItem?.discount),
                            color: COLORS.text1
                        }}
                        ref={ref => (_input.current['discount'] = ref)}
                    />
                    <InputCustom
                        isUpdate
                        required
                        label={`${AppLang(`don_gia`)} (đ)`}
                        propsInput={{
                            placeholder: AppLang(`don_gia`),
                            placeholderTextColor: COLORS.text2,
                            keyboardType: 'number-pad',
                            valueInit:dataItem?.price && String(dataItem?.price),
                            color: COLORS.text1
                        }}
                        ref={ref => (_input.current['price'] = ref)}
                    />
                    <InputSelect
                        required
                        label={AppLang(`loai_mat_hang`)}
                        placeholder={AppLang(`loai_mat_hang`)}
                        data={DATA_TYPE_ITEMS2}
                        icon={{ name: 'caret-down' }}
                        ref={ref => (_input.current['type'] = ref)}

                    />
                    <InputCustom
                        isUpdate
                        required
                        label={AppLang(`mo_ta`)}
                        propsInput={{
                            placeholder: AppLang(`mo_ta`),
                            placeholderTextColor: COLORS.text2,
                            valueInit:dataItem?.des &&  String(dataItem?.des),
                            color: COLORS.text1
                        }}
                        multiline
                        styleInput={{ height: 100, paddingRight: 10 }}
                        ref={ref => (_input.current['des'] = ref)}
                    />

                </ViewApp>
            </ScrollView>
        </LayoutApp>
    )
}
const styles = StyleSheet.create({
    image: {
        borderWidth: 3,
        borderColor: COLORS.text3,
        borderRadius: 20,
        marginBottom: 10
    },
    input: {
        backgroundColor: COLORS.white,
        // borderBottomWidth:2,
        marginVertical: 5,
        fontWeight: 'bold'
    }
})
export default Screen_add_drinks