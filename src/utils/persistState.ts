const localStorageEntryName = "card-table-state";

export const saveState = (state: object) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(localStorageEntryName, serializedState);
  } catch (e) {
    console.error(e.message);
  }
};

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem(localStorageEntryName);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
};
