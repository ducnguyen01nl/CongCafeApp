import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Login from '../screen/auth/Login'
import BottomTab from '../components/BottomTab'
import home from '../screen/home/index'
import user from '../screen/user/index'
import auth from '../screen/auth'
import order from '../screen/order/index'
import drinks from '../screenAdmin/drinks/index'
import { useSelector } from 'react-redux'

export type NameScreenApp = keyof typeof ScreenApp
export const ScreenApp = {
  ...home,
  ...auth,
  ...user,
  ...order,
  ...drinks,
}

const Stack = createStackNavigator()

const RootScreen = () => {

  const { user } = useSelector((state:any) => state.user);

    return (

      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        {/* <Stack.Screen  name='BottomTab' component={BottomTab}/> */}
        {
          Object.entries(ScreenApp).map(([name, component]) => (
            <Stack.Screen key={name} name={name} component={component} />
          ))
        }
      </Stack.Navigator>
    )

  }


export default RootScreen