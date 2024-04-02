import { View, Text, Button } from 'react-native'
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
import auth from '@react-native-firebase/auth'
import { updatePassword } from 'firebase/auth'
// import { getAuth, updatePassword } from "firebase/auth";

const Screen_change_password = () => {
    const refInput = useRef<any>({})

    const user:any = auth().currentUser;  

    const handleConfirm = async() =>{
        const oldPassword = refInput.current['oldPassword'].getValue()
        const newPassword = refInput.current['newPassword'].getValue()
        const newPasswordConfirm = refInput.current['newPasswordConfirm'].getValue()

        if(!oldPassword) return ToastService.showToast(AppLang('ban_chua_nhap_mat_khau_cu'))
        if(!newPassword) return ToastService.showToast(AppLang('ban_chua_nhap_mat_khau_moi'))
        if(!newPasswordConfirm) return ToastService.showToast(AppLang('ban_chua_nhap_xac_nhan_mat_khau_cu'))
        if(newPassword !== newPasswordConfirm) return ToastService.showToast(AppLang('xac_nhan_mat_khau_khong_khop'))

        // await auth().sendPasswordResetEmail('ducnguyen01nl@gmail.com')
        // .then(() =>{
        //     ToastService.showToast(AppLang('da_gui_ma_xac_nhan_ve_email'),0)
        // })
        // .catch((error) =>{
        //     console.log(error);
        // })
        console.log(user);
        console.log(newPassword);
        if(user){
            await updatePassword(user,newPassword).then(() =>{
                console.log('====================================');
                console.log('success');
                console.log('====================================');
            })
            .catch((error) =>{
                console.log(error);
                
            })
        }

    }

  return (
    <LayoutApp>
        <HeaderApp 
            title={AppLang('doi_mat_khau')}
            left={{
                show:true,
                onPress: () => goBack()
            }}
        />
        <ViewApp flex1 mar10>
            <InputCustom 
                required
                isUpdate
                label={AppLang('mat_khau_cu')}
                propsInput={{
                    placeholder:AppLang('mat_khau_cu'),
                    placeholderTextColor: COLORS.text2,

                }}
                ref={ref => refInput.current['oldPassword'] = ref}
            />
            <InputCustom 
                required
                isUpdate
                label={AppLang('mat_khau_moi')}
                propsInput={{
                    placeholder:AppLang('mat_khau_moi'),
                    placeholderTextColor: COLORS.text2,

                }}
                ref={ref => refInput.current['newPassword'] = ref}
            />
            <InputCustom 
                required
                isUpdate
                label={AppLang('xac_nhan_mat_khau_moi')}
                propsInput={{
                    placeholder:AppLang('xac_nhan_mat_khau_moi'),
                    placeholderTextColor: COLORS.text2,

                }}
                ref={ref => refInput.current['newPasswordConfirm'] = ref}
            />
            <ButtonApp title={AppLang('ma_xac_thuc')} 
                onPress={handleConfirm}
            />
        </ViewApp>
    </LayoutApp>
  )
}

export default Screen_change_password