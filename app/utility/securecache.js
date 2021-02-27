import * as SecureStore from "expo-secure-store";
import jwtDecode from "jwt-decode";


const secureStore = async (key, value) => {

    try {
        await SecureStore.setItemAsync(key, value)
        // setItem(key, JSON.stringify(value))
        
    } catch (error) {
        console.log(error)
    }
}

const secureGet = async (key) => {
    
    try {
        const returnvalue = await SecureStore.getItemAsync(key);
        if (!returnvalue) return null;
        const decoded = jwtDecode(returnvalue);
        return decoded;
    } catch (error) {
        console.log(error)
    }
}

export default {
    secureStore,
    secureGet,
  };

