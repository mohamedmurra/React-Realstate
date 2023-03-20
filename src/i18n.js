import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import engTran from './locale/en.json'
import arbTran from './locale/ar.json'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: engTran,
  },
  ar: {
    translation: arbTran,
  },
}
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false,
    },
  })
export default i18n
