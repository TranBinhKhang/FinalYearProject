import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const store = async (key, value) => {

    const item = {
        value,
        timestamp: Date.now(),
      };

    try {
        await AsyncStorage.setItem(key, JSON.stringify(item))
        
    } catch (error) {
        console.log(error)
    }
}

const get = async (key) => {
    
    try {
        const returnvalue = await AsyncStorage.getItem(key);
        const parsedvalue = JSON.parse(returnvalue);
        if (!parsedvalue) return null;

        const now = moment(Date.now());
        const storedTime = moment(parsedvalue.timestamp);
        const isExpired = now.diff(storedTime, 'minutes') > 60;
        
        if (isExpired){
            AsyncStorage.removeItem(key);
            return null;
        };
        return parsedvalue.value;
    } catch (error) {
        console.log('error  1')
    }
}

export default {
    store,
    get,
  };