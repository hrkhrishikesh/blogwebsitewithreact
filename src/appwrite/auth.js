import { Client, Account, ID } from "appwrite";
import config from "../config/config";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProject)

        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try{
            const userAccount = await this.account.create(
                ID.unique(), email, password, name);
            if(userAccount){
                // direct login kara denge
                return this.login({email, password});
            }
            else{
                return userAccount;
            }
        }catch(error){
            throw error;
        }
    }

    async login(){
        try{
           return await 
           this.account.createEmailPasswordSession(email,password);
        }catch(err){
            throw err;
        }
    }

    async getCurrentUser(){
        try{    
            return await this.account.get();  
        }catch(error){
            console.log("Appwrite service :: getCurrentUser error : ", error);
        }

        return null;
    }

    async logout(){
        try{
            //Session for 1 , Sessions for all logout
            return await this.account.deleteSessions();
        }catch(err){
            console.log("Error during logout err :", err);
        }
    }
}

const authService = new AuthService();
export default authService;
