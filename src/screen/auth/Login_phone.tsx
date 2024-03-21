import { View, StyleSheet, Image, Modal, Alert, Button } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
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
        formik.validateForm().then(async(errors) => {
            if (errors.phone) {
                toastRef.current?.show(errors.phone);
            }
            else {
                console.log(formik.values.phone);
                console.log('1',phone);
                try {
                    const confirmation = await auth().verifyPhoneNumber(phone);
                    setConfirm(confirmation);
                    console.log('123',confirmation);
                    
                } catch (error) {
                    console.log(error);
                    
                }
            }
        });
    }

    // // Handle login
    // function onAuthStateChanged(user) {
    //     if (user) {
    //         // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
    //         // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
    //         // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
    //         // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    //     }
    // }

    // useEffect(() => {
    //     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    //     return subscriber; // unsubscribe on unmount
    // }, []);

    // Handle the button press
    // async function signInWithPhoneNumber(phone) {
    //     const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    //     setConfirm(confirmation);
    // }

    async function confirmCode() {
        try {
            await confirm.confirm(code);
        } catch (error) {
            console.log('Invalid code.');
        }
    }

    // if (!confirm) {
    //     return (
    //         <Button
    //             title="Phone Number Sign In"
    //             onPress={() => signInWithPhoneNumber('+1 650-555-3434')}
    //         />
    //     );
    // }



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
                        onPress={() => { }}
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