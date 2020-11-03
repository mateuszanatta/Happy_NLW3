import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
    async onSignIn(TOKEN_KEY: string){
        await AsyncStorage.setItem('TOKEN_KEY', TOKEN_KEY);
    },
    
    async onSignOut(){
        await AsyncStorage.removeItem('TOKEN_KEY');
    },

    async isSignedIn(){
        const token = await AsyncStorage.getItem('TOKEN_KEY');

        return token !== null ? true : false;
    }
}