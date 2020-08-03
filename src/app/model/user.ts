import {Address} from './address'

export class User {
    userID:string;
    firstName:string;
    lastName:string;
    password:string;
    email:string;
    phone:string;
    address: Address;

    constructor(address: Address){
        this.address=address;
    };
}
