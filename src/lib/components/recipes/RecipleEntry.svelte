<script>
    // @ts-nocheck
    import { goto } from "$app/navigation";
    
    export let data;
    
    function openRecipe() {
        goto(`/food/${data.id}`, { replaceState: false });
    }

</script>

<tr>
    <td>{data.name}</td>
    <td>{data.ingredients.length || 0}</td>
    <td>{data.instructions.length || 0}</td>
    <td>{Math.round(data.rating/((data.ratingCount == 0 ) ? 1 : data.ratingCount))} / 5</td>
    <td>
        <button on:click={openRecipe} class="btn btn-primary">Open</button>
    </td>
</tr>

<style>
    td {
        color: white;
        text-align: left;
        padding: 10px;
        height: auto;
    }
</style>
