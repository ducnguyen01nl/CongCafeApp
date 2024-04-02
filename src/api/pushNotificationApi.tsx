import axios from "axios";
import messaging from '@react-native-firebase/messaging'
import { ipLocal } from "../data/dataLocal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from '@react-native-firebase/firestore'
import { useGetListNotification, useGetListToken } from "../service/useLocalMater";
export const pushNotificationApi = {
    pushNotification: async (token: any, params: any) => {
        try {
            // const token = await messaging().getToken();            
            // const notificationData = {
            //     title: 'Test notification 111',
            //     body:'kiểm tra thông báo đẩy'
            // };
            await axios.post(`http://${ipLocal}:3000/send-notification`, {
                token: token,
                ...params
            });
        } catch (error) {
            console.log('error sending notification', error);
        }
    },
    pushNotificationAll: async (tokens: any, params: any) => {
        try {
            // const token = await messaging().getToken();  

            // const notificationData = {
            //     title: 'Cộng Cà Phê',
            //     body:'Xin thông báo toàn thể khách hàng'
            // }
            await axios.post(`http://${ipLocal}:3000/sendAll`, {
                tokens: tokens,
                ...params
            });
        } catch (error) {
            console.log('error sending notification', error);
        }
    },

    addTokenFCM: async (token: any) => {
        const userId: any = await AsyncStorage.getItem('userId')
        try {
            const docRef = await firestore().collection('notification').add({
                userId: userId,
                tokenFCM: token,

            })
            const idItem = docRef.id
            await docRef.update({ id: idItem })
        } catch (error) {
            console.log(error);

        }
    },
    updateTokenFCM: async (id: any, params: any) => {
        await firestore()
            .collection('notification')
            .doc(id)
            .update(params)
            .then(() => {
                console.log('success');

            })
            .catch((error) => {
                console.log(error);

            })
    },
    getListNotification: async () => {
        try {
            const listNotification: any[] = []
            await firestore()
                .collection('notification')
                .get()
                .then((querysnapshot: any) => {
                    querysnapshot.forEach((documentSnapshot: any) => {
                        listNotification.push(documentSnapshot.data())
                    })
                })
            return listNotification
        } catch (error) {
            console.log(error);

        }
    },
    getListToken: async () => {
        try {
            const listNotification: any[] = []
            await firestore()
                .collection('notification')
                .get()
                .then((querysnapshot: any) => {
                    querysnapshot.forEach((documentSnapshot: any) => {
                        listNotification.push(documentSnapshot.data().tokenFCM)
                    })
                })
            return listNotification
        } catch (error) {
            console.log(error);

        }
    },
    getTokenByIdUser: async (userId: string) => {
        try {
            const querySnapshot = await firestore()
                .collection('notification')
                .where('userId', '==', userId)
                .get()
                console.log('====================================');
                console.log(querySnapshot);
                console.log('====================================');
            if (querySnapshot.docs.length > 0) {
                const token = querySnapshot.docs[0].data()
                return token

            } else {
                return null;
            }
        } catch (error) {
            console.log(error);

        }
    },
}