import pymongo

class MongoDB: 
    def __init__(self, config):
        self.myclient = pymongo.MongoClient(config['MONGO_URI'])
        self.users = Users(self.myclient)
        

class Users: 
    def __init__(self, db):
        self.db = db
        self.users = self.db.myclient['users']