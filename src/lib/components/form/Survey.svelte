<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';

    let formData = writable({
        answers: [],
        currentQuestion: 1
    });

    export let numQuestion = 0;
    let inputEle;

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

    console.log(numQuestion);

    function nextQuestion() {
        if ($formData.currentQuestion === numQuestion) return;

        $formData.currentQuestion++;
        $formData.answers.push(inputEle.value);
    }

    function submitForm() {
        
    }

</script>

<div class="container py-5">
    <div class="row mb-5">
        <div class="col-md-8 col-xl-6 text-center mx-auto">
            <h2 class="fw-bold">Question {$formData.currentQuestion}&nbsp;</h2>
            <p class="text-muted">Question {$formData.currentQuestion} of {numQuestion}</p>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="card" style="margin-bottom: 50px;">
                <div class="card-body mx-auto">
                    <p class="card-text" style="font-size: 40px;">
                        <strong>
                            <span style="background-color: transparent;">{questions[$formData.currentQuestion]}</span>
                        </strong>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <input type="text" bind:this={inputEle} >
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col">
            {#if $formData.currentQuestion === numQuestion}
                <button class="btn btn-primary" type="button" on:click={submitForm} >Submit</button>
            {:else}
                <button class="btn btn-primary" type="button" on:click={nextQuestion} >Next</button>
            {/if}
        </div>
    </div>
</div>

<style>

    button {
        border-radius: 7.5px;
        font-size: 24px;
        width: 100%;
        height: 50px;
        margin: auto !important;
        padding: auto;
    }

    input {
        border-radius: 7.5px;
        font-size: 24px;
        width: 100%;
        height: 50px;
    }

</style>