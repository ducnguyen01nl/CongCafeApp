import axios from "axios";
import messaging from '@react-native-firebase/messaging'
import { ipLocal } from "../data/dataLocal";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from '@react-native-firebase/firestore'
import { useGetListNotification, useGetListToken } from "../service/useLocalMater";
import { store } from "../app/redux/store";
import { useToken } from "../utils/notification";
type _Notify = {
    title?: any
    body?: any
    arrayToken: string[]
    data?: any
}
type _Notify2 = {
    title?: any
    body?: any
    token: string
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
    pushNotifyToUser: async (params: _Notify2) => {
        const { title, body, token, data } = params
        const key = 'AAAA3qZ6NCo:APA91bFk43soGMpEXiSAU3EVhUsXCG0j1cz9TQjc4J5pyjYYKwD34ik8ENIe99FSgZQ6PVB70pXGIBAqkWFxTemooW2J7wtzli0_v1LQEyDMMvlSxaCqnhube3SRPYs73KpcTwpTWTQW';
        await axios({
            method: 'post',
            url: 'https://fcm.googleapis.com/fcm/send',
            data: JSON.stringify({
                "to": token,
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

    addTokenFCM: async (token: any,userInfo:any) => {
        try {
            const docRef = await firestore().collection('notification').add({
                userId: userInfo.userId,
                tokenFCM: token,
                role:userInfo.role

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
    deleteTokenFCM: async() =>{
        const userId: any = await AsyncStorage.getItem('userId')
        const token = await messaging().getToken();
        console.log('====================================');
        console.log(userId);
        console.log(token);
        console.log('====================================');
        try {
            const querySnapshot = await firestore()
                .collection('notification')
                .where('userId','==',userId)
                .where('tokenFCM','==',token)
                .get()
            if(querySnapshot.docs.length > 0){
                const tokenCurrent = querySnapshot.docs[0].data()
                firestore()
                .collection('notification')
                .doc(tokenCurrent?.id)
                .delete()
                .then(() =>{
                    console.log('delete token succcess');
                })
                .catch((error) =>{
                    console.log(error);
                    
                }) 
            }
            else{
                return null
            }
        } catch (error) {
            console.log(error);
        }

        


        // firestore()
        // .collection('notification')
        // .doc(id)
        // .delete()
        // .then(() =>{
        //     console.log('delete token succcess');
        // })
        // .catch((error) =>{
        //     console.log(error);
            
        // })  
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
    getListTokenByIdUser: async (userId: string) => {
        try {
            const listToken:any[] = []
            await firestore()
                .collection('notification')
                .where('userId', '==', userId)
                .get()
                .then((querysnapshot: any) => {
                    querysnapshot.forEach((documentSnapshot: any) => {
                        listToken.push(documentSnapshot.data().tokenFCM)
                    })
                })
                return listToken
        } catch (error) {
            console.log(error);

        }
        
    },
    getListTokenRole: async (role:number) => {
        try {
            const listToken:any[] = []
            await firestore()
                .collection('notification')
                .where('role', '==', role)
                .get()
                .then((querysnapshot: any) => {
                    querysnapshot.forEach((documentSnapshot: any) => {
                        listToken.push(documentSnapshot.data().tokenFCM)
                    })
                })
                return listToken
        } catch (error) {
            console.log(error);

        }
        
    },
}