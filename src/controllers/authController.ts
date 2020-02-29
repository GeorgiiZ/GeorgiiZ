const debug = require('debug')('app:AuthController');
import { DBReader, DBInput } from '../interfaces/interfaces';
import  User from '../models/User';

export default class AuthController{
    readonly dbManager: DBInput;

    constructor(dbManager: DBInput){
        this.dbManager = dbManager;
    }

    public async signUp(user: User){
        const createdUser = await this.dbManager.insertOne('users', user);
        return createdUser;
    }
}
