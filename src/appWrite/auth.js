import conf from '../conf/conf';
import {Client, Account, ID} from "appwrite";

export class Auth_Service{
    client= new Client();
    account;
    
    constructor(){
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId);
        this.account= new Account(this.client);
    }

    //next i will create methods such as signup, login, logout, getCurrentUser also another method named createAccount(), so that i can apply concept of vendor-lockin

    // step1: creating signup() method

    async signup({email, password, name}){
        const userAccount= await this.account.create(ID.unique, email, password, name);
        try {
            if(userAccount)
                return this.login({email, password});
            else
                return userAccount;
        } catch (error) {
            throw error;
        }
    }

    //step2: creating login() method

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    //step3: getCurrentUser() method to check if the user is loggedin or not

    async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw ErrorEvent;
        }
    }

    //step4: logout() method

    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            throw error;
        }
    }

}

const authService= new Auth_Service();

export default authService;