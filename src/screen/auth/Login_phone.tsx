import { View, StyleSheet, Image, Modal, Alert, Button } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import ViewApp from '../../components/ViewApp'
import HeaderApp from '../../components/HeaderApp'
import LayoutApp from '../../components/LayoutApp'
import { goBack, navigate } from '../../root/RootNavigation'
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
import auth, { firebase } from '@react-native-firebase/auth'

import { regPhone } from '../../data/dataLocal'
import { userApi } from '../../api/userApi'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { covertFirebaseTimeStampToString } from '../../utils/format'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../app/redux/slices/userSlice'
import { useGetListNotification } from '../../service/useLocalMater'
import { pushNotificationApi } from '../../api/pushNotificationApi'
import ToastService from '../../service/ToastService'
import { logEvent } from 'firebase/analytics'
import LoadingApp from '../../components/LoadingApp'

const Login_phone = () => {
    const toastRef: any = useRef(null)
    const inputPhone: any = useRef()

    // verification code (OTP - One-Time-Passcode)
    const [isLoading, setIsLoading] = useState<any>(false);
    const [phone, setPhone] = useState<string>('');
    const [confirm, setConfirm] = useState<any>(null);
    // const [user, setUser] = useState<any>(null);
    const [otp, setOtp] = useState<any>("");
    const refBtnSign: any = useRef();
    const refModal: any = useRef();
    const recaptchaVerifier = useRef<any>();
    const webViewRef = useRef<any>();
    const dispatch = useDispatch()
    const { token } = useSelector((state: any) => state.token)
    const [isLoadingNo, dataNo, onRefreshNo] = useGetListNotification()
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

    const handleUpdateTokenFCM = async () => {
        const userId: any = await AsyncStorage.getItem('userId')
        try {
            console.log('2222', token);

            const tokenCurrent = dataNo.find((state: any) => state.tokenFCM === token);
            if (tokenCurrent) {

                if (tokenCurrent.userId === userId) {
                    return null;
                } else {
                    await pushNotificationApi.updateTokenFCM(tokenCurrent.id, {
                        userId: userId,
                        role: 1
                    });
                }
            } else {
                // console.log('1111', dataNo);
                await pushNotificationApi.addTokenFCM(token, { userId: userId, role: 1 })
            }

        } catch (error) {
            console.log(error, 'getToken');
        }
    };

    const handleLogin = async () => {
        // console.log(phone);

        // await auth().verifyPhoneNumber(phone)
        // .then(confirmResult =>{
        //     setConfirm(confirmResult);
        //     console.log('123',confirmResult);
        // })
        // .catch(error =>{
        //     console.log(error.message);

        // })
        // auth().verifyPhoneNumber(phone)
        //     .then(confirmResult => {
        //         setConfirm(confirmResult.code);
        //         console.log('123', confirmResult);
        //     })
        //     .catch(error => {
        //         console.log(error.message);

        //     })
        formik.validateForm().then(async (errors) => {
            if (errors.phone) {
                toastRef.current?.show(errors.phone);
            }
            else {
                console.log(formik.values.phone);
                console.log('1', phone);
                setIsLoading(true)
                await auth().verifyPhoneNumber(phone)
                    .then(confirmResult => {
                        console.log('=============conffirm=======================');
                        console.log(confirmResult);
                        console.log('====================================');
                        refModal.current.open()
                        setConfirm(confirmResult);
                        console.log('123', confirmResult);
                    })
                    .catch(error => {
                        console.log(error.message);

                    })
                    setIsLoading(false)
            }
        });
    }

    const confirmCode = async () => {
        console.log('====================================');
        console.log(otp);
        console.log(confirm);
        console.log('====================================');
        // try {
        //     await confirm.confirm(otp);
        //     console.log('====================================');
        //     console.log(1);
        //     console.log('====================================');
        // } catch (error) {
        //     console.log('====================================');
        //     console.log(22);
        //     console.log('====================================');
        //     console.log('Invalid code.');
        // }

        setIsLoading(true)
        const credential = firebase.auth.PhoneAuthProvider.credential(confirm.verificationId, otp);
        await firebase.auth().signInWithCredential(credential)
            .then(async (userCredential) => {
                const userInfo = await userApi.getUserInfoByUid(userCredential.user.uid)
                console.log('success login otp', userCredential);
                if (userInfo) {
                    AsyncStorage.setItem('userId', userInfo?.userId);
                    const user = {
                        ...userInfo,
                        birthday: covertFirebaseTimeStampToString(userInfo?.birthday),
                        createAt: covertFirebaseTimeStampToString(userInfo?.createAt),
                        updateAt: covertFirebaseTimeStampToString(userInfo?.updateAt)
                    };
                    dispatch(setUser(user));
                }
                else {
                    const userDefault = {
                        uid: userCredential.user.uid,
                        role: 1,
                        userName: 'nguoidung',
                        updateAt: new Date(),
                        createAt: new Date(),
                        email: '',
                        gender: true,
                        img: 'https://firebasestorage.googleapis.com/v0/b/cong-cafe-app.appspot.com/o/userDefault.png?alt=media&token=4039e0f4-71a2-472c-9679-5d50b0043f9f',
                        phone: phone,
                        birthday: new Date()

                    }
                    const dataUser: any = await userApi.addUserInfo(userDefault)
                    AsyncStorage.setItem('userId', dataUser?.userId); 
                    const user = {
                        ...dataUser,
                        birthday: covertFirebaseTimeStampToString(dataUser?.birthday),
                        createAt: covertFirebaseTimeStampToString(dataUser?.createAt),
                        updateAt: covertFirebaseTimeStampToString(dataUser?.updateAt)
                    };
                    dispatch(setUser(user))
                }
                handleUpdateTokenFCM()
                refModal.current.close()
                setIsLoading(false)
                navigate('BottomTab')
            })
            .catch((error: any) => {
                console.log('error', error);

            })

        // if (otp == confirm) {
        //     const userInfo = await userApi.getUserInfoByPhone(phone)
        //     if (userInfo) {
        //         AsyncStorage.setItem('userId', userInfo?.userId);
        //         const user = {
        //             ...userInfo,
        //             birthday: covertFirebaseTimeStampToString(userInfo?.birthday),
        //             createAt: covertFirebaseTimeStampToString(userInfo?.createAt),
        //             updateAt: covertFirebaseTimeStampToString(userInfo?.updateAt)
        //         };
        //         dispatch(setUser(user));
        //     }
        //     else {
        //         const userDefault = {
        //             uid: '',
        //             role: 1,
        //             userName: 'nguoidung',
        //             updateAt: new Date(),
        //             createAt: new Date(),
        //             email: '',
        //             gender: true,
        //             img: 'https://firebasestorage.googleapis.com/v0/b/cong-cafe-app.appspot.com/o/userDefault.png?alt=media&token=4039e0f4-71a2-472c-9679-5d50b0043f9f',
        //             phone: phone,
        //             birthday: new Date()

        //         }
        //         const dataUser: any = await userApi.addUserInfo(userDefault)
        //         AsyncStorage.setItem('userId', dataUser?.userId);
        //         console.log('====================================');
        //         console.log(dataUser);
        //         console.log('==================================');
        //         dispatch(setUser(dataUser))
        //     }
        //     handleUpdateTokenFCM()
        //     refModal.current.close()
        //     navigate('BottomTab')
        // }
        // else {
        //     ToastService.showToast('Mã OTP của bạn không đúng')
        // }
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
            {
                isLoading && <LoadingApp />
            }
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
            <ModalApp ref={refModal} mid outClose>
                <ViewApp backgroundColor={'white'} width={'90%'} padH20 padV={40} borderR={20}>
                    <TextInputForm placeholder='Nhận mã xác nhận' onChangeText={(text: any) => setOtp(text)} />
                    <ButtonApp title='Xác nhận' bR={20} mV20
                        onPress={() => confirmCode()}
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