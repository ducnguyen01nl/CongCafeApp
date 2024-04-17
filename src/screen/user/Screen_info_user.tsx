import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import LayoutApp from '../../components/LayoutApp'
import HeaderApp from '../../components/HeaderApp'
import { goBack } from '../../root/RootNavigation'
import ViewApp from '../../components/ViewApp'
import { imgApp } from '../../assets/img'
import { COLORS } from '../../colors/colors'
import { useInfoUserCurrent } from '../../service/useLocalMater'
import TouchApp from '../../components/TouchApp'
import { RadioButton, TextInput } from 'react-native-paper'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { DATA_GENDER, formatDateTimestamp, regPhone2 } from '../../data/dataLocal'
import LoadingApp from '../../components/LoadingApp'
import TextApp from '../../components/TextApp'
import ImagePickerModel from '../../components/ImagePickerModel'
import storage from '@react-native-firebase/storage'
import InputCustom from '../../components/input/InputCustom'
import InputDate from '../../components/input/InputDate'
import { convertFirebaseTimestamp } from '../../components/convertData'
import { coverDateTimeStamp, coverDateTimeStampToString, covertStringToDate, covertStringtoDateTimeStamp } from '../../utils/format'
import InputSelect from '../../components/input/InputSelect'
import { AppLang } from '../../assets/languages'
import { userApi } from '../../api/userApi'
import { serverTimestamp } from 'firebase/firestore'
import ModalApp from '../../components/ModelApp'
import ButtonApp from '../../components/ButtonApp'
import { useDispatch, useSelector } from 'react-redux'
import { setUser, setUserLoading } from '../../app/redux/slices/userSlice'
import moment from 'moment'

const Screen_info_user = () => {
  // const [isLoading, data, onRefresh] = useInfoUserCurrent();
  const _input = useRef<any>({})
  const refModalImage = useRef<any>();
  const refModal = useRef<any>();
  const [isLoading, data, onRefresh] = useInfoUserCurrent();
  const { user, userLoading } = useSelector((state: any) => state.user)
  const [choseImage, setChoseImage] = useState<any>(user.img);
  const dispatch = useDispatch()

  useEffect(() => {
    const data_gender = DATA_GENDER.find(item => item.value == user.gender)
    _input.current['birthday'].setValue(covertStringToDate(user.birthday))
    _input.current['gender'].setValue(data_gender)
  }, [])

  const handlSaveInfo = async () => {
    refModal.current.close()
    dispatch(setUserLoading(true))
    const full_name = _input.current['full_name'].getValue();
    const birthday = _input.current['birthday'].getValue();
    const gender = _input.current['gender'].getValue();
    const email = _input.current['email'].getValue();
    const phone = _input.current['phone'].getValue();

    const pathArray = choseImage.split('/');
    const fileName = pathArray[pathArray.length - 1];

    const urlImageUpload = choseImage !== user.img
      ? await userApi.updateFile(choseImage, fileName, user.userId)
      : user.img;
    try {
      dispatch(setUser({
        userName: full_name,
        img: urlImageUpload,
        birthday: moment(new Date(birthday)).format('DD-MM-YYYY'),
        gender: gender.value,
        email: email,
        phone: phone,
        updateAt: moment(new Date()).format('DD-MM-YYYY'),
      }));
      await userApi.setUserInfo({
        userName: full_name,
        img: urlImageUpload,
        birthday: new Date(birthday),
        gender: gender.value,
        email: email,
        phone: phone,
        updateAt: new Date(),
      });
    } catch (error) {
      console.log(error);
      dispatch(setUserLoading(false))

    }
    dispatch(setUserLoading(false))
    goBack()

  }
  useEffect(() => {
  }, [choseImage])
  return (
    data ?
      <LayoutApp>
        <>
          <HeaderApp
            title={AppLang(`thong_tin_nguoi_dung`)}
            left={{
              show: true,
              onPress: () => goBack()
            }}
            right={{
              show: true,
              type: true,
              onPress: () => refModal.current.open()
            }}
          />
          <ViewApp mid marT={30} marB10>
            <TouchApp square={80} overF='hidden' mid styleBox={styles.imageUser}
              onPress={() => { refModalImage.current.open() }}
            >
              <Image source={{ uri: choseImage }} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
            </TouchApp>
            <TextApp color2>{AppLang(`thay_doi_anh_dai_dien`)}</TextApp>
          </ViewApp>
          <ImagePickerModel ref={refModalImage} onSelected={(img: any) => setChoseImage(img)} />
          <ViewApp w100 h={10} backgroundColor={COLORS.text4}></ViewApp>

          <ScrollView style={{ margin: 10 }} showsVerticalScrollIndicator={false}>
            <InputCustom
              isUpdate
              label={AppLang(`ho_va_ten`)}
              propsInput={{
                placeholder: AppLang(`ho_va_ten`),
                valueInit: user.userName,
                placeholderTextColor: COLORS.text2,
              }}
              ref={ref => (_input.current['full_name'] = ref)}
            />
            <InputDate
              label={AppLang(`ngay_sinh`)}
              placeholder={AppLang(`ngay_sinh`)}
              icon={'calendar'}
              iconType={'Entypo'}
              mode={'date'}
              {...{ maximumDate: new Date(), minimumDate: new Date(1930, 0, 1) }}
              ref={ref => (_input.current['birthday'] = ref)}
            />
            <InputSelect
              label={AppLang(`gioi_tinh`)}
              placeholder={AppLang(`gioi_tinh`)}
              data={DATA_GENDER}
              icon={{ name: 'caret-down' }}
              ref={ref => (_input.current['gender'] = ref)}

            />
            {
              user.role == 1
                ? <InputCustom
                  isUpdate
                  label={AppLang(`email`)} 
                  propsInput={{
                    placeholder: AppLang(`email`),
                    valueInit: user.email,
                    placeholderTextColor: COLORS.text2,
                  }}
                  ref={ref => (_input.current['email'] = ref)}
                />
                : <InputCustom
                  label={AppLang(`email`)}
                  isUpdate
                  propsInput={{
                    placeholder: AppLang(`email`),
                    editable: false,
                    valueInit: user.email,
                    placeholderTextColor: "#A4A4A4",
                    color: COLORS.text2

                  }}
                  background={"#ddd"}
                  ref={ref => (_input.current['email'] = ref)}
                />
            }
            {
              user.role == 1
                ? <InputCustom
                  label={AppLang(`sdt`)}
                  isUpdate
                  propsInput={{
                    placeholder: AppLang(`sdt`),
                    editable: false,
                    valueInit: user.phone,
                    placeholderTextColor: "#A4A4A4",
                    color: COLORS.text2

                  }}
                  background={"#ddd"}
                  ref={ref => (_input.current['phone'] = ref)}
                />
                : <InputCustom
                  isUpdate
                  label={AppLang(`sdt`)}
                  propsInput={{
                    placeholder: AppLang(`sdt`),
                    keyboardType: 'number-pad',
                    valueInit: user.phone,
                    placeholderTextColor: COLORS.text2,
                  }}
                  ref={ref => (_input.current['phone'] = ref)}
                />
            }

            {/* <InputCustom
              isText
              label={'Ngày cập nhật'}
              placeholder={'Ngày cập nhật'}
              value={coverDateTimeStampToString(user.updateAt)}
              ref={ref => (_input.current['updateAt'] = ref)}
            /> */}

            <InputCustom
              label={AppLang(`ngay_cap_nhat`)}
              isUpdate
              propsInput={{
                placeholder: 'Ngầy cập nhật',
                editable: false,
                valueInit: user.updateAt,
                placeholderTextColor: "#A4A4A4",
                color: COLORS.text2

              }}
              background={"#ddd"}
              ref={ref => (_input.current['updateAt'] = ref)}
            />


            {/* <TextApp color3 bold pad10>Giới tính</TextApp>
            <RadioButton.Group onValueChange={(value) => {_input.current['gender'].setValue(value);
            }} value={String(_input.current['gender']?.getValue())}>
              <ViewApp row alignCenter padH20>
                <ViewApp row flex1 mid>
                  <TextApp color1 bold>Nam</TextApp>
                  <RadioButton value='true' />
                </ViewApp>
                <ViewApp row flex1 mid>
                  <TextApp color1 bold>Nữ</TextApp>
                  <RadioButton value="false" />
                </ViewApp>
              </ViewApp>
            </RadioButton.Group> */}
          </ScrollView>
        </>
        <ModalApp ref={refModal} mid>
          <ViewApp w={'90%'} mid pad20 backgroundColor={'white'} borderR={10} animated>
            <TextApp size18 bold>{AppLang('ban_co_chac_muon_thay_doi_tt')}</TextApp>
            <ViewApp row w={'90%'} justifyContent='flex-end' marT={20}>
              <ButtonApp
                title={AppLang('huy')}
                onPress={() => refModal.current.close()}
                styleText={{
                  fontSize: 16,
                  paddingHorizontal: 10
                }}
                styleButton={{
                  marginRight: 10
                }}
              />
              <ButtonApp
                title={AppLang('dong_y')}
                onPress={() => handlSaveInfo()}
                styleText={{
                  fontSize: 16,
                  paddingHorizontal: 10
                }}
              />
            </ViewApp>
          </ViewApp>
        </ModalApp>
        {userLoading && <LoadingApp />}
      </LayoutApp>
      : null
  )
}

const styles = StyleSheet.create({
  imageUser: {
    borderWidth: 3,
    borderColor: COLORS.text3,
    borderRadius: 100,
    marginBottom: 10
  },
  input: {
    backgroundColor: COLORS.white,
    // borderBottomWidth:2,
    marginVertical: 5,
    fontWeight: 'bold'
  }
})

export default Screen_info_user