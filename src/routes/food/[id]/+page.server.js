import { PUBLIC_URL } from '$env/static/public';

export async function load({ params }) {
    const foodID = params.id;
    let foodData = await fetch(`${PUBLIC_URL}/api/recipes/${foodID}`);
    foodData = await foodData.json();

    return foodData;
}