import APIRoute from "../APIRoute.js";

import FDAI from "../ai.js";

const ai = new FDAI();

export default class RecipeAPI extends APIRoute {
    constructor() {
        super('/recipes');

        this.addSubRoute('/bulk', 'get', this.bulk);
        this.addSubRoute('/create', 'post', this.createRecipe);
        this.addSubRoute('/:id', 'get', this.get);
        this.addSubRoute('/:id/rate', 'post', this.rate);
    }

    async get(req, res) {
        let db = req.app.get('mongo').recipes;

        let result = await db.get(req.params.id);

        res.send(result);
    }

    async bulk(req, res) {

        let userID = req.query.userID;
        let db = req.app.get('mongo').recipes;

        let result = await db.getAll({ userID: userID });
        res.send(result);
    }

    async createRecipe(req, res) {
        let recipe = req.body;

        let db = req.app.get('mongo').recipes;

        let aiResult = await ai.suggestFood(recipe.currentQuestion, recipe.answers, recipe.restrictions);

        let suggestFood = JSON.parse(aiResult.response);
        suggestFood.userID = recipe.userID;

        let result = await db.create(suggestFood);

        res.json(result);
    }

    async rate(req, res) {

        let db = req.app.get('mongo').recipes;

        let recipe = await db.get(req.params.id);

        if (!recipe) {
            res.status(404).send('Recipe not found');
            return;
        }

        let rating = req.body.rating;

        if (rating < 0 || rating > 5) {
            res.status(400).send('Rating must be between 0 and 5');
            return;
        }

        let result = await db.update(req.params.id, { rating: recipe.rating + parseInt(rating), ratingCount: recipe.ratingCount + 1 });

        res.send(result);
    }

}