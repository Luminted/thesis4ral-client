import {localStoragePersistedStateName} from "../config";

export const saveState = (state: object) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(localStoragePersistedStateName, serializedState);
  } catch (e) {
    console.error(e.message);
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(localStoragePersistedStateName);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};
