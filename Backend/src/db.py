import pymongo

class MongoDB: 
    def __init__(self, config):
        self.myclient = pymongo.MongoClient(config['MONGO_URI'])
        self.users = Users(self.myclient)
        self.recipes = Recipes(self.myclient)


## User Schema
             

class Users: 
    def __init__(self, db):
        self.db = db
        self.users = self.db.myclient['users']
        

## Recipe Schema
class Recipe: 
    def __init__(self, name, ingredients, instructions, user):
        self.name = name
        self.ingredients = ingredients
        self.instructions = instructions
        self.rating = 0
        self.user = user
        
class Recipes:
    def __init__(self, db):
        self.db = db
        self.recipes = self.db.myclient['recipes']