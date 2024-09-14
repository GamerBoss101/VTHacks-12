import APIRoute from "../APIRoute";

export default class UsersAPI extends APIRoute {
    constructor() {
        super('/users');

        this.addSubRoute('/create', 'post', createUser);
    }

    async get(req, res) {
        res.send('GET request');
    }

    async post(req, res) {
        res.send('POST request');
    }

    async createUser(req, res) {
        let user = req.body;

        let db = req.app.get('mongo').users;

    }
}