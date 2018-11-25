import { AsyncStorage } from 'react-native';

export const TOKEN_KEY = "@tokenKey:key";

export const onSignIn = async (token) => {
    try{
        await AsyncStorage.setItem(TOKEN_KEY, token);
        console.log('Saved on Storage.')
    }
        catch(exception) {
        console.log('Fail to Save on Storage.')
    }
}

export const onSignOut = async () => {
    try {
        await AsyncStorage.removeItem(TOKEN_KEY);
        console.log('Storage Removed.')
        return true;
    }
    catch(exception) {
        console.log('Fail to Remove Storage.')
        return false;
    }
}

export const isSignedIn = async () => {
    try{
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        return (token !== null) ? true : false;
    }
    catch(exception){
        console.log('Fail to check if is signed in.')
        return false;
    }
};

export const getUserToken = async () => {
    try{
        const token = await AsyncStorage.getItem(TOKEN_KEY);
        console.log('TOKEN', token)
        return (token !== null) ? token : null;
    }
    catch(exception){
        console.log('Fail to get user token.')
        return null;
    }
};