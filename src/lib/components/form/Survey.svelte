<script>
    // @ts-nocheck
    import '../../survey.css';
    import { onMount } from 'svelte';
    import { writable } from 'svelte/store';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';

    import SignIn from './SignIn.svelte';

    let userID;

    if ($page.data.authInfo) {
        userID = $page.data.authInfo.user.userId;
    } else {
        userID = null;
    }

    let formData = writable({
        answers: [],
        currentQuestion: 1,
        userID: userID
    });

    export let numQuestion = 0;
    let inputEle;
    let submitEle;
    let modelEle;

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

    onMount(() => {
        const buttons = document.querySelectorAll('.btn-info');
        buttons.forEach(button => {
            button.addEventListener('click', () => {
                button.classList.toggle('active');
            });
        });

        setTimeout(() => {
            if (!$page.data.authInfo) {
                let modal = new bootstrap.Modal(modelEle);
                modal.show();
            }
        }, 1000);
    });

    function nextQuestion() {
        if ($formData.currentQuestion === numQuestion) return;

        $formData.currentQuestion++;
        $formData.answers.push(inputEle.value);
        inputEle.value = '';
    }

    async function submitForm() {

        submitEle.disabled = true;
        submitEle.innerText = 'Finding your food...';

        let obj = $formData;
        obj.answers.push(inputEle.value);
        obj.restrictions = [];

        const buttons = document.querySelectorAll('.btn-info');
        buttons.forEach(button => {
            if (button.classList.contains('active')) {
                obj.restrictions.push(button.innerText);
            }
        });

        let recipeData = await fetch('/api/recipes/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });

        recipeData = await recipeData.json();

        goto(`/food/${recipeData.id}`, { replaceState: true });
    }

    function signIn() {
        location.href = 'https://auth.fooddecisive.co/';
    }
    

</script>

<div class="container">
    { #if !$page.data.authInfo }
        <div bind:this={modelEle} class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-body">
                        <SignIn />
                        <button type="button" class="btn btn-primary" on:click={signIn}>Sign In</button>
                        <br>
                        <br>
                        <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    { /if }
    <div class="row mb-5">
        <div class="text-center">
            <h2 class="fw-bold">Question {$formData.currentQuestion} of {numQuestion}</h2>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="card" style="margin-bottom: 50px;">
                <div class="card-body mx-auto">
                    <p class="card-text" style="font-size: 40px;">
                        <strong>
                            <span style="background-color: transparent;">{questions[$formData.currentQuestion-1]}</span>
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
    <h4 class="card-title" style="text-align: center;">Select Dietary Restriction</h4>
    <div class="row">
        <div class="col">
            <div class="btn-group" role="group" style="width: 100%;">
                <button class="btn btn-info" type="button">Vegetarian</button>
                <button class="btn btn-info" type="button">Vegan</button>
                <button class="btn btn-info" type="button">Gluten-free</button>
                <button class="btn btn-info" type="button">Lactose-free</button>
                <button class="btn btn-info" type="button">Nut-free</button>
            </div>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col">
            <div class="btn-group" role="group" style="width: 100%;">
                <button class="btn btn-info" type="button">Halal</button>
                <button class="btn btn-info" type="button">Kosher</button>
                <button class="btn btn-info" type="button">Keto</button>
                <button class="btn btn-info" type="button">Diabetic</button>
                <button class="btn btn-info" type="button">Pescatarian</button>
            </div>
        </div>
    </div>
    <br>
    <div class="row">
        <div class="col">
            {#if $formData.currentQuestion === numQuestion}
                <button bind:this={submitEle} class="btn btn-primary" type="button" on:click={submitForm} >Submit</button>
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

    .container {
        display: block;
        min-width: 70% !important;
    }

</style>