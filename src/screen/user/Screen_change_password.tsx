import { View, Text, Button, Alert } from 'react-native'
import React, { useRef } from 'react'
import LayoutApp from '../../components/LayoutApp'
import HeaderApp from '../../components/HeaderApp'
import { AppLang } from '../../assets/languages'
import { goBack } from '../../root/RootNavigation'
import ViewApp from '../../components/ViewApp'
import InputCustom from '../../components/input/InputCustom'
import { COLORS } from '../../colors/colors'
import ButtonApp from '../../components/ButtonApp'
import ToastService from '../../service/ToastService'
import auth, { firebase } from '@react-native-firebase/auth'
import { updatePassword } from 'firebase/auth'
import TextApp from '../../components/TextApp'
// import { getAuth, updatePassword } from "firebase/auth";

const Screen_change_password = ({ route }: any) => {
    const { type } = route?.params
    const refInput = useRef<any>({})

    const user: any = auth().currentUser;
    console.log(user.providerData);

    const sendEmail = () => {
        firebase.auth().sendPasswordResetEmail(user.email)
            .then(() => {
                Alert.alert(type == 0 ? AppLang('quen_mk') : AppLang('doi_mk'), AppLang('hay_check_email'),
                    [
                        {
                            text: AppLang('dong'),
                            onPress: () => { },
                        }
                    ])
            })
            .catch((error) => {
                console.log(error);
            })
    }

    const handleConfirm = async () => {
        const email = refInput.current['email'].getValue()
        // const password = refInput.current['password'].getValue()

        // if (type == 0) {
        if (!email) return ToastService.showToast(AppLang('email_khong_duoc_trong'))
        if (email != user.email) return ToastService.showToast(AppLang('email_khong_khop'))
        sendEmail()
        // }
        // else {
        //     await auth().signInWithEmailAndPassword(email, password)
        //         .then(() => {

        //         })
        //         .catch((error) => {
        //             if (error.code === 'auth/invalid-credential') {
        //                 console.log('Tài khoản mật khẩu không đúng');
        //                 return ToastService.showToast(AppLang(`tai_khoan_mk_sai`))
        //             }
        //         })

        // }
        // if(pa)

        // await auth().sendPasswordResetEmail('ducnguyen01nl@gmail.com')
        // .then(() =>{
        //     ToastService.showToast(AppLang('da_gui_ma_xac_nhan_ve_email'),0)
        // })
        // .catch((error) =>{
        //     console.log(error);
        // })
        // if(user){
        //     await updatePassword(user,newPassword).then(() =>{
        //         console.log('====================================');
        //         console.log('success');
        //         console.log('====================================');
        //     })
        //     .catch((error) =>{
        //         console.log(error);

        //     })
        // }


    }

    return (
        <LayoutApp>
            <HeaderApp
                title={AppLang('doi_mat_khau')}
                left={{
                    show: true,
                    onPress: () => goBack()
                }}
            />
            <ViewApp flex1 mar10 marT={100}>

                <ViewApp mid padV10>
                    <TextApp colorP size18>{AppLang('nhap_dia_chi_email_tai_khoan_cua_ban')}</TextApp>
                </ViewApp>
                <InputCustom
                    required
                    isUpdate
                    label={AppLang('dia_chi_email')}
                    propsInput={{
                        placeholder: AppLang('dia_chi_email'),
                        placeholderTextColor: COLORS.text2,
                        color: COLORS.text1

                    }}
                    ref={ref => refInput.current['email'] = ref}
                />
                {/* {
                    type == 1 &&
                    <InputCustom
                        required
                        isUpdate
                        label={AppLang('mat_khau_cu')}
                        propsInput={{
                            placeholder: AppLang('mat_khau_cu'),
                            placeholderTextColor: COLORS.text2,
                            color: COLORS.text1

                        }}
                        ref={ref => refInput.current['oldPassword'] = ref}
                    />
                } */}

                <ButtonApp title={AppLang('xac_thuc')}
                    onPress={handleConfirm}
                />
            </ViewApp>
        </LayoutApp>
    )
}

export default Screen_change_password