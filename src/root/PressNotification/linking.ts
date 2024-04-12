import { View, Text, Linking } from 'react-native'
import React from 'react'
import { AlertOnMessage, config, formatLink } from './config'
import messaging from '@react-native-firebase/messaging'
import ToastService from '../../service/ToastService'

export const linking = {
    prefixes: ['congcafeapp://'],
    config: config,
    subscribe(listener: any) {

        const onReceiveURL = ({ url }: any) => listener(url)
        const linkingSubscription = Linking.addEventListener('url', onReceiveURL)

        const HandleLink = (data: any) => {
            if (data) {
                listener(formatLink(data))
            }
        }

        const notificationListener = async () => {
            messaging().onNotificationOpenedApp(remoteMessage => {
                console.log('nofionbackgroud', remoteMessage.notification)
                HandleLink(remoteMessage.data)
            })

            messaging().onMessage(remoteMessage => {
                console.log('notifionApp', remoteMessage);
                // ToastService.showToast(remoteMessage.notification?.body, 0)
                const title = remoteMessage?.notification?.title
                const body = remoteMessage?.notification?.body
                const data = remoteMessage?.data
                AlertOnMessage({
                    title,
                    body,
                    onPress:() => HandleLink(data)
                })
            })

            messaging().getInitialNotification()
                .then((remoteMessage: any) => {
                    if (remoteMessage) {
                        console.log('notifiOutApp', remoteMessage.notification);
                        HandleLink(remoteMessage.data)
                    }
                })

            messaging().setBackgroundMessageHandler(async remoteMessage => {
                console.log('Message handled in the background!', remoteMessage.data);
                HandleLink(remoteMessage.data)
            });
        }

        notificationListener();

        return () => {
            linkingSubscription.remove();
        }
    },
}
