import { User } from '../services/app.service';

export interface Booking {
    id: number;
    userId: number;
    name: string;
    image: string;
    tel: string;
    email: string;
    date: Date;
    startTrip?: boolean;
}

export let users: User[] = [
    {
        id: 1,
        name: 'kajubi mark',
        email: 'kajubimark2@gmail.com',
        password: '1',
        image: 'user1.fw.png',
        tel: '73-333-889',
        loggedIn: false,
        rider: false,
    },
    {
        id: 2,
        name: 'John Baptist',
        password: '1',
        email: 'john@gmail.com',
        tel: '73-333-889',
        image: 'user2.fw.png',
        loggedIn: false,
        rider: true,
        origin: 'Mubimbi',
        destination: 'Muyebe',
        capacity: 3,
        bookings: [],
    },
    {
        id: 3,
        name: 'David Mulinde',
        password: '1',
        email: 'david@gmail.com',
        tel: '73-333-889',
        image: 'user5.fw.png',
        loggedIn: false,
        rider: true,
        origin: 'Muramvya',
        destination: 'Bujumbura',
        capacity: 3,
        bookings: [],
    },
    {
        id: 4,
        name: 'Allan Obalim',
        password: '1',
        email: 'allan@gmail.com',
        tel: '73-333-889',
        image: 'user6.fw.png',
        loggedIn: false,
        rider: false,
    },
    {
        id: 5,
        name: 'Juliet Kyewalabye',
        password: '1',
        email: 'juls@gmail.com',
        tel: '73-333-889',
        image: 'user9.fw.png',
        loggedIn: false,
        rider: true,
        origin: 'Bujumbura',
        destination: 'University of Burundi',
        capacity: 5,
        bookings: [],
    },
    {
        id: 6,
        name: 'Dante Nesta',
        password: '1',
        email: 'dante@gmail.com',
        tel: '73-333-889',
        image: 'user8.fw.png',
        loggedIn: false,
        rider: true,
        origin: 'Eglise Orthodoxe',
        destination: 'Unity Monument',
        capacity: 2,
        bookings: [],
    },
];
