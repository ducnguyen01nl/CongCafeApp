import { Firestore, getDocs, query, where } from "firebase/firestore"
import { userRef } from "../firebase/firebaseConfig"
import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'
import { useSelector } from "react-redux"
import AsyncStorage from "@react-native-async-storage/async-storage"
import ToastService from "../service/ToastService"
import { AppLang } from "../assets/languages"
import { goBack } from "../root/RootNavigation"
import { utils } from '@react-native-firebase/app';

export const userApi = {

    getUserInfoByUid: async (params: any) => {
        const q = query(userRef, where('uid', '==', params))
        const querySnapshot = await getDocs(q)
        // querySnapshot.forEach((doc) =>{
        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            return userData
        }
        // })

    },
    getUserInfoById: async (params: any) => {
        try {
            const q = query(userRef, where('user_id', '==', params));
            const querySnapshot = await getDocs(q);

            if (querySnapshot.size > 0) {
                const doc = querySnapshot.docs[0];
                const userData = doc.data();
                // const image =  await storage().ref(`user/${userData?.img}`).getDownloadURL()
                // return {...userData,imgUrl:image};
                return userData
            } else {
                console.log('User not found');
                return null; // or throw an error, depending on your needs
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            throw error; // Propagate the error to the caller
        }


    },

    setUserInfo: async (params: any) => {
        const userId: any = await AsyncStorage.getItem('userId')
        try {
            firestore()
                .collection('user')
                .doc(userId)
                .update(params)
                .then(() => {
                    ToastService.showToast(AppLang('cap_nhat_thong_tin_thanh_cong'))
                });
        } catch (error) {
            console.log(error);

        }
    },

    updateFile: async (url: any, name: any, idUser: any) => {
        const reference = storage().ref(`user/${idUser}/${name}`);
        console.log('reference', reference);
        try {
            await reference.putFile(url);
            return reference.getDownloadURL()
        } catch (error) {
            console.log(error);

        }
    },

    getListAddress: async (params: any) => {
        try {
            const addresses: any[] = []
            await firestore()
                .collection('address')
                .where('idUser', '==', params)
                .get()
                .then((querysnapshot: any) => {
                    querysnapshot.forEach((documentSnapshot: any) => {
                        addresses.push(documentSnapshot.data())
                    })
                })
            return addresses
        } catch (error) {
            console.log(error);

        }
    },
    getCartUser: async () => {
        const userId: any = await AsyncStorage.getItem('userId')
        try {
            const querySnapshot = await firestore()
                .collection('cart')
                .where('userId', '==', userId)
                .get();

            if (querySnapshot.docs.length > 0) {
                // Lấy dữ liệu từ tài liệu đầu tiên (nếu có)
                const dataCart = querySnapshot.docs[0].data();
                return dataCart;
            } else {
                // Không tìm thấy dữ liệu
                return null;
            }
        } catch (error) {
            console.log(error);

        }
    },

    addDrinksToCart: async(id:any,params:any) => {
        firestore()
        .collection('cart')
        .doc(id)
        .update(params)
        .then(() =>{
            ToastService.showToast(AppLang('them_do_uong_thanh_cong'))
        })
        .catch(() =>{
            ToastService.showToast(AppLang('them_do_uong_that_bai'))
        })
    }
}