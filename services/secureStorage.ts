import * as SecureStorage from "expo-secure-store";

const secureStorageKeys = {
  app_token: "BORROW_APP_SECURE_TOKEN",
};

Object.freeze(secureStorageKeys);

type TSecureStorageKeys = keyof typeof secureStorageKeys;
const secureStorage = {
  saveItem: async <T>(key: TSecureStorageKeys, value: T) => {
    await SecureStorage.setItemAsync(
      secureStorageKeys[key],
      typeof value === "string" ? value : JSON.stringify(value),
    );
  },
  getItem: async (key: TSecureStorageKeys) => {
    return await SecureStorage.getItemAsync(secureStorageKeys[key]);
  },
  removeItem: async (key: TSecureStorageKeys) => {
    await SecureStorage.deleteItemAsync(secureStorageKeys[key]);
  },
};

export default secureStorage;
