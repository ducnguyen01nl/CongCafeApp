import React from "react";
import { NameScreenApp } from "./RootScreen";

export const navigationRef: any = React.createRef()

export function navigate (name: NameScreenApp, params = {}){
    navigationRef.current.navigate(name, params)
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