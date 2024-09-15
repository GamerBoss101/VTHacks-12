import mongoose from "mongoose";

import { v4 as uuidv4 } from 'uuid';


const reqString = {
    type: String,
    required: true
}

const recipesSchema = new mongoose.Schema({
    id: reqString, 
    description: String,
    userID: String,
    ingredients: Array,
    instructions: Array,
    name: String,
    nutritionFacts: Object, 
    rating: Number,
    cuisine: String,
    expense: Number,
    mealType: Object,
    ratingCount: Number
}, { timestamps: true });

export default class Recipes {
    constructor() {
        this.model = mongoose.model('recipes', recipesSchema);
        this.upsert = { upsert: true };
    }


    async create(recipe) {
        
        let Id = uuidv4();

        await this.model.findOneAndUpdate({ id: Id }, {
            id: Id,
            userID: recipe.userID,
            ingredients: recipe.ingredients,
            description: recipe.description,
            name: recipe.name,
            nutritionFacts: recipe.nutritionFacts,
            cuisine: recipe.cuisine,
            expense: recipe.expense,
            mealType: recipe.mealType,
            instructions: recipe.instructions,
            ratingCount: 0,
            rating: 0
        }, this.upsert);
        return await this.get(Id);
    }

    async get(Id) {
        return await this.model.findOne({ id: Id });
    }

    async getAll(query) {
        let data = await this.model.find(query);
        return data
    }

    async update(Id, data) {
        if(!(await this.get(Id))) return null;
        await this.model.findOneAndUpdate({ id: Id }, data, this.upsert);
        return await this.get(Id);
    }

    async increment(Id, field, amount) {
        let result = await this.get(Id);
        if(!result) return null;
        
        return await this.get(Id);
    }

    async delete(Id) {
        let result = await this.get(Id);
        if(!result) return false;
        await this.model.deleteOne({ id: Id })
        return true;
    }
}