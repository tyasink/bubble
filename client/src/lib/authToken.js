import AsyncStorage from "@react-native-community/async-storage";
import RNRestart from 'react-native-restart';

let TOKEN = "";
const TOKEN_STR = "@AuthToken";

const getSync = () => TOKEN;

const get = async () => {
    try {
        return TOKEN = await AsyncStorage.getItem(TOKEN_STR);
    } catch (error) {
        return null;
    }
}

const set = async token => {
    TOKEN = token;

    if (token) {
        await AsyncStorage.setItem(TOKEN_STR, token);
    } else {
        await AsyncStorage.clear();
    }
}

const clear = async () => {
    await set(null);
    RNRestart.Restart();
}

export default {
    get,
    set,
    clear,
    getSync,
}