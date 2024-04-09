import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS } from '../colors/colors'
import Home from '../screen/Home'
import User from '../screen/User'
import Order from '../screen/Order'
import Favourite from '../screen/Favourite'
import IconApp from './IconApp'
import { AppLang } from '../assets/languages'
import { useSelector } from 'react-redux'
import OrderAdmin from '../screenAdmin/OrderAdmin'
import NewsAdmin from '../screenAdmin/NewsAdmin'
import DrinksAdmin from '../screenAdmin/DrinksAdmin'

type Props = {
    Home: undefined
    Favourite: undefined
    Order: undefined
    User: undefined
}
const Tab = createBottomTabNavigator()
// const tab = createMaterialBottomTabNavigator

const BottomTab = (props: Props) => {
  const {user} = useSelector((state:any) => state.user)

  return (
    user?.role == 1
    ?
    <Tab.Navigator
        initialRouteName='Home'
        screenOptions={({route}) =>({
            headerShown:false,
            tabBarActiveTintColor:COLORS.primary,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: string ='';
  
              if (route.name === 'Home') {
                iconName = focused ? 'home-sharp' : 'home-outline';
              } else if (route.name === 'NewsAdmin') {
                iconName = focused ? 'newspaper' : 'newspaper-outline';
              }else if (route.name === 'Order') {
                iconName = focused ? 'basket-sharp' : 'basket-outline';
              }else if (route.name === 'User') {
                iconName = focused ? 'person' : 'person-outline';
              }
  
              return <IconApp name={iconName} size={size} color={color} />;
            },
            tabBarLabel: ({ focused }) => {
              let labelText;
              if (route.name === 'Home') {
                labelText = AppLang(`trang_chu`); // Tên tùy chỉnh cho tab Home
              } else if (route.name === 'NewsAdmin') {
                labelText = AppLang(`tin_tuc`); // Tên tùy chỉnh cho tab Favourite
              } else if (route.name === 'Order') {
                labelText = AppLang(`don_hang`); // Tên tùy chỉnh cho tab Order
              } else if (route.name === 'User') {
                labelText = AppLang(`nguoi_dung`); // Tên tùy chỉnh cho tab User
              }
              return (
                <Text style={{ color: focused ? COLORS.primary : 'gray',fontSize:12, marginVertical:5 }}>{labelText}</Text>
              );
            },
            tabBarStyle:{
              position:'absolute',
              bottom:10,
              borderRadius:15,
              width:'90%',
              minHeight:55,
              paddingVertical:5,
              marginHorizontal:'5%'
            },
            tabBarCentered: true,
            tabBarHideOnKeyboard:true,
        })}
    >
      <Tab.Screen name='Home' component={Home} />
      <Tab.Screen name='NewsAdmin' component={NewsAdmin} />
      <Tab.Screen name='Order' component={Order} />
      <Tab.Screen name='User' component={User} />

    </Tab.Navigator>
    :
    <Tab.Navigator
        initialRouteName='OrderAdmin'
        screenOptions={({route}) =>({
            headerShown:false,
            tabBarActiveTintColor:COLORS.primary,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: string ='';
              let typeIcon: string = 'Ionicons';
  
              if (route.name === 'OrderAdmin') {
                iconName = focused ? 'note-text' : 'note-text-outline';
                typeIcon = 'MaterialCommunityIcons'
              } else if (route.name === 'NewsAdmin') {
                iconName = focused ? 'newspaper' : 'newspaper-outline';
              }else if (route.name === 'DrinksAdmin') {
                iconName = focused ? 'wine' : 'wine-outline';
              }else if (route.name === 'User') {
                iconName = focused ? 'person' : 'person-outline';
              }
  
              return <IconApp name={iconName} size={size} color={color} type={typeIcon} />;
            },
            tabBarLabel: ({ focused }) => {
              let labelText;
              if (route.name === 'OrderAdmin') {
                labelText = AppLang(`don_hang`); // Tên tùy chỉnh cho tab OrderAdmin
              } else if (route.name === 'NewsAdmin') {
                labelText = AppLang(`tin_tuc`); // Tên tùy chỉnh cho tab NewsAdmin
              } else if (route.name === 'DrinksAdmin') {
                labelText = AppLang(`do_uong`); // Tên tùy chỉnh cho tab DrinksAdmin
              } else if (route.name === 'User') {
                labelText = AppLang(`nguoi_dung`); // Tên tùy chỉnh cho tab User
              }
              return (
                <Text style={{ color: focused ? COLORS.primary : 'gray',fontSize:12, marginVertical:5 }}>{labelText}</Text>
              );
            },
            tabBarStyle:{
              position:'absolute',
              bottom:10,
              borderRadius:15,
              width:'90%',
              minHeight:55,
              paddingVertical:5,
              marginHorizontal:'5%'
            },
            tabBarCentered: true,
            tabBarHideOnKeyboard:true,
        })}
    >
      <Tab.Screen name='OrderAdmin' component={OrderAdmin} />
      <Tab.Screen name='NewsAdmin' component={NewsAdmin} />
      <Tab.Screen name='DrinksAdmin' component={DrinksAdmin} />
      <Tab.Screen name='User' component={User} />

    </Tab.Navigator>
  )
}

export default BottomTab

const styles = StyleSheet.create({})