import axios from "axios";
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

export const addressApi = {
    getAddress: async() =>{
        try {
            const response = await axios.get('https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json')
            return response.data
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    },
    getListAddress: async () => {
        const userId: any = await AsyncStorage.getItem('userId')
        try {
            const addresses: any[] = []
            await firestore()
                .collection('address')
                .where('idUser', '==', userId)
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
    getAddressActive: async() =>{
        const userId: any = await AsyncStorage.getItem('userId')
        try {
            const querySnapshot = await firestore()
                .collection('address')
                .where('idUser','==',userId)
                .where('active','==',true)
                .get()

            if(querySnapshot.docs.length > 0){
                const addressActive = querySnapshot.docs[0].data()
                return addressActive
            }
            else{
                return null
            }
        } catch (error) {
            console.log(error);
        }
    },
    addNewAddress: async(params:any) => {
      try {
        const docRef = await firestore().collection('address').add(params)
        const idItem = docRef.id
        await docRef.update({id: idItem})
        ToastService.showToast(AppLang('them_dia_chi_thanh_cong'),0)
        console.log('thêm địa chỉ thành công', docRef.id);
      } catch (error) {
        ToastService.showToast(AppLang('them_dia_chi_that_bai'))
        console.log(error);
        
      }
    },
    updateAddress: async(id:string,params:any) => {
      // try {
        await firestore()
        .collection('address')
        .doc(id)  
        .update(params)
        .then(() =>{
          console.log('success');
          
        })
        .catch((error) =>{
          console.log(error);
          
        })
      // } catch (error) {
      //   console.log(error);
        
      // }
    },

    deleteAddress: async(id:string) =>{
      await firestore()
        .collection('address')
        .doc(id)
        .delete()
        .then(() =>{
          ToastService.showToast(AppLang('xoa_thanh_cong'),0)
        })
        .catch((error) =>{
          console.log(error);
          
        })
    }

}