import {Ollama} from 'ollama'

const ollama = new Ollama({ host: '172.29.186.121:11434' })

const response = await ollama.chat({
  model: 'llama3:latest',
  messages: [{ role: 'user', content: 
    `Generate a recipe for blueberry muffins:
    Format it in a json object like this and don't send any other text: 
    {
        "name": "Blueberry Muffins",
        "description": "A delicious and healthy blueberry muffin recipe",
        "nutritional_information": {},
        ingredients: [
            {
                "name": "flour",
                "quantity": "2 cups"
            }
        ],
        instructions: [
            "Preheat oven to 350 degrees"
        ]
    }
    
    `
    }],
});

console.log(response)
console.log(response.message.content)

