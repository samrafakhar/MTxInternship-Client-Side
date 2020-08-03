import { Product } from './product';

export class Protein {
    proteinId:string;
    proteinName:string;
    product:Product;

    Protein(p:Product){
        this.product=p;
    }
}
