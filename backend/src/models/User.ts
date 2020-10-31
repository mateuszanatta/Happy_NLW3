import {Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate} from 'typeorm';
import cryptography from '../utils/cryptography';
import {sign} from 'jsonwebtoken';

@Entity('users')
export default class User{
    @PrimaryGeneratedColumn('increment')
    id: Number;
    @Column({nullable: false})
    name: string;
    @Column({nullable: false})
    email: string;
    @Column({nullable: false})
    password: string;
    
    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword(){
        this.password = await cryptography.encrypt(this.password, 10);
    };
    
    compareHash(plainPassowrd: string){
        return cryptography.compareCryptedPasswords(plainPassowrd, this.password);     
    };
    //Generate a JWT token for each user
    generateToken(){
        return sign({ id: this.id}, "secret", {
            expiresIn: 86400,
        })
    }
}