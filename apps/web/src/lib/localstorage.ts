'use client'

export function setItemToLocalStorage({
    key,
    value
}:{
    key: string,
    value: string
}){
    localStorage.setItem(key, value)
}
