

class APIRoute:
    def __init__(self, app, route, methods):
        self.app = app
        self.route = route
        self.methods = methods       
        
    @self.app.route(self.route, methods=['GET'])
    def get(self):
        return "Hello World"
    
    @self.app.route(self.route, methods=['POST'])
    def post(self):
        return "Hello World"
    

