import {Ollama} from 'ollama'

const ollama = new Ollama({ host: process.env.AI_URL });

// const response = await ollama.chat({
//   model: 'llama3:latest',
//   messages: [{ role: 'user', content: 
//     `Generate a recipe for blueberry muffins:
    // Format it in a json object like this and don't send any other text: 
    // {
    //     "name": "Blueberry Muffins",
    //     "description": "A delicious and healthy blueberry muffin recipe",
    //     "nutritional_information": {},
    //     ingredients: [
    //         {
    //             "name": "flour",
    //             "quantity": "2 cups"
    //         }
    //     ],
    //     instructions: [
    //         "Preheat oven to 350 degrees"
    //     ]
    // }
//     `
//     }],
// });

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
];

// const testAnswers =[
//     "Lunch",
//     "Italian",
//     "Healthy",
//     "Cheese",
//     "Beans",
//     "Moderate cook time",
//     "Chicken",
//     "Medium",
//     "Wine",
//     "Regular Day",
//     "Crispy",
//     "Oven,Microwave,Stove",
//     "few leftovers",
//     "Budget-Friendly",
//     "800-1000"
// ]

export default class FDAI {

    async suggestFood(questionAmount, answers, restrictions) {

        let qaA = "";

        for(let i = 0; i < questionAmount; i++) {
            qaA += `Q${i}. ${questions[i]}\nA${i}. ${answers[i]}`
        }

        const response = await ollama.generate({
            model: 'llama3:latest',
            format: "json",
            prompt:
            `Give one food suggestion for these question answers and then generate a recipe.
            ${qaA}
            Consider the following restrictions: ${restrictions.join(", ")}
            Format it in a json object like this example: 
            {
                "name": "Blueberry Muffins",
                "description": "A delicious and healthy blueberry muffin recipe",
                "cuisineType": "American",
                "estimatedExpense": 5,
                "mealType": "Breakfast",
                "nutritionFacts": {
                    "calories": "350-400",
                    "fat": "15-20g",
                    "carbs": "30-40g",
                    "protein": "35-40g"
                },
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
            Do not send any other text other than the json object and or add extra text to the json object.
            `
        });

        this.clearChatHistory();
        return response;
    }


    async clearChatHistory() {
        await ollama.generate({
            model: 'llama3:latest',
            prompt: "clear all previous responses",
            format: "json"
        });
    }

}

