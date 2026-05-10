export class Product {

    public readonly id:number;
    public readonly title:string;
    public readonly price:number;
    public readonly rating:number;
    public readonly thumbnail:string;
    public readonly category:string;

    private availabilityStatus:string;

    constructor(
        id:number,
        title:string,
        price:number,
        rating:number,
        thumbnail:string,
        category:string
    ){
        this.id = id;
        this.title = title;
        this.price = price;
        this.rating = rating;
        this.thumbnail = thumbnail;
        this.category = category;

        this.availabilityStatus = "In stock";
    }

    public getAvailabilityStatus(){
        return this.availabilityStatus;
    }
}