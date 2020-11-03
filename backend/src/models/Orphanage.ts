import { Entity, Column, PrimaryGeneratedColumn, OneToMany, JoinColumn } from 'typeorm'
import Image from './Image'

@Entity('orphanages')
export default class Orphanage{
    @PrimaryGeneratedColumn("increment")
    id: Number;
    @Column()
    name: string;
    @Column()
    latitude: number;
    @Column()
    longitude: number;
    @Column()
    about: string;
    @Column()
    instructions: string;
    @Column()
    opening_hours: string;
    @Column()
    open_on_weekends: boolean;
    @Column({nullable: true})
    whatsapp: string;
    @Column()
    approved: boolean;

    @OneToMany(() => Image, image=>image.orphanage,{
        cascade: ['insert', 'update']
    })
    @JoinColumn({name: 'orphanage_id'})
    images: Image[];
}