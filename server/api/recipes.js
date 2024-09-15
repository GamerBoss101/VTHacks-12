import APIRoute from "../APIRoute.js";

export default class UsersAPI extends APIRoute {
    constructor() {
        super('/recipes');

        this.addSubRoute('/create', 'post', createRecipe);
    }

    async get(req, res) {
        res.send('GET request');
    }

    async post(req, res) {
        res.send('POST request');
    }

    async createRecipe(req, res) {
        let recipe = req.body;

        let db = req.app.get('mongo').recipes;

        let result = await db.create({
            userID: recipe.userID,
            ingredients: recipe.ingredients,
            productName: recipe.productName,
            nutritionFacts: recipe.nutritionFacts,
            rating: recipe.rating,
            cuisine: recipe.cuisine,
            expense: recipe.expense,
            mealType: recipe.mealType
        });

    }
}