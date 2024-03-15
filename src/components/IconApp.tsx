import React from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Feather from 'react-native-vector-icons/Feather'
import Entypo from 'react-native-vector-icons/Entypo'
import Octicons from 'react-native-vector-icons/Octicons'
import { COLORS } from '../colors/colors'
interface IconProps extends ViewStyle {
    name: string
    size?: number | string
    color?: string
    type?:
    | 'Ionicons'
    | 'AntDesign'
    | 'SimpleLineIcons'
    | 'MaterialIcons'
    | 'MaterialCommunityIcons'
    | 'FontAwesome'
    | 'FontAwesome5'
    | 'Feather'
    | 'Entypo'
    | 'Octicons'
    onPress?: Function | undefined
    style?: StyleProp<ViewStyle> | undefined
}

class IconApp extends React.PureComponent<IconProps> {

    static Type: any = {
        AntDesign: AntDesign,
        SimpleLineIcons: SimpleLineIcons,
        MaterialIcons: MaterialIcons,
        MaterialCommunityIcons: MaterialCommunityIcons,
        Ionicons: Ionicons,
        FontAwesome: FontAwesome,
        FontAwesome5: FontAwesome5,
        Feather: Feather,
        Entypo: Entypo,
        Octicons: Octicons,
    }
    render() {
        const styleProps: Array<any> = []
        const IconView = IconApp.Type[this.props.type ? this.props.type : 'Ionicons']

        return (
            <IconView
                size={this.props.size || 23}
                color={this.props.color || COLORS.text2}
                name={this.props.name}
                onPress={this.props.onPress}
                style={[styleProps, this.props.style]}
            />
        )
    }


}

export default IconApp
