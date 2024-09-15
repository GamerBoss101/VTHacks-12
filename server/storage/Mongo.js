import mongoose from "mongoose";
import Users from "./collections/users.js";
import Recipes from "./collections/recipes.js";

export default class Mongo {
    constructor(uri) {
        this.connect(uri);
        this.users = new Users();
        this.recipes = new Recipes();
    }

    async connect(uri) {
        mongoose.set('strictQuery', true);
        return mongoose.connect(uri).then(() => { console.log('MongoDB connected') });
    }

    async disconnect() {
        return mongoose.disconnect();
    }
}
