<script>
    // @ts-nocheck
    import { page } from '$app/stores';
    import { onMount } from "svelte";

    let foodData = $page.data;

    let nutritionFactsEle;
    let IngredientsEle;

    $: showRecipe = false;

    function CLshowRecipe() {
        showRecipe = true;

        setTimeout(() => {
            for (const [key, value] of Object.entries(foodData.nutritionFacts)) {
                nutritionFactsEle.innerText += `${key}: ${value}\n`;
            }

            IngredientsEle.innerText = foodData.ingredients.map(ingredient => {
                return `${ingredient.name}: ${ingredient.quantity}`;
            }).join('\n');
        }, 500);
    }

</script>


<section class="py-5">
    <div class="container py-5">
        <div class="card">
            <div class="card-body mx-auto">
                <h4 class="card-title" style="text-align: center; font-size: 50px;">You Want</h4>
                <p class="card-text mx-auto" style="font-size: 60px;font-weight: bold;text-align: center;">{foodData.name}</p>
                <p class="card-text">{foodData.description}</p>
            </div>
            {#if !showRecipe}
                <div class="row">
                    <div class="col">
                        <div class="card">
                            <div class="card-body mx-auto">
                                <button class="btn btn-primary" type="button" on:click={CLshowRecipe}>Show Recipe</button>
                            </div>
                        </div>
                    </div>
                </div>
            {:else }
                <div class="row">
                    <div class="col">
                        <div class="card" style="margin-bottom: 90px;margin-top: 20px;">
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-xxl-6" style="margin-bottom: 20px;">
                                        <div class="card" style="margin-bottom: 20px;">
                                            <div class="card-body" style="margin-bottom: 20px;">
                                                <h2 class="card-title mx-auto" style="text-align: center;margin-bottom: 20px;">Nutrition Facts</h2>
                                                <p class="card-text" style="text-align:center; margin-bottom: 20px;" bind:this={nutritionFactsEle}></p>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col" style="margin-bottom: 20px;">
                                        <div class="card">
                                            <div class="card-body">
                                                <h2 class="card-title" style="text-align: center;">Ingredients</h2>
                                                <p class="card-text" style="text-align: center;" bind:this={IngredientsEle}></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <div class="card">
                                            <div class="card-body">
                                                <h2 class="card-title" style="text-align: center;">Instructions</h2>
                                                <p class="card-text">
                                                    <ul>
                                                        { #each foodData.instructions as instruction }
                                                            <li>{instruction}</li>
                                                        { /each }
                                                    </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            {/if}
            <h4 class="card-title" style="text-align: center;">Rate Your Suggested Food!</h4>
            <br>
            <br>
        </div>
    </div>
</section>