import mongoose from "mongoose";
import Recipes from "./collections/recipes.js";

export default class Mongo {
    constructor(uri) {
        this.connect(uri);
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
