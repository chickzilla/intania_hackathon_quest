export function setItemToLocalStorage({
    key,
    value
}:{
    key: string,
    value: string
}){
    localStorage.setItem(key, value)
}

export function getItemFromLocalStorage({key} : {key: string}){
    return localStorage.getItem(key)
}