import mongoose from "mongoose";

import { v4 as uuidv4 } from 'uuid';


const reqString = {
    type: String,
    required: true
}

const recipesSchema = new mongoose.Schema({
    id: reqString, 
    userID: String,
    ingredients: Array,
    productName: String,
    nutritionFacts: Object, 
    rating: Number,
    cuisine: String,
    expense: Number,
    mealType: Object




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
            productName: recipe.productName,
            nutritionFacts: recipe.nutritionFacts,
            rating: recipe.rating,
            cuisine: recipe.cuisine,
            expense: recipe.expense,
            mealType: recipe.mealType

            
            

        }, this.upsert);
        return await this.get(user.id);
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

    async delete(Id) {
        let result = await this.get(Id);
        if(!result) return false;
        await this.model.deleteOne({ id: Id })
        return true;
    }
}