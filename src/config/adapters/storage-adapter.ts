import AsyncStorage from "@react-native-async-storage/async-storage";


export class StorageAdapter {
    static async getItem(key: string): Promise<string | null> {

        try {
            return await AsyncStorage.getItem(key);
        }
        catch (error) {
            console.error(`Error getting item with key "${key}":`, error);
            return null;
        }
    }

    static async setItem(key: string, value: string): Promise<void> {
        try {
            await AsyncStorage.setItem(key, value);
        }
        catch (error) {
            console.error(`Error setting item with key "${key}":`, error);
            throw new Error(`Failed to set item with key "${key}": ${error}`);
        }
    }

    static async removeItem(key: string): Promise<void> {
        try {
            await AsyncStorage.removeItem(key);
        }
        catch (error) {
            console.error(`Error removing item with key "${key}":`, error);
            throw new Error(`Failed to remove item with key "${key}": ${error}`);
        }
    }
}