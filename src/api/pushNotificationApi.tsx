import axios from "axios";
import messaging from '@react-native-firebase/messaging'
import { ipLocal } from "../data/dataLocal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from '@react-native-firebase/firestore'
import { useGetListNotification, useGetListToken } from "../service/useLocalMater";
type _Notify = {
    title?: any
    body?: any
    arrayToken: string[]
    data?: any
}
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
            await axios.post(`http://${ipLocal}:3000/sendAll`, {
                tokens: tokens,
                ...params
            });
        } catch (error) {
            console.log('error sending notification', error);
        }
    },
    pushNotify: async (params: _Notify) => {
        const { title, body, arrayToken, data } = params
        const key = 'AAAA3qZ6NCo:APA91bFk43soGMpEXiSAU3EVhUsXCG0j1cz9TQjc4J5pyjYYKwD34ik8ENIe99FSgZQ6PVB70pXGIBAqkWFxTemooW2J7wtzli0_v1LQEyDMMvlSxaCqnhube3SRPYs73KpcTwpTWTQW';
        await axios({
            method: 'post',
            url: 'https://fcm.googleapis.com/fcm/send',
            data: JSON.stringify({
                "registration_ids": arrayToken,
                "notification": {
                    "title": title,
                    "body": body,
                },
                "data":data,
            }),
            headers: {
                Authorization: `key=${key}`,
                'Content-Type': 'application/json'
            },
        })
            .then(response => {
                console.log('Notification sent successfully:', response.data);
            })
            .catch(error => {
                console.error('Error sending notification:', error);
            });
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