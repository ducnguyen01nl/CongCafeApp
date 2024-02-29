import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useRef } from 'react'
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
import { coverDateTimeStamp, coverDateTimeStampToString } from '../../utils/format'
import InputSelect from '../../components/input/InputSelect'

const Screen_info_user = ({ route }: any) => {
  const { data } = route.params
  // const [isLoading, data, onRefresh] = useInfoUserCurrent();
  const _input = useRef<any>({})
  const refModalImage = useRef<any>();

  useEffect(() => {
    const data_gender = DATA_GENDER.find(item => item.value == data?.gender)
    _input.current['birthday'].setValue(coverDateTimeStamp(data?.date_of_birth))
    _input.current['gender'].setValue(data_gender)
  }, [])
  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      phone: '',
      dateOfBirth: '',
      updateAt: '',
      gender: null,
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().lowercase().email('Email không đúng định dạng'),
      phone: Yup.string().trim().matches(regPhone2, 'Số điện thoại không đúng định dạng'),
    }),
    onSubmit: (values) => {
      console.log('value', values);

    }
  })
  useEffect(() => {

    // Gán giá trị vào formik khi dữ liệu đã tải xong
    if (data) {
      formik.setValues({
        userName: data.userName || '',
        email: data.email || '',
        phone: data.phone || '',
        dateOfBirth: formatDateTimestamp(data.date_of_birth) || '',
        updateAt: formatDateTimestamp(data.updateAt) || '',
        gender: data.gender || null
      });
    }
  }, [data]);

  const handlSaveInfo = () => {
    console.log(formik.values);
    console.log('====================================');
    console.log(_input.current['updateAt'].getValue());
    console.log(_input.current['phone'].getValue());
    console.log('====================================');

  }

  return (
    data ?
      <LayoutApp>
        <>
          <HeaderApp
            title={'Thông tin người dùng'}
            left={{
              show: true,
              onPress: () => goBack()
            }}
            right={{
              show: true,
              type: true,
              onPress: () => handlSaveInfo()
            }}
          />
          <ViewApp mid marT={30} marB10>
            <TouchApp square={80} overF='hidden' mid styleBox={styles.imageUser}
              onPress={() => { refModalImage.current.open() }}
            >
              <Image source={data?.imgUrl ? { uri: data?.imgUrl } : imgApp.userDefault} style={{ width: '100%', height: '100%' }} resizeMode='cover' />
            </TouchApp>
            <TextApp color2>Thay đổi ảnh đại diện</TextApp>
          </ViewApp>
          <ImagePickerModel ref={refModalImage} />
          <ViewApp w100 h={10} backgroundColor={COLORS.text4}></ViewApp>

          <ScrollView style={{ margin: 10 }} showsVerticalScrollIndicator={false}>
            <InputCustom
              isUpdate
              label={'Họ và tên'}
              propsInput={{
                placeholder: 'Họ và tên',
                valueInit: data?.userName,
                placeholderTextColor: COLORS.text2,
              }}
              ref={ref => (_input.current['full_name'] = ref)}
            />
            <InputDate
              label={'Ngày sinh'}
              placeholder='Ngày sinh'
              icon={'calendar'}
              iconType={'Entypo'}
              mode={'date'}
              {...{ maximumDate: new Date(), minimumDate: new Date(1930, 0, 1) }}
              ref={ref => (_input.current['birthday'] = ref)}
            />
            <InputSelect
              label={'Giới tính'}
              placeholder='Giới tính'
              data={DATA_GENDER}
              icon={{ name: 'caret-down' }}
              ref={ref => (_input.current['gender'] = ref)}

            />
            {
              data?.role == 2
                ? <InputCustom
                  isUpdate
                  label={'Email'}
                  propsInput={{
                    placeholder: 'email',
                    valueInit: data?.email,
                    placeholderTextColor: COLORS.text2,
                  }}
                  ref={ref => (_input.current['email'] = ref)}
                />
                : <InputCustom
                  label={'Email'}
                  isUpdate
                  propsInput={{
                    placeholder: 'Email',
                    editable: false,
                    valueInit: data?.email,
                    placeholderTextColor: "#A4A4A4",
                    color: COLORS.text2

                  }}
                  background={"#ddd"}
                  ref={ref => (_input.current['email'] = ref)}
                />
            }
            {
              data?.role == 2
                ? <InputCustom
                  label={'Số điện thoại'}
                  isUpdate
                  propsInput={{
                    placeholder: 'Số điện thoại',
                    editable: false,
                    valueInit: data?.phone,
                    placeholderTextColor: "#A4A4A4",
                    color: COLORS.text2

                  }}
                  background={"#ddd"}
                  ref={ref => (_input.current['phone'] = ref)}
                />
                : <InputCustom
                  isUpdate
                  label={'Số điện thoại'}
                  propsInput={{
                    placeholder: 'Số điện thoại',
                    keyboardType: 'number-pad',
                    valueInit: data?.phone,
                    placeholderTextColor: COLORS.text2,
                  }}
                  ref={ref => (_input.current['phone'] = ref)}
                />
            }

            {/* <InputCustom
              isText
              label={'Ngày cập nhật'}
              placeholder={'Ngày cập nhật'}
              value={coverDateTimeStampToString(data?.updateAt)}
              ref={ref => (_input.current['updateAt'] = ref)}
            /> */}

            <InputCustom
              label={'Ngày cập nhật'}
              isUpdate
              propsInput={{
                placeholder: 'Ngầy cập nhật',
                editable: false,
                valueInit: coverDateTimeStampToString(data?.updateAt),
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