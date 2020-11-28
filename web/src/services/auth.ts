export default {
    onSignIn(TOKEN_KEY: string){
        localStorage.setItem('HAPPY/TOKEN_KEY', TOKEN_KEY);
    },
    
    onSignOut(){
        localStorage.removeItem('HAPPY/TOKEN_KEY');
    },

     isSignedIn(){
        const token = localStorage.getItem('HAPPY/TOKEN_KEY');

        return token !== null ? true : false;
    }
}