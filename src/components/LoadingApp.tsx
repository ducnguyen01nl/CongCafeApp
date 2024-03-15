import { View, Text, ActivityIndicator, StyleSheet, Dimensions } from 'react-native'
import React from 'react'
import ViewApp from './ViewApp'
import { COLORS } from '../colors/colors'

const { width } = Dimensions.get('window')

type LoadingStyle = {
    noBg?: boolean | undefined
}

const LoadingApp = ({ noBg }: LoadingStyle) => {
    return (
        <ViewApp mid style={styles.loading}>
            {
                noBg ? <ViewApp >

                    <ActivityIndicator size={'large'} color={COLORS.primary} />
                </ViewApp>
                    : <ViewApp style={[styles.square, { backgroundColor: COLORS.white }]}>

                        <ActivityIndicator size={'large'} color={COLORS.primary} />
                    </ViewApp>
            }

        </ViewApp>
    )
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        flex: 1,
        zIndex: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.5)'

    },
    square: {
        width: width * 0.2,
        height: width * 0.2,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,

    }
})
export default LoadingApp