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

const questions = [
    "Is this for breakfast, lunch, dinner, snack or dessert?",
    "What kind of cuisine are you in the mood for? (e.g., Italian, Mexican, Asian)",
    "Want something healthy or more of a treat?",
    "Are there any specific ingredients you love?",
    "Any specific ingredients that you dislike?",
    "Are you looking for something quick and easy, or are you willing to spend more time cooking?",
    "What’s your go-to protein source? (e.g., chicken, tofu, fish, no protein)",
    "How spicy do you want to have the food?",
    "What drink do you want to pair up with your meal?",
    "Is this meal for a special occasion, or just a regular day?",
    "What textures are you looking to have in your meal?",
    "What tools do you have at your culinary disposal? (Stovetop, oven, microwave, blender?)",
    "Do you prefer recipes that yield leftovers (great for meal prep) or single-serving portions?",
    "Are you looking for budget-friendly options, or are you willing to splurge a bit for a special meal?",
    "What’s the calorie range you want your meal to stay in? (You can specify yes or no)"
]
const testAnswers =[
    "Lunch",
    "Italian",
    "Healthy",
    "Cheese",
    "Beans",
    "Moderate cook time",
    "Chicken",
    "Medium",
    "Wine",
    "Regular Day",
    "Crispy",
    "Oven,Microwave,Stove",
    "few leftovers",
    "Budget-Friendly",
    "800-1000"
]

const restrictions=[

]

class aiClass{
    constructor(){
        this.ai = new Ollama({ host: '172.29.186.121:11434' });
    } 

    async suggestFood(questionAmount, answers, restrictions) {

        let qaA = "";

        for(let i = 0; i < questionAmount; i++) {
            qaA += `Q${i}. ${answers[i]}\nA${i}. ${answers[i]}`
        }

        const response = await ollama.chat({
            model: 'llama3:latest',
            messages: [{ role: 'user', content: 
            `Give one food suggestion this question answers.


            `
            }],
        });
    }


}

console.log(response)
console.log(response.message.content)

