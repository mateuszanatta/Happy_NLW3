import * as bcrypt from 'bcrypt';

export default {
    /**
     * Get a given password string and encrypt it
     * @param password 
     * @param saltRounds 
     */
    async encrypt(password: string, saltRounds: number | string){
        return await bcrypt.hash(password, saltRounds);
    },

    async compareCryptedPasswords(plainPassword: string, encryptedPassword: string){
        return await bcrypt.compare(plainPassword, encryptedPassword);
    }
}