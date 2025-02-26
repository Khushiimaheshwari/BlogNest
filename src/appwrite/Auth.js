import config from "../config/config";
import {Client, Account, ID} from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(config.appwriteURL)
            .setProject(config.ProjectId);
            this.account = new Account(this.client);
    }

    // Authentication Services

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // Call another function
                return this.login({email, password});
            }else{
                return userAccount;
            }

        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            return await this.account.createEmailPasswordSession(email, password);
            
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser(){
        try {
            if (!this.account) {
                console.error("Appwrite account instance not initialized.");
                return null;
            }

            const user = await this.account.get();
            console.log("Logged-in user:", user);
            return user;
        } catch (error) {
            if (error.code === 401) {
                console.warn("No user logged in."); 
            } else {
                console.error("Error fetching user:", error);
            }
            return null;
        }
    }
    

    async logout () {
        try {
            await this.account.deleteSessions();
            
        } catch (error) {
            console.log("Appwrite Server :: Logout :: error", error);
        }
    }
}

const authService = new AuthService()

export default authService;

