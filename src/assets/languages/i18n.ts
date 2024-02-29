import I18n from 'react-native-i18n'
import vi from './vi'
import en from './en'

// const I18n = require('react-native-i18n').default
I18n.fallbacks = true;
I18n.locale = 'vi'
I18n.translations = {
    en,
    vi
}

export default I18n