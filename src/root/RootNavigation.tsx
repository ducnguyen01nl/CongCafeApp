import React from "react";
import { NameScreenApp } from "./RootScreen";
import { StackActions } from "@react-navigation/native";

export const navigationRef: any = React.createRef()

export function navigate (name: NameScreenApp, params = {}){
    navigationRef.current.navigate(name, params)
}

export function push (name: NameScreenApp, params = {}){
    navigationRef.current?.dispatch(StackActions.push(name,params))
}

export function goBack() {
    navigationRef.current.goBack()
}

// type NAME_SCREEN = 
//     | NameScreenApp
//     | 'Home'
//     | 'Favorite'
//     | 'Order'
//     | 'User'