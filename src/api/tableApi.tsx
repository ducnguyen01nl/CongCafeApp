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

export const tableApi = {
    getListTable: async () => {
        try {
            const listTable: any[] = []
            await firestore()
                .collection('table')
                .get()
                .then((querysnapshot: any) => {
                    querysnapshot.forEach((documentSnapshot: any) => {
                        listTable.push(documentSnapshot.data())
                    })
                })
            return listTable
        } catch (error) {
            console.log(error);

        }
    },
    getTableById: async(idItem:string) =>{
      try {
        const documentSnapshot = await firestore()
            .collection('table')
            .doc(idItem)
            .get();
        if (documentSnapshot.exists) {
            const item = documentSnapshot.data();
            return item;
        } else {
            return null;
        }
    } catch (error) {
        console.log(error);

    }
  },
}