import { View, Text } from 'react-native'
import React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Screen_confirm from '../Screen_confirm';
import Screen_handle from '../Screen_handle';
import Screen_delivery from '../Screen_delivery';
import Screen_evaluate from '../Screen_evaluate';
import { COLORS } from '../../../colors/colors';
import { AppLang } from '../../../assets/languages';
import TextApp from '../../../components/TextApp';
import { widthScreen } from '../../../data/dataLocal';
import Screen_cancel from '../Screen_cancel';

const Tab = createMaterialTopTabNavigator();



const TopTab = ({idTab}:any) => {
  console.log(idTab);
  
  const tabDefault = () =>{
    switch(idTab){
      case 0:
        return 'Screen_confirm'
      case 1:
        return 'Screen_handle'
      case 2:
        return 'Screen_delivery'
      case 3:
        return 'Screen_evaluate'
    }
  }

  return (
    <Tab.Navigator initialRouteName={tabDefault()}
      screenOptions={({route}) =>({
        headerShown:false,
        tabBarActiveTintColor:COLORS.primary,
        tabBarLabel: ({ focused }) => {
          let labelText;
          if (route.name === 'Screen_confirm') {
            labelText = AppLang(`cho_xac_nhan`); 
          } else if (route.name === 'Screen_handle') {
            labelText = AppLang(`dang_xu_ly`); 
          } else if (route.name === 'Screen_delivery') {
            labelText = AppLang(`dang_giao`); 
          } else if (route.name === 'Screen_evaluate') {
            labelText = AppLang(`danh_gia`);
          }
          else if (route.name === 'Screen_cancel') {
            labelText = AppLang(`huy`); 
          }
          return (
            <TextApp bold style={{ color: focused ? COLORS.primary : 'gray',fontSize:12, }}>{labelText}</TextApp>
          );
        },
        tabBarStyle:{
        },
        tabBarItemStyle:{
          width:'auto',
          minWidth:120
        },
        tabBarScrollEnabled:true,
        tabBarCentered: true,
      })}
    >
          <Tab.Screen name='Screen_confirm' component={Screen_confirm} />
          <Tab.Screen name='Screen_handle' component={Screen_handle} />
          <Tab.Screen name='Screen_delivery' component={Screen_delivery} /> 
          <Tab.Screen name='Screen_evaluate' component={Screen_evaluate} />
          <Tab.Screen name='Screen_cancel' component={Screen_cancel} />
        </Tab.Navigator>
  )
}

export default TopTab