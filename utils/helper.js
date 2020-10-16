export const getItemFromLocalStorage = (storageKey) => JSON.parse(localStorage.getItem(storageKey));

export const setItemToLocalStorage = (storageKey, item) => localStorage.setItem(storageKey, JSON.stringify(item));

export const removeItemFromLocalStorage = (storageKey) => localStorage.removeItem(storageKey);

export const removeAllFromLocalStorage = () => localStorage.clear();
