import { Client, Account, ID } from "appwrite";
import { config } from "../config/config.js";

class AuthService {
  client = new Client();
  account;
  
  constructor() {
    this.client.setEndpoint(config.appwriteUrl)
    .setProject(config.appwriteProjectId); 
    this.account = new Account(this.client);
  }

  async createaccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(ID.unique(), email, password, name);
      if(userAccount)
      {

        return this.login({ email, password }); 
      }
    } catch (error) {
      throw new Error(`Failed to create account: ${error.message}`);
    }
  }

  async login({ email, password }) {
    try {
      const userLogin = await this.account.createEmailPasswordSession(email, password);
      return userLogin;
    } catch (error) {
      throw new Error(`Failed to log in: ${error.message}`);
    }
  }

  async getUser() {
    try {
      const user = await this.account.get();
      return user;
    } catch (error) {
      throw new Error(`Failed to get user: ${error.message}`);
    }
    return null;
  }

  async logout() {
    try {
      const result = await this.account.deleteSessions();
      return result;
    } catch (error) {
      throw new Error(`Failed to log out: ${error.message}`);
    }
    return null;
  }
}

const authservice = new AuthService();
export default authservice;
