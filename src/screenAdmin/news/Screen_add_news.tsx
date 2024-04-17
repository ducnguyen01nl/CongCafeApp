import { View, Text, ScrollView, Image } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LayoutApp from '../../components/LayoutApp'
import HeaderApp from '../../components/HeaderApp'
import { AppLang } from '../../assets/languages'
import { goBack } from '../../root/RootNavigation'
import ViewApp from '../../components/ViewApp'
import InputCustom from '../../components/input/InputCustom'
import { COLORS } from '../../colors/colors'
import TouchApp from '../../components/TouchApp'
import TextApp from '../../components/TextApp'
import ImagePickerModal from '../../components/ImagePickerModel'
import { StyleSheet } from 'react-native'
import { imgApp } from '../../assets/img'
import InputSelect from '../../components/input/InputSelect'
import { DATA_FILTER_TYPE, DATA_FILTER_TYPE_2, widthScreen } from '../../data/dataLocal'
import ImagePicker from 'react-native-image-picker';
import { launchCamera, launchImageLibrary, CameraOptions, ImagePickerResponse } from 'react-native-image-picker';
import IconApp from '../../components/IconApp'
import ToastService from '../../service/ToastService'
import { newsApi } from '../../api/newsApi'
import LoadingApp from '../../components/LoadingApp'
import { pushNotificationApi } from '../../api/pushNotificationApi'
import { useGetListToken, useGetTokenRole } from '../../service/useLocalMater'

const Screen_add_news = ({ route }: any) => {

    const { data } = route?.params
    const _input = useRef<any>({})
    const refModalImage = useRef<any>();
    const refModal = useRef<any>();
    const [listImage, setListImage] = useState<any>(data ? data?.images : [])
    const [loading,setLoading] = useState<any>(false);
    const listTokenUser = useGetTokenRole(1)

    useEffect(() => {
        if (data?.id) {
            _input.current['type'].setValue(DATA_FILTER_TYPE_2[data?.type - 1])
        }
    }, [])
    const handleAddOrUpdateNews = async () => {
        setLoading(true)
        const title = _input.current['title'].getValue()
        const content = _input.current['content'].getValue()
        const type = _input.current['type'].getValue()

        if (!title) return ToastService.showToast(AppLang('tieu_de_trong'))
        if (!content) return ToastService.showToast(AppLang('noi_dung_trong'))
        if (!type) return ToastService.showToast(AppLang('loai_tin_trong'))

        // if (listImage.length > 0) {
        const updatedListImage = await Promise.all(listImage.map(async (data: any) => {
            if (data.startsWith("http")) {
                return data
            }
            else {
                const pathArray = data.split('/');
                const fileName = pathArray[pathArray.length - 1];
                const imageUploadItem = await newsApi.updateFileNews(data, fileName)
                return imageUploadItem;
            }
        }));
        if (data) {
            await newsApi.updateNews(data?.id, {
                title: title,
                content: content,
                type: type.value,
                images: updatedListImage,
                updateAt: new Date()
            })
        }
        else {
            await newsApi.addNews({
                title: title,
                content: content,
                type: type.value,
                images: updatedListImage,
                status: true,
                createAt: new Date(),
                updateAt: new Date()
            })
        }
        await pushNotificationApi.pushNotify({
            title:'Cộng Cà phê xin chào',
            body:data ? AppLang('cong_ca_phe_da_cap_nhat_1_bai_viet') : AppLang('cong_ca_phe_da_them_1_bai_viet_moi'),
            arrayToken:listTokenUser,
            data:{screen:2,id:'NewsAdmin'},
        })        
        setLoading(false)
        // }
        goBack()
        // await pushNotificationApi.pushNotificationAll(dataToken,{
        //     title:AppLang('cong_ca_phe'),
        //     body:data ? AppLang('cong_ca_phe_da_cap_nhat_1_bai_viet') : AppLang('cong_ca_phe_da_them_1_bai_viet_moi')
        // })
        
    }


    const onImageLibraryPress = async () => {
        try {
            const options = {
                mediaType: 'photo' as ImagePicker.MediaType,
                includeBase64: false,
                selectionLimit: 5, // Số lượng tối đa ảnh có thể chọn
            };

            const response: ImagePickerResponse = await launchImageLibrary(options);

            if (response.didCancel) {
                console.log('User cancelled camera');
            } else if (response.errorMessage) {
                console.log('Camera Error: ', response.errorMessage);
            } else {
                // Xử lý danh sách ảnh đã chọn ở đây
                const selectedImages: any = response.assets;
                const selectedUri: any = selectedImages.map((img: any) => img.uri)
                console.log('Selected images: ', selectedUri);
                // setValue(response.assets?.[0]?.uri);
                setListImage([...selectedUri, ...listImage]);
            }
        } catch (error) {
            console.log('Error selecting images: ', error);
        }
    };

    return (
        <LayoutApp>
            <HeaderApp
                title={data ? AppLang('sua_tin_tuc') : AppLang('them_tin_moi')}
                left={{
                    show: true,
                    onPress: () => goBack()
                }}
                right={{
                    show: true,
                    type: true,
                    title: data ? AppLang('luu') : AppLang('them'),
                    onPress: () => { handleAddOrUpdateNews() }
                }}
            />
            <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>

                <ScrollView horizontal style={{ margin: 20 }} showsHorizontalScrollIndicator={false}>
                    <TouchApp onPress={() => { onImageLibraryPress() }} mid>
                        <IconApp size={50} name='pluscircleo' color={COLORS.primary} type='AntDesign' />
                    </TouchApp>
                    {
                        listImage?.map((data: any, index: number) => (
                            <TouchApp key={index} square={200} overF='hidden' marH5 mid styleBox={styles.image}
                            >
                                <Image source={{ uri: data }} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
                                <TouchApp positionA top0 right0 pad5 bgR borderR={10}
                                    onPress={() => setListImage(listImage.filter((img: any) => img != data))}
                                >
                                    <IconApp size={30} color='white' name='x' type='Feather' />
                                </TouchApp>
                            </TouchApp>
                        ))
                    }
                </ScrollView>
                {/* <ImagePickerModal ref={refModalImage} onSelected={(img: any) => setChoseImage(img)} /> */}
                <ViewApp pad10>
                    <InputCustom
                        isUpdate
                        required
                        label={AppLang(`tieu_de`)}
                        propsInput={{
                            placeholder: AppLang(`tieu_de`),
                            valueInit: data?.title,
                            placeholderTextColor: COLORS.text2,
                        }}
                        style={{
                            color:COLORS.text1,
                        }}
                        ref={ref => (_input.current['title'] = ref)}
                    />

                    <InputCustom
                        isUpdate
                        required
                        label={AppLang(`noi_dung`)}
                        propsInput={{
                            placeholder: AppLang(`noi_dung`),
                            placeholderTextColor: COLORS.text2,
                            valueInit: data?.content && String(data?.content)
                        }}
                        style={{
                            color:COLORS.text1,
                        }}
                        multiline
                        styleInput={{ height: 200, paddingRight: 10 }}
                        ref={ref => (_input.current['content'] = ref)}
                    />

                    <InputSelect
                        required
                        label={AppLang(`loai_tin`)}
                        placeholder={AppLang(`loai_tin`)}
                        data={DATA_FILTER_TYPE_2}
                        icon={{ name: 'caret-down' }}
                        ref={ref => (_input.current['type'] = ref)}

                    />

                </ViewApp>
            </ScrollView>
            {
                loading && <LoadingApp />
            }
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

export default Screen_add_news