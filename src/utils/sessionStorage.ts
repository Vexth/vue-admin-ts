// App
const sidebarStatusKey = 'sidebar_status'
export const getSidebarStatus = () => sessionStorage.getItem(sidebarStatusKey)
export const setSidebarStatus = (sidebarStatus: string) => sessionStorage.setItem(sidebarStatusKey, sidebarStatus)

const languageKey = 'language'
export const getLanguage = () => sessionStorage.getItem(languageKey)
export const setLanguage = (language: string) => sessionStorage.setItem(languageKey, language)

const sizeKey = 'size'
export const getSize = () => sessionStorage.getItem(sizeKey)
export const setSize = (size: string) => sessionStorage.setItem(sizeKey, size)

// User
const tokenKey = 'vue_admin_ts_access_token'
export const getToken = () => sessionStorage.getItem(tokenKey)
export const setToken = (token: string) => sessionStorage.setItem(tokenKey, token)
export const removeToken = () => sessionStorage.removeItem(tokenKey)
