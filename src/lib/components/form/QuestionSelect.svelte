<script>
    // @ts-nocheck
    import Survey from "./Survey.svelte";
    export let parentDiv;

    function open5Survey(questions) {
        parentDiv.innerHTML = "";
        new Survey({
            target: parentDiv,
            props: {
                numQuestion: 5
            }
        });
        location.href = "#form";
    }

    function open10Survey(questions) {
        parentDiv.innerHTML = "";
        new Survey({
            target: parentDiv,
            props: {
                numQuestion: 10
            }
        });
        location.href = "#form";
    }

    function open15Survey(questions) {
        parentDiv.innerHTML = "";
        new Survey({
            target: parentDiv,
            props: {
                numQuestion: 15
            }
        });
        location.href = "#form";
    }
    

</script>

<div class="row">
    <div class="col">
        <div class="card">
            <div class="card-body mx-auto">
                <button class="btn btn-primary" href="#form" on:click={open5Survey} type="button" style="padding: 30px;border-radius: 15px;font-size: 24px;">5 Questions</button>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card">
            <div class="card-body mx-auto">
                <button class="btn btn-primary" href="#form" on:click={open10Survey} type="button" style="padding: 30px;border-radius: 15px;font-size: 24px;">10 Questions</button>
            </div>
        </div>
    </div>
    <div class="col">
        <div class="card">
            <div class="card-body mx-auto">
                <button class="btn btn-primary" href="#form" on:click={open15Survey} type="button" style="padding: 30px;border-radius: 15px;font-size: 24px;">15 Questions</button>
            </div>
        </div>
    </div>
</div>
<br>
<br>
<p style="text-align:center !important;  --bs-body-font-size: 1rem;font-size: 24px;">
    <strong>
        <span style="background-color: transparent;">The more questions you answer, the more personalized your recommendation will be!</span>
    </strong>
</p>
