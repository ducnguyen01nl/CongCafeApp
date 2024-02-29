import { View, StyleSheet, Image, Modal, Alert } from 'react-native'
import React, { useRef, useState } from 'react'
import ViewApp from '../../components/ViewApp'
import HeaderApp from '../../components/HeaderApp'
import LayoutApp from '../../components/LayoutApp'
import { goBack } from '../../root/RootNavigation'
import { COLORS } from '../../colors/colors'
import { imgApp } from '../../assets/img'
import TextApp from '../../components/TextApp'
import TextInputForm from '../../components/TextIputForm'
import ButtonApp from '../../components/ButtonApp'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import ToastMessage from '../../components/ToastMessage'
import ModalApp from '../../components/ModelApp'
import PhoneInput from 'react-native-phone-number-input'
import auth from '@react-native-firebase/auth'

import { regPhone } from '../../data/dataLocal'

const Login_phone = () => {
    const toastRef: any = useRef(null)
    const inputPhone: any = useRef()

    // verification code (OTP - One-Time-Passcode)
    const [code, setCode] = useState<any>(null);
    const [phone, setPhone] = useState<string>('');
    const [confirm, setConfirm] = useState<any>(null);
    const [user, setUser] = useState<any>(null);
    const [otp, setOtp] = useState<any>("");
    const refBtnSign: any = useRef();
    const recaptchaVerifier = useRef<any>();
    const webViewRef = useRef<any>();


    
    const recaptchaRef = React.useRef<any>(null)

    const formik = useFormik({
        initialValues: {
            phone: '',
        },
        validationSchema: Yup.object({
            phone: Yup.string().trim().matches(regPhone, 'Số điện thoại không đúng định dạng').required('Số điện thoại không được để trống'),
        }),
        onSubmit: (values) => {
            console.log('value', values);

        }
    })

    const handleLogin = async () => {
        formik.validateForm().then((errors) => {
            if (errors.phone) {
                toastRef.current?.show(errors.phone);
            }
            else {
                console.log(formik.values.phone);
                console.log(phone);
            }
        });
    }
    

    return (
        <LayoutApp>
            <HeaderApp title={'Đăng nhập'}
                left={{
                    show: true,
                    onPress: () => goBack()
                }}
            />
            <View style={{ height: 10, backgroundColor: COLORS.text4 }}></View>
            <ViewApp mid>
                <Image source={imgApp.logoApp} style={styles.logo} resizeMode='contain' />
                <TextApp size30 bold color1>Xin chào</TextApp>
                <TextApp mV10 color2>Vui lòng đăng nhập bằng số điện thoại của bạn</TextApp>

                <ViewApp width={'80%'}>
                    <PhoneInput defaultValue={formik.values.phone}
                        defaultCode='VN'
                        onChangeText={formik.handleChange('phone')}
                        onChangeFormattedText={(text) => { setPhone(text) }} />
                    <ButtonApp refBtn={refBtnSign} bR={20} title={'Tiếp tục'}
                        onPress={() => handleLogin()}
                    />
                </ViewApp>
            </ViewApp>
            <ToastMessage ref={toastRef} />
            <ModalApp mid outClose>
                <ViewApp backgroundColor={'white'} width={'90%'} padH20 padV={40} borderR={20}>
                    <TextInputForm placeholder='Nhận mã xác nhận' value={otp} onChangeText={(text: any) => setOtp(text)} />
                    <ButtonApp title='Xác nhận' bR={20} mV20
                        onPress={() => {}}
                    />
                </ViewApp>
            </ModalApp>
            <ViewApp id='recaptcha'></ViewApp>
        </LayoutApp>
    )


}

const styles = StyleSheet.create({
    logo: {
        width: '30%',
    }
})

export default Login_phone