<script>
    // @ts-nocheck
    import { onMount } from 'svelte';
    import RecipleEntry from './RecipleEntry.svelte';
    import { page } from '$app/stores';

    let recipes;

    onMount(async() => {
        recipes = await (await fetch(`/api/recipes/bulk?userID=${$page.data.authInfo.user.userId}`)).json();
        console.log(recipes);
    });

</script>

<table>
    <tr>
        <th>Name</th>
        <th>Ingredients</th>
        <th>Instructions</th>
        <th>Rating</th>
        <th></th>
    </tr>
    <tbody>
        {#if recipes}
            {#each recipes as recipe}
                <RecipleEntry data={recipe} />
            {/each}
        {/if}
    </tbody>
</table>

<style>
    table {
        width: 100%;
        margin: auto;
        background-color: #141618;
        border-radius: 10px;
        max-height: 500px;
    }

    th {
        color: white;
        text-align: left;
        padding: 10px;
        height: auto;
    }

    tr:nth-child(odd) {
        background-color: #1c1c22;
    }
</style>