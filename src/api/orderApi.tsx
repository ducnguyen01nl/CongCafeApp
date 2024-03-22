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

export const orderApi = {
    addOrder: async(params:any) =>{
        try {
            const docRef = await firestore().collection('order').add(params)
            const idItem = docRef.id
            await docRef.update({id: idItem})
            ToastService.showToast(AppLang('them_yeu_cau_dat_hang_thanh_cong'),0)
            console.log('thêm yêu cầu thành công', docRef.id);
          } catch (error) {
            ToastService.showToast(AppLang('them_yeu_cau_dat_hang_that_bai'))
            console.log(error);
            
          }
    },
    getListOrderByStatus: async(status:number) =>{
        const userId: any = await AsyncStorage.getItem('userId')
      try {
        const listOrder: any[] = []
        await firestore()
            .collection('order')
            .where('idUser','==',userId)
            .where('status','==',status)
            .get()
            .then((querysnapshot: any) => {
                querysnapshot.forEach((documentSnapshot: any) => {
                    listOrder.push(documentSnapshot.data())
                })
            })
        return listOrder
    } catch (error) {
        console.log(error);

    }
    },
    getListOrderAll: async() =>{
        const userId: any = await AsyncStorage.getItem('userId')
        try {
          const listOrder: any[] = []
          await firestore()
              .collection('order')
              .where('idUser','==',userId)
              .get()
              .then((querysnapshot: any) => {
                  querysnapshot.forEach((documentSnapshot: any) => {
                      listOrder.push(documentSnapshot.data())
                  })
              })
          return listOrder
      } catch (error) {
          console.log(error);
  
      }
      },
    updateOrder: async(id:string,params:any) =>{
        await firestore()
        .collection('order')
        .doc(id)  
        .update(params)
        .then(() =>{
          console.log('success');
          
        })
        .catch((error) =>{
          console.log(error);
          
        })
    }

}