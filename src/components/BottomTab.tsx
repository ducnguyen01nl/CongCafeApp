import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { COLORS } from '../colors/colors'
import Home from '../screen/Home'
import User from '../screen/User'
import Order from '../screen/Order'
import Favourite from '../screen/Favourite'
import IconApp from './IconApp'

type Props = {
    Home: undefined
    Favourite: undefined
    Order: undefined
    User: undefined
}
const Tab = createBottomTabNavigator()

const BottomTab = (props: Props) => {

  return (
    <Tab.Navigator
        initialRouteName='Home'
        screenOptions={({route}) =>({
            headerShown:false,
            tabBarActiveTintColor:COLORS.primary,
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: string;
  
              if (route.name === 'Home') {
                iconName = focused ? 'home-sharp' : 'home-outline';
              } else if (route.name === 'Favourite') {
                iconName = focused ? 'heart-sharp' : 'heart-outline';
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
                labelText = 'Trang chủ'; // Tên tùy chỉnh cho tab Home
              } else if (route.name === 'Favourite') {
                labelText = 'Yêu thích'; // Tên tùy chỉnh cho tab Favourite
              } else if (route.name === 'Order') {
                labelText = 'Đơn hàng'; // Tên tùy chỉnh cho tab Order
              } else if (route.name === 'User') {
                labelText = 'Người dùng'; // Tên tùy chỉnh cho tab User
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
        })}
    >
        <Tab.Screen name='Home' component={Home} />
        <Tab.Screen name='Favourite' component={Favourite} />
        <Tab.Screen name='Order' component={Order} />
        <Tab.Screen name='User' component={User} />

    </Tab.Navigator>
  )
}

export default BottomTab

const styles = StyleSheet.create({})