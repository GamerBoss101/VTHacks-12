import mongoose from "mongoose";
import Users from "./collections/users.js";

export default class Mongo {
    constructor(uri) {
        this.connect(uri);
        this.users = new Users();
    }

    async connect(uri) {
        mongoose.set('strictQuery', true);
        return mongoose.connect(uri).then(() => { console.log('MongoDB connected') });
    }

    async disconnect() {
        return mongoose.disconnect();
    }
}
