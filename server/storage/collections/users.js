import mongoose from "mongoose";

const reqString = {
    type: String,
    required: true
}

const UserSchema = new mongoose.Schema({
    id: reqString,

}, { timestamps: true });

export default class Users {
    constructor() {
        this.model = mongoose.model('users', UserSchema);
        this.upsert = { upsert: true };
    }

    makeId(length) {
        var result = [];
        var characters = 'abcdefghijklmnopqrstuvwxyz012345678901234567890123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
        }
        return result.join('');
    } 

    async create(user) {
        if(await this.model.findOne({ username: user.username }) || await this.model.findOne({ email: user.email })) return null;
        
        let Id = this.makeId(5);

        await this.model.findOneAndUpdate({ id: Id }, {
            id: Id,
        }, this.upsert);
        return await this.get(user.id);
    }

    async get(Id) {
        let data = await this.model.findOne({ id: Id });
        if(data) data.password = undefined;
        return data;
    }

    async getByUsername(username) {
        let data = await this.model.findOne({ username: username }) || await this.model.findOne({ email: username });
        if(data) data.password = undefined;
        return data;
    }

    async getAll(query) {
        let data = await this.model.find(query);
        data.forEach(user => {
            user.password = undefined;
        });
        return data
    }

    async update(Id, data) {
        if(!(await this.get(Id))) return null;
        await this.model.findOneAndUpdate({ id: Id }, data, this.upsert);
        return await this.get(Id);
    }

    async delete(Id) {
        let result = await this.get(Id);
        if(!result) return false;
        await this.model.deleteOne({ id: Id })
        return true;
    }
}