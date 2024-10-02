import {Iuser} from "../../../../entities/user"


export interface IuserRepository{
    createUser(newUser:Iuser) : Promise < Iuser>
    findbyEmail(email:string) : Promise < Iuser | void>
    getProfile(userId:string):Promise <Iuser | void>
}