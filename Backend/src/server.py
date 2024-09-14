from flask import Flask
from dotenv import dotenv_values

from db import MongoDB

config = dotenv_values(".env")

app = Flask(__name__)

app.storage = MongoDB(config)

@app.route('/',  methods=['GET'])
def hello_world():
    return 'Hello, World!'

app.run(port=config['PORT'], debug=True)