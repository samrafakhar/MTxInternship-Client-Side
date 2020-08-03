import {Address} from './address'
import {User} from './user'
import {UserAccount} from './account'

export class  Contact{
    contactID:string;
    firstName: string;
    lastName: string;
    title: string;
    email: string;
    mobile: string;
    phone: string;
    fax: string;
    functionalArea: string;
    address: Address;
    account:UserAccount;
    tradesFor:String;

    constructor(add: Address, account:UserAccount){
        this.address=add;
        this.account=account;
    };
}