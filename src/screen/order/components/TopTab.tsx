import { View, Text } from 'react-native'
import React from 'react'

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Screen_confirm from '../Screen_confirm';
import Screen_handle from '../Screen_handle';
import Screen_delivery from '../Screen_delivery';
import Screen_evaluate from '../Screen_evaluate';

const Tab = createMaterialTopTabNavigator();

const TopTab = () => {
  return (
    <Tab.Navigator initialRouteName='Screen_confirm'>
          <Tab.Screen name='Screen_confirm' component={Screen_confirm} />
          <Tab.Screen name='Screen_handle' component={Screen_handle} />
          <Tab.Screen name='Screen_delivery' component={Screen_delivery} /> 
          <Tab.Screen name='Screen_evaluate' component={Screen_evaluate} />
        </Tab.Navigator>
  )
}

export default TopTab