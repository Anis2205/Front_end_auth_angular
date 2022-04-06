
export class User{
    public name : string;
    public email : string;
    public password :string ;
    public phone : number;
    public relationshipstatus:string;
    public occupation: string;
    public gender :string

    constructor(name:string,email:string,password:string,phone:number,relationshipstatus:string,occupation: string,gender :string){
        this.name=name;
        this.email=email;
        this.password=password
        this.phone=phone
        this.relationshipstatus=relationshipstatus
        this.gender=gender
        this.occupation=occupation

    }
}
