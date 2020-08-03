import {Address} from './address'
import {User} from './user'

export class UserAccount {
    accountID:string;
    name: string;
    type: string;
    status: string;
    owner: User;
    phone: string;
    fax: string;
    website: string;
    shippingAddress: Address;
    billingAddress: Address;
    businessType: string;
    productType: string;
    proteinType: string;

    constructor(owner: User, shippingAddress: Address, billingAddress: Address){
        this.shippingAddress=shippingAddress;
        this.billingAddress=billingAddress;
        this.owner=owner;
    };
}
