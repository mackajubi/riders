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
        origin: 'Bujumbura',
        destination: 'Gatumba',
        capacity: 3,
        bookings: [],
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
        image: 'user4.fw.png',
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
];
